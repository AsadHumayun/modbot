import { reloadApplicationCommands } from '../functions/client/reloadApplicationCommands.js';
import { setPresence } from '../functions/client/setPresence.js';

/**
 * @type {import('../../types/Event').Event}
 */
export default {
	name: 'ready',
	once: false,
	async execute(client) {
		console.info(`[Events:READY] Successfully logged in as ${client.user.tag} (${client.user.id})`);
		await reloadApplicationCommands();
		setPresence();
		await client.users.fetch(client.config.display);
		await client.guilds.cache.get(client.config.guildId).members.fetch();
	},
};
