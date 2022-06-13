import { setPresence } from '../functions/client/setPresence.js';

export default {
	name: 'ready',
	once: false,
	async execute(client) {
		console.info(`[Events:READY] Successfully logged in as ${client.user.tag} (${client.user.id})`);
		setPresence();
	},
};