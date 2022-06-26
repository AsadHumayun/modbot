/**
 * Adds a reference to a case data object
 * @param {import("../../../types/Case").Case} case_ Data for the case
 * @param {number} ref reference to add
 * @returns {import("../../../types/Case").Case}
 */
export function insertReference(case_, ref) {
	if (!ref || isNaN(ref)) return;
	if (ref && !case_.refersCases) {
		case_.refersCases = ref.toString();
	}
	else if (ref && case_.refersCases) {
		case_.refersCases = `${case_.refersCases};${ref.toString()}`;
	}

	return case_;
}
