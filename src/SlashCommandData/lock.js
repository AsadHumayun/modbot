import { SlashCommandBuilder } from '@discordjs/builders';

const SlashCommandData = new SlashCommandBuilder()
	.setName('lock')
	.setDescription('Locks the channel (Explicit deny for @everyone to send messages)')
	.setDMPermission(false)
	.addChannelOption(
		opt => opt
			.setName('target')
			.setDescription('The target channel to lock')
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
			.setDescription('Case IDs of previous cases to reference; separate multiple IDs with a comma')
			.setRequired(false),
	);

export {
	SlashCommandData as LockSlashCommandData,
};
