import { EmbedBuilder } from 'discord.js';
import { client } from '../../functions/client/initClient.js';
import { applyGlobals } from './.global.js';

/**
 * Constructs the embed for the kick DM notification
 * @param {import("discord.js").User} target Target user
 * @param {import("discord.js").User} executor User who executed the command
 * @param {import("discord.js").Guild} guild The guild in which the action was executed
 * @param {import("discord.js").User} display User whose tag is to be displayed on the error message
 * @param {import("../../../types/Case").Case} caseData data for the case
 * @returns {EmbedBuilder}
 */
export function kick(target, executor, guild, display, caseData) {
	return applyGlobals(
		new EmbedBuilder()
			.setColor(client.config.colors.orange)
			.setDescription(`You have been removed from ${guild.name}. If you believe that this was a mistake, please contact ${display.tag} (don't spam though, unless you want to be blocked)`)
		, target, executor, caseData,
	);
}
