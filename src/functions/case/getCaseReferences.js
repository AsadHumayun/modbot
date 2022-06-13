/**
 * Extracts all defined references in a command message.
 * References can be defined by appending "ref:" and having a list of case IDs following that separated by spaces
 * e.g. "ref:10,11"
 * @param {string[]} arr Array of arguments passed into the command
 * @returns {((string | undefined) | undefined)[]} String of referenced case IDs, separated by semicolons (;)
 */
export function getCaseReferences(arr) {
	let refs;
	let refIndex;
	for (const element in arr) {
		if (arr[element].startsWith('ref:') && !isNaN(arr[element].split('ref:')[1].split(',').join(''))) {
			refs = arr[element].split('ref:')[1].split(',').join(';');
			refIndex = element;
			break;
		}
		continue;
	}

	return [
		refs ?? undefined,
		refIndex,
	];
}