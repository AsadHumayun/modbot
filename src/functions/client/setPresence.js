/**
 * Sets the instantiated Discord client's presence.
 */
import { client } from './initClient.js';

/**
 * Updates the client user's presence.
 * @param {import("discord.js").PresenceData} data
 * @returns {void}
 */
export function setPresence(data = client.config.defaultClientPresenceData) {
	client.user.presence.set(data);
	return void 0;
}
