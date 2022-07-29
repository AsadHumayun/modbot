import type { Snowflake } from 'discord.js';

interface Case {
	/**
	 * Case ID. Unique integer primary key, incremented on each case creation
	 */
	id: number;
	/**
	 * Discord ID of the user on which this action was executed.
	 */
	target: string;
	/**
	 * Dicord ID of the user who executed this case.
	 */
	executor: string;
	/**
	 * The reason for this case.
	 */
	reason: string;
	/**
	 * References made to other cases.
	 * Joint by ';'
	 */
	refersCases?: string;
	/**
	 * The ID of the guild in which this case was carried out in.
	 */
	guildId: Snowflake;
	/**
	 * The integer opcode value that represents the action carried out.
	 */
	opcode: string;
	/**
	 * The message URL of the case.
	 */
	caseLogURL: string;
	/**
	 * Any roles that were either added to or removed from the user in this case.
	 */
	roleId?: string;
	/**
	 * Number of members kicked whilst pruning.
	 * (Only applicable in a prune case)
	 */
	pruneMembersKicked?: number;
	/**
	 * Additional roles included within the prune
	 * (Only applicable in a prune case)
	 */
	pruneIncludedRoles?: string;
	/**
	 * Number of days that members were required to be inactive for
	 * in order to be eligible for pruning.
	 * (Only applicable in a prune case)
	 */
	pruneDays?: number;
};

export { Case };
