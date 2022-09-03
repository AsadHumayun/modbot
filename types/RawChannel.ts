import type { Snowflake } from 'discord.js';

interface RawChannel {
	id: Snowflake;
	disabled?: boolean;
};

export {  
	RawChannel,
}
