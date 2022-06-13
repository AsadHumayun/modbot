import { MessageEmbed } from 'discord.js';
import { client } from '../client/initClient.js';
import { getUser } from '../message/getUser.js';

/**
 * Generates a log embed regarding the case provided
 * @param {CaseData} caseData Data regarding the case that must be used to generate the embed
 * @returns {MessageEmbed}
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
	const target = await getUser(caseData.target);
	const refs = [];
	for (const ref of caseData.refersCases.split(';')) {
		const _case = await client.data.Cases.findByPk(ref);
		if (_case) {
			refs.push([
				ref,
				_case.dataValues.case_log_url,
			]);
		}
	}

	return new MessageEmbed()
		.setColor(clr)
		.setDescription(
			`
**Member**: ${target.tag} (${target.id})
**Action**: ${client.config.opcodes[Number(caseData.opcode)].name.toLowerCase().replace(/_/g, '.')}
**Reason**: ${caseData.reason ?? client.config.case.defaultReason}
${refs ? `**References**: ${refs.map((ref) => `[#${ref[0]}](${ref[1]}, "Details for referenced case: #${ref[0]}")`).join(', ')}` : 'NONEOENOENOE'}
`,
		)
		.setAuthor({
			name: `${executor.tag} (${executor.id})`,
			iconURL: executor.displayAvatarURL(),
		})
		.setFooter({
			text: `Case #${caseData.id}`,
		})
		.setTimestamp();
}