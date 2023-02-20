import { EmbedBuilder, PermissionFlagsBits } from 'discord.js';
import { formatEnums } from '../utils/string/formatEnums.js';
import { UserInfoSlashCommandData as slashCommandData } from '../SlashCommandData/userinfo.js';

/**
 * @type {import('../../types/command').Command}
 */
export default {
	slashCommandData,
	name: 'userinfo',
	async execute(client, interaction) {
		const member = interaction.options.getMember('target') || interaction.member;
		const cases = await client.data.Cases.findAndCountAll({
			where: {
				target: member.user.id,
			},
		});

		const caseInfo = new Object();
		for (const { name } of client.config.opcodes) {
			caseInfo[name] = 0;
			cases.rows.forEach(({ opcode }) => {
				const actionName = client.config.opcodes[opcode].name;
				if (name === actionName) caseInfo[name]++;
			});
		}

		const moderationFieldValue = `
${member.kickable ? 'Kickable' : 'Not Kickable'}
${member.manageable ? 'Manageable' : 'Not Manageable'}
${member.moderatable ? 'Moderatable' : 'Not Moderatable'}
${member.communicationDisabledUntil ? 'Communications Disabled' : ''}
`;
		// GuildMember
		return await interaction.reply({
			embeds: [
				new EmbedBuilder()
					.setColor(member.displayHexColor)
					.setAuthor({
						name: member.user.bot ? member.user.tag + ' [BOT]' : member.user.tag,
						iconURL: member.user.displayAvatarURL({ dynamic: true }),
					})
					.addFields([
						{
							name: 'Joined Discord',
							value: `<t:${Math.trunc(member.user.createdAt.getTime() / 1000)}:R>`,
							inline: true,
						},
						{
							name: 'Joined Server',
							value: `<t:${Math.trunc(member.joinedAt.getTime() / 1000)}:R>`,
							inline: true,
						},
						{
							name: 'Roles',
							value: member.roles.cache.size > 40 ? (
								'Too many roles to display.'
							) : (
								member.roles.cache.map(role => role.toString()).join(' ')
							),
							inline: true,
						},
						{
							name: 'Permissions',
							value: member.permissions.has(PermissionFlagsBits.Administrator) ? 'Administrator' : member.permissions.toArray().join(', '),
							inline: true,
						},
						{
							name: 'Highest Role',
							value: member.roles.highest.toString() || '@everyone',
							inline: true,
						},
						{
							name: 'Display Name',
							value: member.displayName,
							inline: true,
						},
						{
							name: 'Moderation',
							value: moderationFieldValue || 'No information available.',
							inline: true,
						},
						{
							name: 'Previous Cases',
							value: `
${Object.entries(caseInfo).map(([key, amount], index) => {
		if (amount <= 0) return false;
		if (index === Object.entries(caseInfo).length - 1) {
			return `**${amount}** ${formatEnums([key])},`;
		}
		else {
			return `**${amount}** ${formatEnums([key])}`;
		}
	})
		.filter((v) => v !== false)
		.join(',\n')}
**${cases.count}** Total.
							`,
							inline: true,
						},
					]),
			],
		});
	},
};
