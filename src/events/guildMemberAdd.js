import { setTimeout } from 'node:timers/promises';
import { logCase } from '../functions/case/logCase.js';
import { EmbedBuilder, PermissionsBitField, UserFlagsBitField } from 'discord.js';
import { getUser } from '../functions/message/getUser.js';
import { createCase } from '../functions/case/createCase.js';
import { arrayToMatrix } from '../utils/array/arrayToMatrix.js';
import { getNewCaseId } from '../functions/case/getNewCaseId.js';
import { getUserData } from '../functions/userData/getUserData.js';
import { constructEmbed } from '../functions/case/constructEmbed.js';
import { antiRaidMuteSet } from '../embeds/dmNotification/antiRaidMuteSet.js';

/**
 * @type {import("../../types/Event").Event}
 */
export default {
	name: 'guildMemberAdd',
	once: false,
	async execute(client, member) {
		if (member.guild.id != client.config.guildId) return;

		const user = await getUserData(member.id);
		const metadata = user.get('metadata')?.split(';') || [];
		const roles = user.get('roles')?.split(';') || [];
		const channel = member.guild.channels.cache.get(client.config.channels.welcome);
		const rle = [].concat(client.config.defaultRoles);
		for (const role of roles) {
			if (member.guild.roles.cache.get(role)) rle.push(role);
		}

		await member.roles.add(rle).catch(() => {return;});

		let chn = user.get('chnlp');
		if (chn) {
			chn = arrayToMatrix(chn.split(';'), 3);
			chn.forEach(async (x) => {
				client.channels.cache.get(client.config.channels.permlog)
					.send(`${Math.trunc(Date.now() / 60000)}: Attempting to restore permissions for ${member.user.tag}(${member.user.id})>:\nchannel: ${x[0]} -> deny: ${x[1]}, allow: ${x[2]}`);

				try {
					client.channels.cache.get(x[0])
						.send({ content: `${Math.trunc(Date.now() / 60_000)}: Attempting to restore channel permissions for M(${member.id}) > data: ${x.join(';')}` });
				}
				catch (e) {
					return client.channels.cache.get(client.config.channels.permlog)
						.send(`${Math.trunc(Date.now() / 60_000)}: Disregarding permissionOverwrites.edit request from M:<${member.user.tag} (${member.id})>: \`No channel with ID "${x[0]}" found.\``);
				}
				/* Prevent API spam if many channels are in the user's persist data */
				await setTimeout(1000);
				try {
					const permissions = {};
					Object.entries(new PermissionsBitField(BigInt(Number(x[1]))).serialize()).filter((s) => s[1] === true).forEach((s) => permissions[s[0]] = false);
					Object.entries(new PermissionsBitField(BigInt(Number(x[2]))).serialize()).filter((s) => s[1] === true).forEach((s) => permissions[s[0]] = true);
					Object.keys(PermissionsBitField.Flags).forEach((flag) => {
						if (!Object.keys(permissions).includes(flag)) permissions[flag] = null;
					});
					member.guild.channels.cache.get(x[0]).permissionOverwrites.edit(member.id, permissions);
					client.channels.cache.get(client.config.channels.permlog)
						.send(`${Math.trunc(Date.now() / 60_000)}: Successfully restored permissions for M:<${member.user.tag} (${member.id})>: ${x[0]} -> d: ${x[1]}, a: ${x[2]}`);
					client.channels.cache.get(x[0])
						.send(`Successfully restored permissions for M:<${member.user.tag} (${member.id})>: d: ${x[1]}, a: ${x[2]}`);
				}
				catch (e) {
					client.channels.cache.get(client.config.channels.permlog)
						.send(`${Math.trunc(Date.now() / 60_000)}: Unable to restore permissions for M:<${member.user.tag} (${member.id})>: data: ${x.join(';')}\nError: \`${e}\``);
				}
			});
		}
		if (metadata.includes('cl')) {
			channel.send({ content: `♥️ Welcome back ${member}! Can't believe u left me :c` });
		}
		else {
			channel.send({ content: `Welcome ${member} to ${member.guild.name}!` });
			metadata.push('cl');
			await client.data.Users.update({
				metadata: metadata.join(';'),
			}, {
				where: {
					id: member.id,
				},
			});
		}
		await user.reload();
		const owner = await getUser(client.config.display);
		if (
			Number(member.user.createdTimestamp) > Date.now() - 1209600000 ||
			member.user.flags.has(UserFlagsBitField.Flags.Spammer) ||
			!member.user.avatarURL()
		) {
			if (member.communicationsDisabledUntil) return;

			const caseId = await getNewCaseId();
			/**
			 * @type {import("../../types/Case").Case}
			 */
			const case_ = {
				id: caseId,
				target: member.id,
				executor: client.user.id,
				reason: `Your account was flagged as a potential threat to our server. If you believe that you were muted erroneously, please contact \`${owner.tag}\`.`,
				guildId: member.guild.id,
				opcode: 5,
			};
			const embed = await constructEmbed(case_);
			case_.caseLogURL = await logCase(case_, [embed]);
			await createCase(case_);
			await client.channels.cache.get(client.config.channels.welcome).send({
				embeds: [
					new EmbedBuilder()
						.setColor(client.config.colors.red)
						.setDescription(
							`${member.user.tag} has been given a 100000000 minute mute for "anti-raid" and was sent the following message:`,
						),
					antiRaidMuteSet(member.user, client.user, member.guild, owner, case_),
				],
			});
			await member.roles.add(client.config.roles.muted, { reason: '[AUTOMOD] [auto] anti-raid detection' })
				.catch((e) => new TypeError(`Muted role not found, current: ${client.config.roles.muted}\nFull error:\n${e.stack}`));
			member.send({ embeds: [
				antiRaidMuteSet(member.user, client.user, member.guild, owner, case_),
			] })
				.catch(() => {return;});
		}
		client.channels.cache.get(client.config.channels.memberlog).send({ embeds: [
			new EmbedBuilder()
				.setColor('#00FF0C')
				.setDescription(`Created <t:${Math.trunc(member.user.createdAt.getTime() / 1000)}:R>`)
				.setAuthor({ name: member.user.tag, iconURL: member.user.displayAvatarURL({ dynamic: true }) })
				.setFooter({ text: `Member Joined • ID: ${member.user.id}` })
				.setTimestamp(),
		] });
	},
};
