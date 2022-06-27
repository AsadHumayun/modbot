import { client } from '../client/initClient.js';

/**
 * Fetches data for a particular user and creates an empty model if none exists.
 * @param {import("discord.js").Snowflake} id Snowflake user ID of the user to get data for
 * @returns {Promise<import("../../../types/RawUser").RawUser>}
 */
export async function getUserData(id) {
	if (!id) Promise.reject(new TypeError('[Functions:User:getUserData] Missing id'));

	const user = await client.data.Users.findByPk(id);
	if (!user) {
		await client.data.Users.create({
			id,
		});

		return await client.data.Users.findByPk(id);
	}

	return user;
}
