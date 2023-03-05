import type { Snowflake, PresenceData } from 'discord.js';

/**
 * Type declaration for the config object.
 * @see {@link https://www.reddit.com/r/typescript/comments/labup9/generic_types_for_record_values/}
 */
interface Config {
	/**
	 * ID for the Discord user whose tag is to be shown in modlog cases
	 */
	display: Snowflake;
	case: {
		/**
		 * The default reason for cases when the executing user has not provided one
		 */
		defaultReason: string;
	};
	roles: {
		/**
		 * Member role to be added to a user when they join the guild on the 'guilsMemberAdd' event
		 */
		member?: Snowflake;
		/**
		 * Muted role to be added to a user when they are muted on antiraid
		 */
		muted: Snowflake;
		/**
		 * A list of roles that are considered 'moderator' roles.
		 * These roles will have the ability to use moderator commands.
		 */
		mod: Snowflake[];
	};
	/**
	 * Colours for embeds
	 */
	colors: {
		invis: string;
		green: string;
		red: string;
		orange: string;
	},
	channels: {
		/**
		 * The channel ID for the welcome channel.
		 */
		welcome: Snowflake;
		/**
		 * The channel ID for the modlogs channel - this is where created cases will be logged.
		 */
		modlog: Snowflake;
		/**
		 * The channel ID for the memberlogs channel - this is where member join/leave events will be logged.
		 */
		memberlog: Snowflake;
		/**
		 * The channel ID for the permissionlogs channel - this is where permission changes will be logged.	
		 */
		permlog: Snowflake;
		/**
		 * The channel ID for the message logs channel - this is where deleted or edited messages will be logged.
		 */
		msglog: Snowflake;
	},
	/**
	 * Roles to add upon guildMemberAdd, conditionless
	 */
	defaultRoles: Snowflake[];
	/**
	 * Opcodes for cases' action types
	 * Integer value used to represent different action types.
	 */
	opcodes: Record<string, string>[];
	/**
	 * ID of the guild in which the bot is supposed to be moderating
	 */
	guildId: Snowflake,
	emojis: Record<string, string>;
	debugger: {
		/**
		 * Discord webhook URL to send debugger event messages to
		 */
		'@link': string;
	};
	/**
	 * The default client presence data that should be applied to the client in the setPresence function
	 * in the absence of the 'data' parameter.
	 */
	defaultClientPresenceData: PresenceData;
	/**
	 * Object containing the offences indexes and their corresponding names and punishment level
	 */
	ofncs: Record<string, [string, number]>;
};

export { Config };
