import type { Snowflake } from 'discord.js';

interface RawCase {
	id: number;
	target: string;
	executor: string;
	reason: string;
	refers_cases?: string;
	guild_id: Snowflake;
	opcode: string;
	case_log_url: string;
	role_id?: string;
	prune_members_kicked: number;
	prune_included_roles?: string;
	prune_days?: number;
};

export { RawCase };
