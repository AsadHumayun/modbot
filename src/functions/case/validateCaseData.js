/**
 * Validates case data
 * @param {CaseData} data Case data to be validated
 * @returns {true | Promise<rejected>}
 */
export async function validateCaseData(data) {
	if (!data) Promise.reject(new Error('[Functions:createCase] \'data\' must be of type Object, received null'));
	if (isNaN(data.id)) Promise.reject(new TypeError(`[Functions:createCase] data.id: must be type of Number, received ${typeof data.id}`));
	if (typeof data.target !== 'string') Promise.reject(new TypeError(`[Functions:createCase] data.target: must be of type Snowflake, received ${typeof data.target}`));
	if (typeof data.executor !== 'string') Promise.reject(new TypeError(`[Functions:createCase] data.executor: must be of type Snowflake, received ${typeof data.target}`));
	if (data.refersCases?.map(Number).includes(NaN)) Promise.reject(new TypeError('[Functions:createCase] data.refersCases: must be of type number[]'));
	if (typeof data.guildId !== 'string') Promise.reject(new TypeError(`[Functions:createCase] data.guildId: must be Snowflake, received ${typeof data.guild_id}`));
	if (isNaN(data.opcode)) Promise.reject(new TypeError(`[Functions:createCase] data.opcode: must be of type Number, received ${typeof data.opcode}`));
	if (typeof data.caselogURL !== 'string') Promise.reject(new TypeError(`[Functions:createCase] data.caseLogURL: must be of type String, received ${typeof data.caseLogURL}`));
	if (typeof data.roleId !== 'undefined' && typeof data.roleId !== 'string') Promise.reject(new TypeError(`[Functions:createCase] data.roleId: must be of type String or null, received ${typeof data.roleId}`));

	return true;
}