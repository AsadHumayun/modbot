import { client } from '../client/initClient.js';
import { setTimeout } from 'node:timers/promises';
import {
	writeFile,
	existsSync,
	createWriteStream,
} from 'node:fs';

/**
 * Logs the case (i.e. sends it to the modlog channel) and returns the message URL if successful.
 * @param {import("../../../types/Case").Case} caseData Case data of which to creat a log message for
 * @param {import("discord.js").EmbedBuilder[]} embeds Embeds to send with the log message
 * @returns {Promise<?string>}
 */
export async function logCase(caseData, embeds) {
	if (!Array.isArray(embeds)) Promise.reject(new TypeError(`[Functions:logCase] 'embeds' must be of type EmbedBuilder[], received ${typeof embeds}`));
	const fLog = `
Client Uptime: ${client.uptime}
Unix Timestamp: ${Date.now() / 1000}
Case Data: 
\`\`\`json
${JSON.stringify(caseData, null, 4)}
\`\`\`
(cba to actually parse it properly lmfaoooo)
`;
	const today = new Date(Date.now()).toISOString().split('T')[0];
	const path = `${process.cwd()}/.logs/cases/${today}.log`;
	// today example: 2021-12-13 (for: 13 Dec 2021)
	if (!existsSync(path)) {
		writeFile(path, fLog, (async (err) => {
			if (err) console.error('FSERROR(CREATE_FILE)', err);
		}));
	}
	else {
		createWriteStream(path, { flags: 'a' }).end(fLog);
	}
	await setTimeout(1000);

	const msg = await client.channels.cache.get(client.config.channels.modlog).send({
		embeds,
	})
		.catch((e) => console.log(e));

	if (!msg) throw new Error('Failed to send message to log channel.');
	return msg.url;
}
