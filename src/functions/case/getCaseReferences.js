import { Op } from 'sequelize';
import { client } from '../client/initClient.js';

/**
 * Returns an array of hyperlinked case references. Checks are carried out here to ensure that the length of the returned string
 * does not exist that of further constraints. (e.g. Discord imposes a 6000 character limit on embeds)
 * @param {number[]} cases array of case IDs to compile references for
 * @param {?number} prevChars amount of chars that will have preceded this and should be included in the char count
 * @param {number} charLimit char limit - once reached, appends "..." and leaves it at that.
 * @returns {Promise<string>}
 */
export async function getCaseReferences(cases, prevChars = 0, charLimit) {
	const final = [];
	let chars = prevChars;
	const data = await client.data.Cases.findAll({
		attributes: ['id', 'case_log_url'],
		where: {
			id: {
				[Op.in]: cases,
			},
		},
	});

	for (const { dataValues } of data) {
		const ref = `[#${dataValues.id}](${dataValues.case_log_url})`;
		if (chars + ref.length > charLimit) {
			if (chars + 3 > charLimit) break;
			final.push('...');
			break;
		}

		final.push(ref);
		chars += ref.length;
	}

	return final;
}
