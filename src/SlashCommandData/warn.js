import { SlashCommandBuilder } from '@discordjs/builders';

const SlashCommandData = new SlashCommandBuilder()
	.setName('warn')
	.setDescription('Give a member of this server a warning for breaking the rules')
	.addUserOption(
		userOpt => userOpt
			.setName('target')
			.setDescription('The target user to be warned')
			.setRequired(true),
	)
	.addStringOption(
		strOpt => strOpt
			.setName('reason')
			.setDescription('The reason for the warn')
			.setRequired(false),
	)
	.addStringOption(
		strOpt => strOpt
			.setName('reference')
			.setDescription('Case IDs of previous cases to reference; separate multiple IDs with a comma')
			.setRequired(false),
	);

export {
	SlashCommandData as WarnSlashCommandData,
};
