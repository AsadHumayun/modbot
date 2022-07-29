import type { Snowflake } from 'discord.js';

interface RawUser {
	id: Snowflake;
	roles: string;
	chnlp: string;
	metadata: string;
	ofncs: string;
}

export { RawUser };
