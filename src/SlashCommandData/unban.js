import { SlashCommandBuilder } from '@discordjs/builders';

const SlashCommandData = new SlashCommandBuilder()
	.setName('unban')
	.setDescription('Unbans a user from the server')
	.setDMPermission(false)
	.addStringOption(
		opt => opt
			.setName('target')
			.setDescription('The Snowflake ID of the target user to unban')
			.setRequired(true),
	)
	.addStringOption(
		opt => opt
			.setName('reason')
			.setDescription('The reason'),
	)
	.addStringOption(
		opt => opt
			.setName('reference')
			.setDescription('Case IDs of previous cases to reference; separate multiple IDs with a comma'),
	);

export {
	SlashCommandData as UnbanSlashCommandData,
};
