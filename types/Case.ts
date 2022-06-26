import type { Client, Snowflake } from 'discord.js';

interface Case {
	id: number;
	target: string;
	executor: string;
	reason: string;
	refersCases?: string;
	guildId: Snowflake;
	opcode: string;
	caseLogURL: string;
	roleId?: string;
};

export { Case };
