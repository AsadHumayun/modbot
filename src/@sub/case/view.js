import { EmbedBuilder } from 'discord.js';
import { getUser } from '../../functions/message/getUser.js';
import { getCase } from '../../functions/case/getCase.js';

/**
 * View subcommand for parent command "case"; refer to .../SlashCommandData/case.js for further information.
 * @param {import("discord.js").CommandInteraction} interaction The interaction that instantiated the request
 */
export async function execute(interaction) {
	const caseData = await getCase(interaction.options.getInteger('case_id'));
	if (!caseData) {
		return await interaction.reply({
			content: 'A case by that id does not exist',
			ephemeral: true,
		});
	}
	const executor = await getUser(caseData.executor);
	const target = await getUser(caseData.target) || { tag: 'UNKNOWN#0000', id: '0' };
	const caseRefs = caseData.refers_cases;
	const refs = [];
	if (caseRefs) {
		for (const ref of caseRefs) {
			const _case = await interaction.client.data.Cases.findByPk(ref);
			if (_case) {
				refs.push([
					ref,
					_case.dataValues.case_log_url,
				]);
			}
		}
	}

	await interaction.reply({
		embeds: [
			/**
			 * @see {@link https://gist.github.com/LeviSnoot/d9147767abeef2f770e9ddcd91eb85aa}
			 */
			new EmbedBuilder()
				.setColor('Blue')
				.setTitle(`Case Details - Case #${interaction.options.getInteger('case_id')}`)
				.setDescription(`
**Moderator**: ${executor.tag} (${executor.id})
**Target**: ${target.tag} (${target.id})
**Action**: ${interaction.client.config.opcodes[Number(caseData.opcode)].name.replace(/_+/g, '.').toLowerCase()}
**Reason**: ${caseData.reason ?? interaction.client.config.case.defaultReason}
${refs ? `**References**: ${refs.map((ref) => `[#${ref[0]}](${ref[1]}, "Details for referenced case: #${ref[0]}")`).join(', ')}` : 'Case data unavailable'}
**Executed**: <t:${Math.trunc(caseData.createdAt.getTime() / 1000)}>
**Prune Days**: ${caseData.prune_days ? `${caseData.prune_days}` : 'n/a'}
**Members Affected**: ${caseData.prune_members_kicked ? `${caseData.prune_members_kicked}` : 'n/a'}
**Prune Included Roles**: ${caseData.prune_included_roles ? `${caseData.prune_included_roles.split(';').map((id) => `<@&${id}>`)}` : 'n/a'}
**Channel**: ${caseData.channel_id ? `${caseData.channel_id} (<#${caseData.channel_id}>)` : 'n/a'}
				`),
		],
	});
}
