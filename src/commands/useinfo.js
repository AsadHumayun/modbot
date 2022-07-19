import { MessageEmbed } from 'discord.js';
import { formatEnums } from '../utils/string/formatEnums.js';
import { UserInfoSlashCommandData as slashCommandData } from '../SlashCommandData/userinfo.js';

export default {
	slashCommandData,
	name: 'userinfo',
	async execute(client, interaction) {
		const member = interaction.options.getMember('target') || interaction.member;
		/*
		/**
		 * Returns an array of EmbedFieldData that can be sent to Discord, containing
		 * user-only properties. As these are present on both the guild member
		 * and user, having a function generate these will help keep the code clean.
		 * @param {import("discord.js").User} user target user
		 * @returns {import("discord.js").EmbedFieldData[]}
		 *//*
		const userProps = (user) => {
			return [
				{
					name: 'Joined Discord',
					value: `${user.createdAt.toISOString()}\n<t:${Math.trunc(user.createdAt.getTime() / 1000)}:R>`,
					inline: true,
				},
			];
		};

		if (!member) {
			/* The use is not a GuildMember instance */
			/*
			const user = interaction.options.getUser('target');
			return await interaction.reply({
				embeds: [
					new MessageEmbed()
						.setColor(client.config.colors.invis)
						.setDescription('The user is not a member of this server and therefore only limited information is displayed.')
						.setAuthor({
							name: user.bot ? user.tag + ' [BOT]' : user.tag,
							iconURL: user.displayAvatarURL({ dynamic: true }),
						})
						.addFields(userProps(user))
						.setTimestamp(),
				],
			});
		}
		*/
		// GuildMember
		return await interaction.reply({
			embeds: [
				new MessageEmbed()
					.setColor('BLUE')
					.setAuthor({
						name: member.user.bot ? member.user.tag + ' [BOT]' : member.user.tag,
						iconURL: member.user.displayAvatarURL({ dynamic: true }),
					})
					// .addFields(userProps(member.user))
					.addFields([
						{
							name: 'Joined Discord',
							value: `${member.user.createdAt.toISOString()}\n<t:${Math.trunc(member.user.createdAt.getTime() / 1000)}:R>`,
							inline: true,
						},
						{
							name: 'Joined Server',
							value: `${member.joinedAt.toISOString()}\n<t:${Math.trunc(member.joinedAt.getTime() / 1000)}:R>`,
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
							value: member.permissions.has('ADMINISTRATOR') ? 'Administrator' : member.permissions.toArray().join(', '),
							inline: true,
						},
						{
							name: 'Highest Role',
							value: member.roles.cache.highest.toString() || 'None',
						}
					]),
			],
		});
	},
};
