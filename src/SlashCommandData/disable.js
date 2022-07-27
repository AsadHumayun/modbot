import { SlashCommandBuilder } from '@discordjs/builders';

const SlashCommandData = new SlashCommandBuilder()
	.setName('disable')
	.setDMPermission(false)
	.setDescription('Toggles whether the bot should ignore interactions received from the current channel');

export {
	SlashCommandData as DisableSlashCommandData,
};
