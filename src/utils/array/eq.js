/**
 * Compares all elements across 2 arrays.
 * Returns true if all elements in both arrays are equal.
 * @source {@link https://stackoverflow.com/questions/7837456/how-to-compare-arrays-in-javascript}
 * @param {unknown[]} org Original array
 * @param {unknown[]} array Array to compare
 * @returns {boolean}
 */
export function equals(org, array) {
	// if the other array is a falsy value, return
	if (!array) {return false;}

	// compare lengths - can save a lot of time
	if (org.length != array.length) {return false;}

	for (let i = 0, l = org.length; i < l; i++) {
		// Check if we have nested arrays
		if (org[i] instanceof Array && array[i] instanceof Array) {
			// recurse into the nested arrays
			if (!org[i].equals(array[i])) {return false;}
		}
		else if (org[i] != array[i]) {
			// Warning - two different object instances will never be equal: {x:20} != {x:20}
			return false;
		}
	}
	return true;
}
