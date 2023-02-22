import { client } from '../client/initClient.js';
import { getCase } from './getCase.js';

/**
 * Updates a case in the database.
 * @param {Partial<import("../../../types/Case").Case>} data partial case data (only expected to provide properties that need to change)
 * @returns {void}
 * @danger partial case data passed here will not be validated
 */
export async function updateCase(data) {
	if (isNaN(data.id)) Promise.reject(new TypeError(`[Functions:updateCase] data.id: ID of the case to update must be given & of type Number, received ${typeof data.id}`));

	const _caseData = await getCase(data.id);
	if (!_caseData) {
		Promise.reject(new TypeError(
			'[Functions:updateCase] A case by that ID does not exist, create one instead',
		));
	}

	await client.data.Cases.update(data, {
		where: {
			id: data.id,
		},
	});

	return void 0;
}
