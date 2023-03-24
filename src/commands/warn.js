import { createCase } from '../functions/case/createCase.js';
import { constructEmbed } from '../functions/case/constructEmbed.js';
import { getNewCaseId } from '../functions/case/getNewCaseId.js';
import { modActionSuccessEmbed } from '../functions/message/modActionSuccessEmbed.js';
import { WarnSlashCommandData as slashCommandData } from '../SlashCommandData/warn.js';
import { warn } from '../embeds/dmNotification/warn.js';
import { logCase } from '../functions/case/logCase.js';

/**
 * @type {import('../../types/command').Command}
 */
export default {
	slashCommandData,
	name: 'warn',
	moderator: true,
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
			opcode: 0,
		};
		const embed = await constructEmbed(caseData);
		caseData.caseLogURL = await logCase(caseData, [embed]);

		await createCase(caseData);

		const embeds = [await modActionSuccessEmbed(caseData)];
		await interaction.followUp({
			embeds,
		});
		await member.send({
			embeds: [
				warn(member.user, interaction.user, interaction.guild, client.users.cache.get(client.config.display), caseData),
			],
		});
	},
};
