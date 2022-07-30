import { SlashCommandBuilder } from '@discordjs/builders';

const SlashCommandData = new SlashCommandBuilder()
	.setName('ban')
	.setDescription('Bans a user from the server')
	.setDMPermission(false)
	.addUserOption(
		opt => opt
			.setName('target')
			.setDescription('The target user to ban')
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
	SlashCommandData as BanSlashCommandData,
};
