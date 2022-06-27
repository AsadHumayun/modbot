import { client } from '../client/initClient.js';

/**
 * Logs the case (i.e. sends it to the modlog channel) and returns the message URL if successful.
 * @param {import("../../../types/Case").Case} caseData Case data of which to creat a log message for
 * @param {import("discord.js").MessageEmbed[]} embeds Embeds to send with the log message
 * @returns {Promise<?string>}
 */
export async function logCase(caseData, embeds) {
	const msg = await client.channels.cache.get(client.config.modlog).send({
		embeds,
	})
		.catch(() => {return;});

	if (!msg) return null;
	return msg.url;
}