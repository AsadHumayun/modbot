import type { Snowflake } from 'discord.js';

interface RawCase {
	id: number;
	target: Snowflake;
	executor: Snowflake;
	reason: string;
	refers_cases?: string;
	guild_id: Snowflake;
	opcode: string;
	case_log_url: string;
	role_id?: Snowflake;
	prune_members_kicked?: number;
	prune_included_roles?: string;
	prune_days?: number;
	channel_id?: Snowflake;
};

export { RawCase };
