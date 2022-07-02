/**
 * Converts a `RawUser` to `User`
 * @param {import("../../../types/RawUser").RawUser} user Raw user data to be converted to the internally handled interface
 * @returns {import("../../../types/User").User}
 */
export function fromRaw({
	id,
	roles,
	chnlp,
	metadata,
}) {
	return {
		id,
		roles,
		chnlp,
		metadata,
	};
}

/**
 * Converts a `User` to a `RawUser`
 * @param {import("../../../types/User").User} user User data to be converted to the raw interface (used in db)
 * @returns {import("../../../types/RawUser").RawUser}
 */
export function toRaw({
	id,
	roles,
	chnlp,
	metadata,
}) {
	return {
		id,
		roles,
		chnlp,
		metadata,
	};
}
