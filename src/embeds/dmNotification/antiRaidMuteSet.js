import { EmbedBuilder } from 'discord.js';
import { applyGlobals } from './.global.js';

/**
 * Constructs the embed for the anti-raid mute DM notification
 * @param {import("discord.js").User} target Target user
 * @param {import("discord.js").User} executor User who executed the command
 * @param {import("discord.js").Guild} guild The guild in which the action was executed
 * @param {import("discord.js").User} display User whose tag is to be displayed on the error message
 * @param {import("../../../types/Case").Case} caseData data for the case
 * @returns {EmbedBuilder}
 */
export function antiRaidMuteSet(target, executor, guild, display, caseData) {
	return applyGlobals(
		new EmbedBuilder()
			.setColor('#da0000')
			.setDescription(`You have received a 100000000 minute mute from ${guild.name} because of "[automatic-mute]: Anti-raid"`),
		target, executor, caseData,
	);
}
