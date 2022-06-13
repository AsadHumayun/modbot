import type { Snowflake } from 'discord.js';

type ReasonType = string | "No reason was specified.";

interface Case {
	id: number;
	target: string;
	executor: string;
	reason: ReasonType;
	// array of case IDs
	refers_cases: (number | string)[];
	guild_id: Snowflake;
	// Represents an action type.
	opcode: number;
	case_log_url: string;
	role_id: string[];
};
