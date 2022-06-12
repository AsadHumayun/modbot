import { client } from '../initClient.js';

export async function createCase(CaseData) {
	if (!CaseData) Promise.reject(new Error(`[Functions:createCase] 'CaseData' is null`));
}
