import { EmbedBuilder } from 'discord.js';
import { client } from '../../functions/client/initClient.js';
import { applyGlobals } from './.global.js';

/**
 * Constructs the embed for the unban DM notification
 * @param {import("discord.js").User} target Target user
 * @param {import("discord.js").User} executor User who executed the command
 * @param {import("discord.js").Guild} guild The guild in which the action was executed
 * @param {import("discord.js").User} display User whose tag is to be displayed on the error message
 * @param {import("../../../types/Case").Case} caseData data for the case
 * @returns {EmbedBuilder}
 */
export function unban(target, executor, guild, display, caseData) {
	return applyGlobals(
		new EmbedBuilder()
			.setColor(client.config.colors.green)
			.setDescription(`Your ban has been removed from ${guild.name}`)
		, target, executor, caseData,
	);
}
