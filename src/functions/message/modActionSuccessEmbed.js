import { EmbedBuilder } from 'discord.js';
import { client } from '../client/initClient.js';
import { getUser } from './getUser.js';

/**
 * Generates a success embed for moderation actions.
 * @param {import("../../../types/Case").Case} caseData Data for the case
 */
export async function modActionSuccessEmbed(caseData) {
	if (!caseData) Promise.reject(new ReferenceError('[Functions:message:modActionSuccessEmbed] parameter \'caseData\' not present'));

	let target = await getUser(caseData.target);
	const executor = await getUser(caseData.executor);
	if (caseData.channelId) target = { tag: `<#${caseData.channelId}>`, id: caseData.channelId };

	return new EmbedBuilder()
		.setColor(client.config.colors.green)
		.setAuthor({
			name: `Success | ${executor.tag}`,
			iconURL: executor.displayAvatarURL(),
		})
		.setDescription(
			`
**Target**: ${target.tag} (${target.id})
**Action**: ${client.config.opcodes[Number(caseData.opcode)].name.toLowerCase().replace(/_/g, '.')}
**Reason**: ${caseData.reason ?? client.config.case.defaultReason}
`,
		)
		.setFooter({
			text: `Case #${caseData.id}`,
		})
		.setTimestamp();
}
