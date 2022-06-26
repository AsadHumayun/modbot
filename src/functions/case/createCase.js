import { client } from '../client/initClient.js';
import { validateCaseData } from './validateCaseData.js';

/**
 * Creates the case in the database and performs actions to validate input
 * @param {import("../../../types/Case").Case} data case data
 * @returns {void}
 */
export async function createCase(data) {
	const valid = await validateCaseData(data);
	if (valid) {
		await client.data.Cases.create({
			id: Number(data.id),
			target: data.target,
			executor: data.executor,
			reason: data.reason ?? client.config.case.defaultReason,
			refers_cases: data.refersCases ?? null,
			guild_id: data.guildId,
			opcode: Number(data.opcode),
			case_log_url: data.caseLogURL,
			role_id: data.roleId ?? null,
		});
	}

	return void 0;
}
