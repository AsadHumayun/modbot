import { MessageEmbed } from 'discord.js';
import { getCase } from '../functions/case/getCase.js';
import { getUser } from '../functions/message/getUser.js';

export default {
	name: 'case',
	usage: '<id>',
	async execute(client, message, args) {
		if (!args.length) return message.reply('You must specify a case ID in order for this command to work!');
		const id = args[0];
		const caseData = await getCase(id);
		if (!caseData) return message.reply('A case by that ID does not exist');
		const executor = await getUser(caseData.executor);
		const target = await getUser(caseData.target);
		const caseRefs = caseData.refers_cases;
		const refs = [];
		if (caseRefs) {
			for (const ref of caseRefs) {
				const _case = await client.data.Cases.findByPk(ref);
				if (_case) {
					refs.push([
						ref,
						_case.dataValues.case_log_url,
					]);
				}
			}
		}

		message.reply({
			embeds: [
				/**
				 * @see {@link https://gist.github.com/LeviSnoot/d9147767abeef2f770e9ddcd91eb85aa}
				 */
				new MessageEmbed()
					.setColor('BLUE')
					.setTitle(`Case Details - Case #${id}`)
					.setDescription(`
**Moderator**: ${executor.tag} (${executor.id})
**Target**: ${target.tag} (${target.id})
**Action**: ${client.config.opcodes[Number(caseData.opcode)].name.replace(/_+/g, '.').toLowerCase()}
**Reason**: ${caseData.reason ?? client.config.case.defaultReason}
${refs ? `**References**: ${refs.map((ref) => `[#${ref[0]}](${ref[1]}, "Details for referenced case: #${ref[0]}")`).join(', ')}` : 'NONEOENOENOE'}

<t:${Math.trunc(caseData.createdAt.getTime() / 1000)}>
					`),
			],
		});
	},
};