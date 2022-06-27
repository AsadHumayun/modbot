/**
 * Converts a normal array to a 2d array of optional number of subvalues.
 * @param {any[]} list Original 1d array
 * @param {number} elementsPerSubArray Number of elements per subArray
 * @returns {any[]} matrix matrix (the new array)
 * @source {@link https://stackoverflow.com/questions/4492385/convert-simple-array-into-two-dimensional-array-matrix}
 */
export function arrayToMatrix(list, elementsPerSubArray) {
	const matrix = [];
	let i, k;
	for (i = 0, k = -1; i < list.length; i++) {
		if (i % elementsPerSubArray === 0) {
			k++;
			matrix[k] = [];
		}

		matrix[k].push(list[i]);
	}

	return matrix;
}
