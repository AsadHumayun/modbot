import { SlashCommandBuilder } from '@discordjs/builders';

const SlashCommandData = new SlashCommandBuilder()
	.setName('case')
	.setDescription('Contains subcommands that allow for the management of moderation cases')
	// view subcommand
	.addSubcommand(
		sub => sub
			.setName('view')
			.setDescription('Views a case by specified case ID')
			.addIntegerOption(
				intOpt => intOpt
					.setName('case_id')
					.setDescription('The ID of the case to view')
					.setRequired(true),
			),
	)
	// list subcommand
	.addSubcommand(
		sub => sub
			.setName('list')
			.setDescription('Lists a number of cases in context of a particular user')
			.addUserOption(
				userOpt => userOpt
					.setName('target')
					.setDescription('The target user whose cases should be shown')
					.setRequired(true),
			)
			.addIntegerOption(
				intOpt => intOpt
					.setName('limit')
					.setDescription('The number of cases to show. Defaults to 25. Minimum is 1, maximum is 25')
					.setRequired(false),
			),
	)
	// clear history command
	.addSubcommand(
		sub => sub
			.setName('clear')
			.setDescription('Clears previous cases in context of a specified user')
			.addUserOption(
				opt => opt
					.setName('target')
					.setDescription('The target user whose cases should be removed')
					.setRequired(true),
			)
			.addStringOption(
				opt => opt
					.setName('reason')
					.setDescription('The reason for removing cases from the target user'),
			)
			.addIntegerOption(
				opt => opt
					.setName('limit')
					.setDescription('Number of cases to remove. Leave unspecified to remove all cases')
					.setMinValue(1),
			)
			.addStringOption(
				opt => opt
					.setName('reference')
					.setDescription('Case IDs of previous cases to reference; separate multiple IDs with a comma')
			)
	)

export {
	SlashCommandData as CaseSlashCommandData,
};