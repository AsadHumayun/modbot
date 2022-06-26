/**
 * Sets the instantiated Discord client's presence.
 */
import { client } from './initClient.js';

/**
 * Updates the client user's presence.
 * @param {import("discord.js").PresenceData} data
 * @returns {void}
 */
export function setPresence(data) {
	if (data) {
		client.user.presence.set(data);
	}
	else {
		client.user.presence.set({
			activities: [{
				name: 'you',
				type: 'WATCHING',
			}],
			status: 'dnd',
		});
	}

	return void 0;
}
