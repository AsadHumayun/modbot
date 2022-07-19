import { ClientEvents, type Client } from 'discord.js';

interface Event {
	/**
	 * The name of the event
	 */
	name: keyof ClientEvents;
	/**
	 * Whether or not this event can be emitted multiple times
	 */
	once: boolean;
	/**
	 * Function that is executed upon the event
	 * @param client The currently instantiated Discord client
	 * @param args The arugments to run this event with (these may vary depending on the event selected)
	 */
	execute(client: Client, ...args: unknown[]): Promise<void>;
}

export { Event };
