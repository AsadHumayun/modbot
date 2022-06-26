/**
 * Formats an enum value to a more human-readable, presentable, neater string
 * Primarily intended for use in commands (frontend)
 * @param {string[]} enums The enums to format
 * @returns {string[]} The formatted enums
 */
export function formatEnums(enums) {
	return enums.map(enum_ => {
		// "enum" is a reserved word in javascript; "enum_" used instead
		return enum_
			.replace(/_/g, ' ')
			.split(' ')
			.map(word => {
				return word[0].toUpperCase() + word.slice(1).toLowerCase();
			});
	});
}
