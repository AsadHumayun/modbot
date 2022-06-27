/**
 * Converts a `RawCase` to `Case`
 * @param {import("../../../types/RawCase").RawCase} case_ Raw case data to be converted to the internally handled interface
 * @returns {import("../../../types/Case").Case}
 */
export function fromRaw({
	id,
	target,
	executor,
	reason,
	refers_cases,
	role_id,
	guild_id,
	opcode,
	case_log_url,
}) {
	return {
		id,
		target,
		executor,
		reason,
		opcode,
		refersCases: refers_cases,
		roleId: role_id,
		guildId: guild_id,
		caseLogURL: case_log_url,
	};
}

/**
 * Converts a `Case` to a `RawCase`
 * @param {import("../../../types/Case").Case} case_ Case data to be converted to the raw interface
 * @returns {import("../../../types/RawCase").RawCase}
 */
export function toRaw({
	id,
	target,
	executor,
	reason,
	refersCases,
	roleId,
	guildId,
	opcode,
	caseLogURL,
}) {
	return {
		id: Number(id),
		target: target.toString(),
		executor: executor.toString(),
		reason: reason.toString(),
		opcode: Number(opcode),
		refers_cases: refersCases?.toString() || null,
		role_id: roleId?.toString() || null,
		guild_id: guildId.toString(),
		case_log_url: caseLogURL.toString(),
	};
}
