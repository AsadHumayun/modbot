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
	);

export {
	SlashCommandData as CaseSlashCommandData,
};