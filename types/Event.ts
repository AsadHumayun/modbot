import { ClientEvents, type Client } from "discord.js";

interface Event {
	name: keyof ClientEvents;
	once: boolean;
	execute(client: Client, ...args: unknown[]): Promise<void>;
}

export { Event };
