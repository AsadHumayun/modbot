import type { Snowflake } from 'discord.js';

interface User {
	/**
	 * Discord user id
	 */
	id: Snowflake;
	/**
	 * Role persist data.
	 * Different roles separated with a ';'
	 */
	roles?: string;
	/**
	 * Channel permission overwrites data.
	 * Each value is separated by a ';'
	 */
	chnlp?: string;
	/**
	 * Includes general metadata "yes/no" values.
	 * Each value is separated by a ';'
	 */
	metadata?: string;
	/**
	 * The user's offences.
	 * Each value is separated by a ';'
	 */
	ofncs?: string;
};

export { User };
