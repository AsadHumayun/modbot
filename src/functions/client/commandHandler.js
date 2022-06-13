/**
 * Iterates through the `commands` folder and adds them to the global `client.commands` cllection.
 * @source {@link https://discordjs.guide/creating-your-bot/command-handling.html}
 * @returns {void}
 */

import { join } from 'node:path';
import { readdirSync } from 'node:fs';
import { Collection } from 'discord.js';
import { client } from '../../index.js';

client.commands = new Collection();

const COMMANDS_PATH = join(process.cwd(), 'src', 'commands');
const commandFiles = readdirSync(COMMANDS_PATH).filter(file => file.endsWith('.js'));
console.debug(`[CommandHandler] Using commands directory: ${COMMANDS_PATH}`);

const START_TIME = Date.now();
for (const file of commandFiles) {
	const filePath = 'file:///' + join(COMMANDS_PATH, file);
	const { default: command } = await import(filePath);
	client.commands.set(command.name, command);
}

console.info(`[CommandHandler] Successfully cached ${client.commands.size} commands in ${Date.now() - START_TIME} ms`);