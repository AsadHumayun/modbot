/**
 * Adds globally static field values to an `EmbedBuilder` instance and returns the modified version.
 * @param {import("discord.js").EmbedBuilder} embed Embed to add globally static fields to
 * @param {import("discord.js").User} target Target user
 * @param {import("discord.js").User} executor User who executed the command
 * @param {import("../../../types/Case").Case} caseData data for the case
 * @returns {import("discord.js").EmbedBuilder}
 */
export function applyGlobals(embed, target, executor, caseData) {
	return embed
		.addFields(
			{ name: 'Moderator', value: executor.tag },
			{ name: 'Reason', value: caseData.reason },
		);
}
