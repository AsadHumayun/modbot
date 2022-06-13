/**
 * Extracts all defined references in a command message.
 * References can be defined by appending "ref:" and having a list of case IDs following that separated by spaces
 * e.g. "ref:10,11"
 * @param {string[]} arr Array of arguments passed into the command
 * @returns {string | undefined} String of referenced case IDs, separated by semicolons (;)
 */
export function getCaseReferences(arr) {
	let refs;
	for (const element in arr) {
		if (element.startsWith('ref:') && !isNaN(element.split('ref:')[1].split(',').join(''))) {
			refs = element.split('ref:')[1].split(',').join(';');
			break;
		}
		continue;
	}

	return refs ?? undefined;
}