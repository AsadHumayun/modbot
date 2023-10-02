import { EmbedBuilder, PermissionsBitField } from 'discord.js';
import { DisableSlashCommandData as slashCommandData } from '../SlashCommandData/disable.js';

/**
 * @type {import('../../types/Command').Command}
 */
export default {
	slashCommandData,
	name: 'disable',
	moderator: true,
	async execute(client, interaction) {
		if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
			return await interaction.followUp({
				content: 'You must have the `ADMINISTRATOR` permission in order to use this command!',
				ephemeral: true,
			});
		}
		const channel = await client.data.Channels.findByPk(interaction.channel.id);

		if (!channel || !channel.dataValues.disabled) {
			/* Not disabled - disable in current channel */
			await client.data.Channels.upsert({
				id: interaction.channel.id,
				disabled: true,
			});

			return await interaction.followUp({
				embeds: [
					new EmbedBuilder()
						.setColor(client.config.colors.red)
						.setAuthor({
							name: interaction.user.tag,
							iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
						})
						.setDescription(`Interactions will now be ignored in this channel (${interaction.channel.toString()})`)
						.setTimestamp(),
				],
			});
		}
		else {
			/* Commands already disabled - enable them! */

			await client.data.Channels.update({
				disabled: false,
			}, {
				where: {
					id: interaction.channel.id,
				},
			});

			return await interaction.followUp({
				embeds: [
					new EmbedBuilder()
						.setColor(client.config.colors.green)
						.setAuthor({
							name: interaction.user.tag,
							iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
						})
						.setDescription(`Interactions will no longer be ignored in this channel (${interaction.channel.toString()})`)
						.setTimestamp(),
				],
			});
		}
	},
};
