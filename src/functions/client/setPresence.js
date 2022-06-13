/**
 * Sets the instantiated Discord client's presence.
 */

// eslint-disable-next-line no-unused-vars
import * as Discord from 'discord.js';
import { client } from './initClient.js';

/**
 * Updates the client user's presence.
 * @param {Discord.PresenceData} data
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
