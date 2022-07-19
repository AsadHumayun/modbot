import type { SlashCommandBuilder } from '@discordjs/builders';

interface Command {
	/**
	 * The name of the command
	 */
	name: string;
	/**
	 * Thw slash command data for the command.
	 * Built in the ./SlashCommandData dir.
	 */
	slashCommandData: SlashCommandBuilder;
	execute?: (...args: unknown[]) => Promise<never>;
}

export { Command }
