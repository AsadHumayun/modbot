import { toRaw } from './transformCase.js';
import { client } from '../client/initClient.js';
import { validateCaseData } from './validateCaseData.js';

/**
 * Creates the case in the database and performs actions to validate input
 * @param {import("../../../types/Case").Case} data case data
 * @returns {Promise<void>}
 */
export async function createCase(data) {
	const valid = await validateCaseData(data);
	if (valid) await client.data.Cases.create(toRaw(data));

	return void 0;
}
