import { SlashCommandBuilder } from '@discordjs/builders';

const SlashCommandData = new SlashCommandBuilder()
	.setName('role')
	.setDescription('Add a role to a target user')
	.setDMPermission(false)
	.addUserOption(
		opt => opt
			.setName('target')
			.setDescription('The user')
			.setRequired(true),
	)
	.addRoleOption(
		opt => opt
			.setRequired(true)
			.setName('role')
			.setDescription('The role to add'),
	)
	.addStringOption(
		opt => opt
			.setName('reason')
			.setDescription('The reason'),
	)
	.addStringOption(
		opt => opt
			.setName('reference')
			.setDescription('Case IDs of previous cases to reference; separate multiple IDs with a comma')
			.setRequired(false),
	);

export {
	SlashCommandData as RoleSlashCommandData,
};
