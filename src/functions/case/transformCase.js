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
	prune_members_kicked,
	prune_included_roles,
	prune_days,
	channel_id,
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
		pruneMembersKicked: prune_members_kicked,
		pruneIncludedRoles: prune_included_roles,
		pruneDays: prune_days,
		channelId: channel_id,
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
	pruneMembersKicked,
	pruneIncludedRoles,
	pruneDays,
	channelId,
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
		prune_members_kicked: pruneMembersKicked ? Number(pruneMembersKicked) : null,
		prune_included_roles: pruneIncludedRoles?.toString() || null,
		prune_days: pruneDays ? Number(pruneDays) : null,
		channel_id: channelId?.toString(),
	};
}
