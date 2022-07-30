import { EmbedBuilder } from 'discord.js';
import { client } from '../client/initClient.js';
import { getUser } from '../message/getUser.js';
import { getCaseReferences } from './getCaseReferences.js';

/**
 * Generates a log embed regarding the case provided
 * @param {import("../../../types/Case").Case} caseData Data regarding the case that must be used to generate the embed
 * @returns {Promise<EmbedBuilder>}
 */
export async function constructEmbed(caseData) {
	const severity = client.config.opcodes[Number(caseData.opcode)].severity;
	let clr;

	if (severity == 'high') {
		clr = '#da0000';
	}
	else if (severity == 'mild') {
		clr = '#f59300';
	}
	else if (severity == 'none') {
		clr = '#36393e';
	}
	else {clr = '#00f514';}

	const executor = await getUser(caseData.executor);
	let target = await getUser(caseData.target) || { tag: 'UNKNOWN#0000', id: '0' };
	if (caseData.channelId) target = { tag: `<#${caseData.channelId}>`, id: caseData.channelId };

	const caseReferences = caseData.refersCases?.split(';');
	const baseEmbed = new EmbedBuilder()
		.setColor(clr)
		.setDescription(
			`
**Target**: ${target.tag} (${target.id})
**Action**: ${client.config.opcodes[Number(caseData.opcode)].name.toLowerCase().replace(/_/g, '.')}
**Reason**: ${caseData.reason ?? client.config.case.defaultReason}
${caseReferences?.length > 0 ? '**References**:' : ''}`,
		)
		.setAuthor({
			name: `${executor.tag} (${executor.id})`,
			iconURL: executor.displayAvatarURL(),
		})
		.setFooter({
			text: `Case #${caseData.id}`,
		})
		.setTimestamp();

	let refs;
	if (caseReferences) {
		refs = await getCaseReferences(caseReferences, null, 6000 - baseEmbed.length - 4096);
		baseEmbed.setDescription(
			`${baseEmbed.data.description}${refs.join(', ')}`,
		);
	}

	return baseEmbed;
}
