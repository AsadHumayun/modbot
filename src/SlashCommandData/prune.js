import { SlashCommandBuilder } from '@discordjs/builders';

const SlashCommandData = new SlashCommandBuilder()
	.setName('prune')
	.setDescription('Prunes member(s) from the current guild')
	.setDMPermission(false)
	.addIntegerOption(
		opt => opt
			.setName('days')
			.setDescription('Number of days of inactivity required to kick')
			.setMaxValue(30)
			.setMinValue(1)
			.setRequired(true),
	)
	.addStringOption(
		opt => opt
			.setName('reason')
			.setDescription('The reason for the prune'),
	)
	.addRoleOption(
		opt => opt
			.setName('role0')
			.setDescription('A role to bypass the "...and no roles" constraint when pruning (up to 5)'),
	)
	.addRoleOption(
		opt => opt
			.setName('role1')
			.setDescription('A role to bypass the "...and no roles" constraint when pruning (up to 5)'),
	)
	.addRoleOption(
		opt => opt
			.setName('role2')
			.setDescription('A role to bypass the "...and no roles" constraint when pruning (up to 5)'),
	)
	.addRoleOption(
		opt => opt
			.setName('role3')
			.setDescription('A role to bypass the "...and no roles" constraint when pruning (up to 5)'),
	)
	.addRoleOption(
		opt => opt
			.setName('role4')
			.setDescription('A role to bypass the "...and no roles" constraint when pruning (up to 5)'),
	);

export {
	SlashCommandData as PruneSlashCommandData,
};
