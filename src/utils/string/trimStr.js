/**
 * Trims a string. If the string is larger than its max length,
 * 3 dots will be added to the end and get trimmed
 * @param {string} str String to trim
 * @param {number} maxLen Maximum length of the string
 * @returns {string}
 */
export function trimStr(str, maxLen) {
	if (!str) return '';
	if (str.length <= maxLen) return str;
	return str.substring(0, maxLen - 3) + '...';
}
