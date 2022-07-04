import { trimStr } from '../utils/string/trimStr.js';
import { getUser } from '../functions/message/getUser.js';
import { arrayToMatrix } from '../utils/array/arrayToMatrix.js';
import { getUserData } from '../functions/userData/getUserData.js';

/**
 * @type {import("../../types/Event").Event}
 */
export default {
	name: 'channelCreate',
	once: false,
	async execute(client, channel) {
		if (['DM', 'GROUP_DM'].includes(channel.type) || (channel.guild.id != client.config.guildId)) return;
		const audit = (await channel.guild.fetchAuditLogs({ limit: 1, type: 'CHANNEL_CREATE' })).entries.first();
		const channelPermissions = [...channel.permissionOverwrites.cache.values()].filter((d) => d.type == 'member');
		channelPermissions.forEach(async (x) => {
			const usr = await getUser(x.id);
			const user = await getUserData(usr.id);
			let chn = user.get('chnlp');
			chn = chn ? arrayToMatrix(chn.split(';'), 3) : [];
			// a new channel is being created, therefore we don't need to check to see if a previous entry exists (it's not easy to guess the snowflake accurately and correctly)
			chn.push([channel.id, x.deny.bitfield, x.allow.bitfield]);
			client.channels.cache.get(client.config.channels.permlog).send({
				// "[false]" because false is implied (as users cannot edit specific perms on channelCreate -- only thing that they can edit is ability to view, not manage).
				content: `
	Audit log entry executed at ${new Date(audit.createdAt).toISOString()} by M:${audit.executor.tag}(${audit.executor.id})
	Can manage: [false] (member: ${usr.id}, channel: ${channel.id}, allow: ${x.allow.bitfield}, deny: ${x.deny.bitfield})
				`,
			});
			chn = chn.map((a) => Array.from(a).join(';'));
			chn = [...new Set(chn)];
			await client.data.Users.update({
				chnlp: chn.join(';'),
			}, {
				where: {
					id: x.id,
				},
			});
			client.channels.cache.get(client.config.channels.permlog).send({ content: `${Math.trunc(Date.now() / 60000)} U:<${usr.tag} (${usr.id})>: Successfully set chnlp as ${trimStr(chn.join(';'), 1900)} ` });
		});
	},
};
