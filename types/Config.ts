import type { Snowflake } from 'discord.js';

/**
 * @see {@link https://www.reddit.com/r/typescript/comments/labup9/generic_types_for_record_values/}
 */
interface Config {
	display: Snowflake;
	case: {
		defaultReason: string;
	};
	roles: {
		member: Snowflake | '';
		muted: Snowflake;
		mod: Snowflake[];
	};
	colors: {
		invis: string;
		green: string;
		red: string;
		orange: string;
	},
	channels: {
		welcome: Snowflake;
		modlog: Snowflake;
		memberlog: Snowflake;
		permlog: Snowflake;
		msglog: Snowflake;
	},
		/**
	 * Roles to add upon guildMemberAdd, conditionless
	 */
	defaultRoles: Snowflake[];
	opcodes: Record<string, string>[];
	guildId: Snowflake,
	emojis: Record<string, string>;
	debugger: Record<string, string>;
};

export { Config };
