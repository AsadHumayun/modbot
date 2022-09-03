import { PermissionsBitField } from 'discord.js';
import { getUser } from '../functions/message/getUser.js';
import { arrayToMatrix } from '../utils/array/arrayToMatrix.js';
import { getUserData } from '../functions/userData/getUserData.js';
import { ChannelType, AuditLogEvent, OverwriteType } from 'discord.js';
import { equals } from '../utils/array/eq.js';

/**
 * @type {import("../../types/Event").Event}
 * @see {@link https://discord.js.org/#/docs/discord.js/main/class/PermissionOverwriteManager}
 */
export default {
	name: 'channelUpdate',
	once: false,
	async execute(client, oldChannel, newChannel) {
		if ([ChannelType.DM, ChannelType.GroupDM].includes(oldChannel.type) || (oldChannel.guild.id != client.config.guildId)) return;
		// ensure that the user` is still in the server. If yes, then edit data.
		// fetch full structure from Discord API
		// Only the partial structure is sent through the event.

		let audits = [];

		const channelUpdateAuditLogType = (await oldChannel.guild.fetchAuditLogs({ limit: 1, type: AuditLogEvent.ChannelUpdate })).entries.first() || undefined;
		const channelOverwriteCreateAuditLogType = (await oldChannel.guild.fetchAuditLogs({ limit: 1, type: AuditLogEvent.ChannelOverwriteCreate })).entries.first() || undefined;
		const channelOverwriteDeleteAuditLogType = (await oldChannel.guild.fetchAuditLogs({ limit: 1, type: AuditLogEvent.ChannelOverwriteDelete })).entries.first() || undefined;
		const channelOverwriteUpdateAuditLogType = (await oldChannel.guild.fetchAuditLogs({ limit: 1, type: AuditLogEvent.ChannelOverwriteUpdate })).entries.first() || undefined;

		audits.push(
			channelUpdateAuditLogType,
			channelOverwriteCreateAuditLogType,
			channelOverwriteDeleteAuditLogType,
			channelOverwriteUpdateAuditLogType,
		);

		audits = audits.filter(x => x !== undefined);

		audits.sort((a, b) => {
			if (a.createdTimestamp === b.createdTimestamp) return 0;
			if (a.createdTimestamp < b.createdTimestamp) return -1; else return 1;
		});

		const audit = audits[audits.length - 1];

		/**
		 * There was an error here that was riving me crazy. Both `newPerms` and `oldPerms`
		 * were empty arrays when they shouldn't have been. Djs v14 update reqquired the filter typer paramter to be a numbewr/enum
		 * I was using a string.
		 * @see {@link https://discord-api-types.dev/api/discord-api-types-v10/enum/OverwriteType}
		 */
		const oldPerms = [...oldChannel.permissionOverwrites.cache.values()].filter((d) => d.type == OverwriteType.Member);
		const newPerms = [...newChannel.permissionOverwrites.cache.values()].filter((d) => d.type == OverwriteType.Member);

		if (equals(oldPerms.map(JSON.stringify), newPerms.map(JSON.stringify))) return;

		const rmv = [];

		for (const x in oldPerms) {
			const member = await newChannel.guild.members.fetch({ user: x.id, force: true }).catch(() => {return;});
			if (!member) break;
			if (!newPerms.map(({ id }) => id).includes(oldPerms[x].id)) {
				rmv.push(oldPerms[x].id);
			}
		}

		newPerms.forEach(async (x) => {
			const usr = await getUser(x.id);
			const mmbr = await client.guilds.cache.get(newChannel.guildId).members.fetch({ user: usr.id, force: true });
			const oldOverwrites = oldChannel.permissionOverwrites.cache.find(({ id }) => id === x.id);
			const newOverwrites = newChannel.permissionOverwrites.cache.find(({ id }) => id === x.id);
			const wasManager = oldOverwrites?.allow.has(PermissionsBitField.Flags.ManageChannels, false) || false;
			const isManager = newOverwrites.allow.has(PermissionsBitField.Flags.ManageChannels, true);
			if ((x.allow.bitfield === oldOverwrites?.allow.bitfield) && (x.deny.bitfield === oldOverwrites?.deny.bitfield)) return;
			let respond = true;
			let addingManager = false;
			let removingManager = false;
			if (!isManager && (wasManager)) {
				removingManager = true;
			}
			else if (!wasManager && (isManager)) {
				addingManager = true;
			}
			else {
				respond = false;
			}

			if (!respond) {
				addingManager = false;
				removingManager = false;
			}

			const user = await getUserData(x.id);
			let chn = user.get('chnlp');
			chn = chn ? arrayToMatrix(chn.split(';'), 3) : [];
			let indx = chn.findIndex((data) => data[0] == newChannel.id);
			if (indx < 0) {
				// add new data.
				chn.push([newChannel.id, x.deny.bitfield, x.allow.bitfield]);
				indx = chn.length - 1;
			}
			else if (chn[indx].join(';') == `${newChannel.id};${x.deny.bitfield};${x.allow.bitfield}`) {
				// ignore
				client.channels.cache.get(client.config.channels.permlog).send({ content: `Audit log entry at ${new Date(audit.createdAt).toISOString()} by ${audit.executor.tag}(${audit.executor.id}) in regard to ${usr.tag}(${usr.id}) was ignnored due to data already matching.\n    Entry: ${newChannel.id};${x.deny.bitfield};${x.allow.bitfield}` });
				return;
			}
			else {
				// not a complete match; update values.
				chn[indx][1] = x.deny.bitfield;
				chn[indx][2] = x.allow.bitfield;
			}
			client.channels.cache.get(client.config.channels.permlog).send({
				content: `
Audit log entry executed at ${new Date(audit.createdAt).toISOString()} by M:${audit.executor.tag} (${audit.executor.id})
Can manage: ${mmbr.permissionsIn(newChannel).has(PermissionsBitField.Flags.ManageChannels, true)} (member: ${usr.id}, channel: ${newChannel.id}, allow: ${x.allow.bitfield}, deny: ${x.deny.bitfield})
${addingManager ? `Adding ${usr.id} as a manager of ${newChannel.id}` : ''}${removingManager ? `Removing ${x.id} as a manager of ${newChannel.id}` : ''}
				`,
			});
			await client.data.Users.update({
				chnlp: [...new Set(chn.map((e) => Array.from(e).join(';')))].join(';'),
			}, {
				where: {
					id: x.id,
				},
			});
		});

		rmv.forEach(async (id) => {
			const usr = await getUser(id);
			const mmbr = await client.guilds.cache.get(newChannel.guildId).members.fetch({ user: usr.id, force: true }).catch(() => {return;});
			if (!mmbr) return;
			client.channels.cache.get(client.config.channels.permlog).send({
				content: `
Audit log entry executed at ${new Date(audit.createdAt).toISOString()} by M:${audit.executor.tag} (${audit.executor.id})
Can manage: ${mmbr.permissionsIn(newChannel).has(PermissionsBitField.Flags.ManageChannels, true)} (member: ${usr.id}, channel: ${newChannel.id})
Removing data for ${id} in ${newChannel.id}
				`,
			});
			const user = await getUserData(id);
			let chn = user.get('chnl');
			// determine if member has any perms; `!chn` indicates no permissions.
			if (!chn) return;
			chn = arrayToMatrix(chn.split(';'), 3);
			const indx = chn.findIndex((f) => f[0] == newChannel.id);
			if (!indx) return;
			chn = chn.filter((f) => f[0] != newChannel.id);
			if (chn.length == 0) {
				await client.data.Users.update({
					chnlp: null,
				}, {
					where: {
						id: usr.id,
					},
				});
			}
			else {
				chn = chn.map((f) => f.join(';'));
				await client.data.Users.update({
					chnlp: chn.join(';'),
				}, {
					where: {
						id: usr.id,
					},
				});
			}
		});
	},
};
