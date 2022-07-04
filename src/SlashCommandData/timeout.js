import { SlashCommandBuilder } from '@discordjs/builders';

const SlashCommandData = new SlashCommandBuilder()
	.setName('timeout')
	.setDescription('`set` or `remove` a timeout for a given user')
	.setDMPermission(false)
	.addSubcommand(
		cmd => cmd
			.setName('set')
			.setDescription('Set a timeout for a particular user')
			.addUserOption(
				opt => opt
					.setName('target')
					.setDescription('The user to be timed out')
					.setRequired(true),
			)
			.addIntegerOption(
				opt => opt
					.setName('minutes')
					.setDescription('Number of minutes the user should be timed out for')
					.setRequired(true),
			)
			.addStringOption(
				opt => opt
					.setName('reason')
					.setDescription('The reason for which the user has been timed out for')
					.setRequired(false),
			)
			.addStringOption(
				opt => opt
					.setName('reference')
					.setDescription('Case IDs of previous cases to reference; separate multiple IDs with a comma')
					.setRequired(false),
			),
	)
	.addSubcommand(
		cmd => cmd
			.setName('remove')
			.setDescription('Removes the timeout for a prticular target user')
			.addUserOption(
				opt => opt
					.setName('target')
					.setDescription('The user whose time out is to be removed')
					.setRequired(true),
			)
			.addStringOption(
				opt => opt
					.setName('reason')
					.setDescription('The reason for which the user has been timed out for')
					.setRequired(false),
			)
			.addStringOption(
				opt => opt
					.setName('reference')
					.setDescription('Case IDs of previous cases to reference; separate multiple IDs with a comma')
					.setRequired(false),
			),
	);

export {
	SlashCommandData as TimeoutSlashCommandData,
};
