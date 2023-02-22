/**
 * Adds a reference to a case data object
 * @param {import("../../../types/Case").Case} case_ Data for the case
 * @param {number} ref reference to add
 * @returns {import("../../../types/Case").Case}
 */
export function insertReference(case_, ref) {
	if (!ref || isNaN(ref)) return case_;
	case_.refersCases = (case_.refersCases || '').split(';');
	case_.refersCases.push(ref);
	case_.refersCases = case_.refersCases.filter((f) => String(f).length > 0).join(';');

	return case_;
}
