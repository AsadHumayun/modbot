/**
 * Iterates through the `events` folder, and binds them to the client.
 * @source {@link https://discordjs.guide/creating-your-bot/event-handling.html}
 * @returns {void}
 */

import { join } from 'node:path';
import { readdirSync } from 'node:fs';
import { client } from '../index.js';

const EVENTS_PATH = join(process.cwd(), 'src', 'events');
const eventFiles = readdirSync(EVENTS_PATH).filter(file => file.endsWith('.js'));
console.info(`[EventHandler] Detected events directory: ${EVENTS_PATH}`);

for (const file of eventFiles) {
	const filePath = join(EVENTS_PATH, file);

	const { default: event } = await import('file:///' + filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(client, ...args));
	}
	else {
		client.on(event.name, (...args) => event.execute(client, ...args));
	}
}