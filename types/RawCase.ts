import type { Client, Snowflake } from 'discord.js';

interface RawCase {
	id: number;
	target: string;
	executor: string;
	reason: string;
	// array of case IDs
	refers_cases?: string;
	guild_id: Snowflake;
	// Represents an action type.
	opcode: string;
	case_log_url: string;
	role_id?: string;
};

export { RawCase };
