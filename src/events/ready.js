import { reloadApplicationCommands } from '../functions/client/reloadApplicationCommands.js';
import { setPresence } from '../functions/client/setPresence.js';
// import { toCollection } from '../SlashCommandData/.toCollection.js';

export default {
	name: 'ready',
	once: false,
	async execute(client) {
		console.info(`[Events:READY] Successfully logged in as ${client.user.tag} (${client.user.id})`);
		await reloadApplicationCommands();
		// await toCollection(client.slashCommandData);
		setPresence();
		await client.users.fetch(client.config.display);
	},
};
