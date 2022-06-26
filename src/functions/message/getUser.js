import { client } from '../client/initClient.js';

/**
 * Extracts the ID of a mentioned user from its raw content
 * ID is not capitalised in order to keep it in line with Discord.js' naming conventions.
 * @param {string} mention String to extract mention ID from
 */
function _getId(mention) {
	if (!mention) return;
	return mention.match(/^<@!?(\d+)>$/)[1];
}

/**
 * Fetches a Discord User either by ID or raw mention
 * @param {string} str The mention - either ID or raw <@(!)id>
 * @returns {Promise<import("discord.js").User>} Discord user
 */
export async function getUser(str) {
	if (!str) return;
	let usr;
	try {
		usr = await client.users.fetch(_getId(str));
	}
	catch (err) {
		usr = await client.users.fetch(str).catch(() => {return;});
	}
	return usr;
}
