import { SlashCommandBuilder } from '@discordjs/builders';
import { client } from '../functions/client/initClient.js';

const SlashCommandData = new SlashCommandBuilder()
	.setName('punish')
	.setDescription('Punish a user for the violation of a particular offence')
	.setDMPermission(false)
	.addUserOption(
		opt => opt
			.setName('target')
			.setDescription('The user who is to be punished')
			.setRequired(true),
	)
	.addIntegerOption(
		opt => opt
			.setName('ofnc')
			.setDescription('The offence that the user should be punished for')
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
	);

export {
	SlashCommandData as PunishSlashCommandData,
};
