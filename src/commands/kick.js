import { logCase } from '../functions/case/logCase.js';
import { kick } from '../embeds/dmNotification/kick.js';
import { createCase } from '../functions/case/createCase.js';
import { getNewCaseId } from '../functions/case/getNewCaseId.js';
import { constructEmbed } from '../functions/case/constructEmbed.js';
import { modActionSuccessEmbed } from '../functions/message/modActionSuccessEmbed.js';
import { KickSlashCommandData as slashCommandData } from '../SlashCommandData/kick.js';

/**
 * @type {import('../../types/Command').Command}
 */
export default {
	slashCommandData,
	name: 'kick',
	moderator: true,
	async execute(client, interaction) {
		const target = interaction.options.getMember('target', true);
		const reason = interaction.options.getString('reason') || client.config.case.defaultReason;
		const refs = interaction.options.getString('reference')?.split(',').join(';');

		if (!target.manageable) {
			return await interaction.followUp({
				content: `Unable to kick ${target.user.tag}, lacking perissions`,
				ephemeral: true,
			});
		}

		const caseId = await getNewCaseId();
		/**
		 * @type {import("../../types/Case").Case}
		 */
		const case_ = {
			id: caseId,
			target: target.id,
			executor: interaction.user.id,
			guildId: interaction.guildId,
			reason,
			refersCases: refs,
			opcode: 8,
		};
		const embed = await constructEmbed(case_);
		case_.caseLogURL = await logCase(case_, [embed]);
		await createCase(case_);
		await target.send({ embeds: [kick(target.user, interaction.user, interaction.guild, client.users.cache.get(client.config.display), case_)] });
		await target.kick(reason);
		const embeds = [await modActionSuccessEmbed(case_)];
		await interaction.followUp({ embeds });
	},
};
