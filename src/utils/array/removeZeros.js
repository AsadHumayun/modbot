/**
 * Removes all zeros from an array and returns the new array
 * @param {unknown[]} arr Array
 * @returns {unknown[]}
 */
export function removeZeros(arr) {
	for (const elmt in arr) {
		if (arr[elmt] == 0 || arr[elmt].toString() == '0&0') arr[elmt] = '';
	}

	return arr;
}
