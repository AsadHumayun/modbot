import { SlashCommandBuilder } from '@discordjs/builders';

const SlashCommandData = new SlashCommandBuilder()
	.setName('offences')
	.setDescription('View a target user\'s offences')
	.setDMPermission(false)
	.addUserOption(
		opt => opt
			.setName('target')
			.setDescription('The user whose offences are to be shown')
			.setRequired(false),
	)
	.addBooleanOption(
		opt => opt
			.setName('raw')
			.setDescription('Whether offences should be displayed in their raw format (deprecated)'),
	);

export {
	SlashCommandData as OffencesSlashCommandData,
};
