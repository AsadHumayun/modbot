import { SlashCommandBuilder } from '@discordjs/builders';

const SlashCommandData = new SlashCommandBuilder()
	.setName('softban')
	.setDescription('Bans the target user and then immediately unbans (to delete messages)')
	.setDMPermission(false)
	.addUserOption(
		opt => opt
			.setName('target')
			.setDescription('The target user to softban')
			.setRequired(true),
	)
	.addStringOption(
		opt => opt
			.setName('reason')
			.setDescription('The reason for the softban'),
	)
	.addStringOption(
		opt => opt
			.setName('reference')
			.setDescription('Case IDs of previous cases to reference; separate multiple IDs with a comma'),
	);


export {
	SlashCommandData as SoftbanSlashCommandData,
};
