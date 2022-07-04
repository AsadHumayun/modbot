import { createCase } from '../functions/case/createCase.js';
import { constructEmbed } from '../functions/case/constructEmbed.js';
import { getNewCaseId } from '../functions/case/getNewCaseId.js';
import { modActionSuccessEmbed } from '../functions/message/modActionSuccessEmbed.js';
import { WarnSlashCommandData as slashCommandData } from '../SlashCommandData/warn.js';

export default {
	slashCommandData,
	name: 'warn',
	usage: '<member> [reason]',
	async execute(client, interaction) {
		const member = interaction.options.getMember('target');
		const caseId = await getNewCaseId();
		const reason = interaction.options.getString('reason') ?? client.config.case.defaultReason;
		const refersCases = interaction.options.getString('reference')?.split(',')?.join(';') || null;
		const caseData = {
			id: caseId,
			target: member.id,
			executor: interaction.user.id,
			reason,
			refersCases,
			guildId: interaction.guildId,
			opcode: '0',
		};
		const embed = await constructEmbed(caseData);
		const logMessage = await client.channels.cache.get(client.config.modlog).send({ embeds: [embed] });
		caseData.caseLogURL = logMessage.url;
		await createCase(caseData);

		const embeds = [await modActionSuccessEmbed(caseData)];
		await interaction.reply({
			embeds,
		});
	},
};
