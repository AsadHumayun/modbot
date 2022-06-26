/**
 * Automatically pulls a reference from the most recent previous case of an opposing action.
 * E.g. if case with id 1 was a TIMEOUT_SET case, and case with id 2 was a TIMEOUT_REMOVE case, the auto
 * reference would return a reference of 1 if case data of id 2 was passed to the function.
 * @param {import("discord.js").CommandInteraction} interaction The interaction that instantiated the request
 * @param {import("../../../types/Case").Case} caseData Case data to compile a reference upon
 * @returns {Promise<number | null>}
 */
export async function autoReference(interaction, caseData) {
	const actionType = interaction.client.config.opcodes[caseData.opcode];
	if (!actionType?.rel) return;

	const entries = await interaction.client.data.Cases.findAll({
		where: {
			target: caseData.target,
			opcode: actionType.rel,
			guild_id: interaction.guildId,
		},
	});

	if (entries.length < 0) return;
	return entries[entries.length - 1].id;
}
