import { MessageEmbed } from 'discord.js';
import { client } from '../../functions/client/initClient.js';
import { applyGlobals } from './.global.js';

/**
 * Constructs the embed for the anti-raid mute DM notification
 * @param {import("discord.js").User} target Target user
 * @param {import("discord.js").User} executor User who executed the command
 * @param {import("discord.js").Guild} guild The guild in which the action was executed
 * @param {import("discord.js").User} display User whose tag is to be displayed on the error message
 * @param {import("../../../types/Case").Case} caseData data for the case
 * @returns {MessageEmbed}
 */
export function antiRaidMuteSet(target, executor, guild, display, caseData) {
	return applyGlobals(
		new MessageEmbed()
			.setColor('#da0000')
			.setDescription(`You have received a 100000000 minute mute from ${guild.name} because of "[automatic-mute]: Anti-raid"`)
			.addField('Moderator', client.user.tag)
			.addField('Reason', `Your account was flagged as a potential threat to our server. If you believe that you were muted erroneously, please contact \`${display.tag}\`.`),
		target, executor, caseData,
	);
}
