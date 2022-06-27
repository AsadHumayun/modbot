import { SlashCommandBuilder } from '@discordjs/builders';

const SlashCommandData = new SlashCommandBuilder()
	.setName('test')
	.setDescription('eef43gh4254ed')
	.addStringOption(
		opt => opt
			.setName('command')
			.setDescription('tfufytf'),
	);

export {
	SlashCommandData as TestSlashCommandData,
};
