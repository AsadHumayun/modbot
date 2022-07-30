import { SlashCommandBuilder } from '@discordjs/builders';
import { client } from '../functions/client/initClient.js';

const SlashCommandData = new SlashCommandBuilder()
	.setName('unpunish')
	.setDescription('Unpunishes a user')
	.setDMPermission(false)
	.addUserOption(
		opt => opt
			.setName('target')
			.setDescription('The user who is to be unpunished')
			.setRequired(true),
	)
	.addIntegerOption(
		opt => opt
			.setName('ofnc')
			.setDescription('The offence that should be removed from the target user')
			.setRequired(true)
			.addChoices(
				...Object.entries(client.config.ofncs)
					.map(([ value, [ key ] ]) => {
						return {
							name: key,
							value: Number(value),
						};
					}),
			),
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
	SlashCommandData as UnpunishSlashCommandData,
};
