import { CaseSlashCommandData } from './case.js';
import { TestSlashCommandData } from './test.js';
import { WarnSlashCommandData } from './warn.js';

/**
 * Collects all SlashCommandData and populates a new collection with it.
 * @param {Discord.Collection} targetCollection The target collection to be populated with SlashCommandData
 * @returns {void}
 */
export async function toCollection(targetCollection) {
	[
		CaseSlashCommandData,
		TestSlashCommandData,
		WarnSlashCommandData,
	]
		.map((data) => data.toJSON())
		.forEach((data) => targetCollection.set(data.name, data));

	return void 0;
};
