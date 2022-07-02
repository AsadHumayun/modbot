import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import { client } from './initClient.js';

/**
 * Updates global `ApplicationCommands` slash commands with Discord using REST.
 * Adapted from {@link https://discordjs.guide/interactions/slash-commands.html#registering-slash-commands}
 * @returns {Promise<void>}
 */
export async function reloadApplicationCommands() {
	const rest = new REST({ version: '9' }).setToken(process.env.token);
	const commands = [...client.commands.values()].map(({ slashCommandData }) => slashCommandData.toJSON());

	try {
		console.info('[Functions:reloadApplicationCommands] Started refreshing application commands');
		await rest.put(Routes.applicationCommands(client.user.id), { body: commands });
		console.info('[Functions:reloadApplicationCommands] Successfully reloaded application commands');
	}
	catch (e) {
		Promise.reject(
			new Error(
				`[Functions:reloadApplicationCommands] ${e.stack}`,
			),
		);
	}

	return void 0;
}
