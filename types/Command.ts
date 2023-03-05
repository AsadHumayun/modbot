import type { SlashCommandBuilder } from '@discordjs/builders';

interface Command {
	/**
	 * The name of the command
	 */
	name: string;
	/**
	 * Whether the command is a moderator command or not.
	 */
	moderator?: boolean;
	/**
	 * The slash command data for the command.
	 * Built in the ./SlashCommandData dir.
	 */
	slashCommandData: SlashCommandBuilder;
	/**
	 * The main function that is executed when the slash comand is triggered through an event.
	 * @param args The arguments for the command.
	 * @returns {Promise<void>}
	 */
	execute?: (...args: unknown[]) => Promise<void>;
}

export { Command }
