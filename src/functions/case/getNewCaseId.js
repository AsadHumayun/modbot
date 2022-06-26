import { client } from '../client/initClient.js';

/**
 * Generates a new case ID
 * @returns {number}
 */
export async function getNewCaseId() {
	const { count } = await client.data.Cases.findAndCountAll();
	return count + 1;
}
