import type { Snowflake } from 'discord.js';

interface Channel {
	/**
	 * ID of the channel
	 */
	id: Snowflake;
	/**
	 * Whether or not the bot should ignore interactions in this channel
	 */
	disabled?: boolean;
}

export {
	Channel,
}
