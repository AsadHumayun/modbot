import { client } from '../client/initClient.js';

/**
 * Generates a new case ID
 * @returns {Promise<number>}
 */
export async function getNewCaseId() {
	const { count } = await client.data.Cases.findAndCountAll();
	return count + 1;
}
