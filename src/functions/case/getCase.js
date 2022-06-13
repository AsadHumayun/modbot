import { client } from '../client/initClient.js';

/**
 * Fetches and returns the case with the specified ID from the database
 * @param {string} id ID of the case to get
 * @returns {Promise<CaseData | undefined>}
 */
export async function getCase(id) {
	const _case = await client.data.cases.findByPk(id).catch(() => {return;});

	return _case ?? undefined;
}