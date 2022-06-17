import { TestSlashCommandData as slashCommandData } from '../SlashCommandData/test.js';

export default {
	slashCommandData,
	name: 'test',
	aliases: ['test', 't'],
	descriptor: 'A test command',
	async execute(client, interaction) {
		await interaction.reply({
			content: 'I am alive!',
			ephemeral: true,
		});
	},
};