import { EmbedBuilder } from 'discord.js';
import { client } from '../../functions/client/initClient.js';

/**
 * Constructs the embed for the prune log embed
 * @param {import("discord.js").User} executor User who executed the command
 * @param {import("discord.js").User} display User whose tag is to be displayed on the error message
 * @param {import("../../../types/Case").Case} caseData data for the case
 * @returns {EmbedBuilder}
 */
export function prune(executor, display, caseData) {
	return new EmbedBuilder()
		.setColor(client.config.colors.orange)
		.setAuthor({
			name: `${executor.tag} (${executor.id})`,
			iconURL: executor.displayAvatarURL({ dynamic: true }),
		})
		.setDescription(`
**Action**: Members_Prune
**Reason**: ${caseData.reason}
**Members Affected**: ${caseData.pruneMembersKicked}
**Prune Days**: ${caseData.pruneDays}
**Included Roles**: @everyone ${caseData.pruneIncludedRoles?.split(';').map((id) => `<@&${id}>`).join(' ') || ''}
		`)
		.setFooter({
			text: `Case #${caseData.id}`,
		})
		.setTimestamp();
}
