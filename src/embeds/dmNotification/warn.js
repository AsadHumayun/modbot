import { MessageEmbed } from 'discord.js';
import { client } from '../../functions/client/initClient.js';
import { applyGlobals } from './.global.js';

/**
 * Constructs the embed for the warn DM notification
 * @param {import("discord.js").User} target Target user
 * @param {import("discord.js").User} executor User who executed the command
 * @param {import("discord.js").Guild} guild The guild in which the action was executed
 * @param {import("discord.js").User} display User whose tag is to be displayed on the error message
 * @param {import("../../../types/Case").Case} caseData data for the case
 * @returns {MessageEmbed}
 */
export function warn(target, executor, guild, display, caseData) {
	return applyGlobals(
		new MessageEmbed()
			.setColor(client.config.colors.orange)
			.setDescription(`You have received a warning from ${guild.name}. If you believe that this was a mistake, please contact ${display.tag} (don't spam though, unless you want to be blocked)`)
		, target, executor, caseData,
	);
}
