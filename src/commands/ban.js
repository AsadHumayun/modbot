import { logCase } from '../functions/case/logCase.js';
import { ban } from '../embeds/dmNotification/ban.js';
import { createCase } from '../functions/case/createCase.js';
import { getNewCaseId } from '../functions/case/getNewCaseId.js';
import { constructEmbed } from '../functions/case/constructEmbed.js';
import { modActionSuccessEmbed } from '../functions/message/modActionSuccessEmbed.js';
import { BanSlashCommandData as slashCommandData } from '../SlashCommandData/ban.js';

export default {
	slashCommandData,
	name: 'ban',
	moderator: true,
	async execute(client, interaction) {
		const target = interaction.options.getMember('target', true);
		const reason = interaction.options.getString('reason') || client.config.case.defaultReason;
		const refs = interaction.options.getString('reference')?.split(',').join(';');

		if (!target.manageable) {
			return await interaction.reply({
				content: `Unable to ban ${target.user.tag}, lacking perissions`,
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
			opcode: 12,
		};
		const embed = await constructEmbed(case_);
		case_.caseLogURL = await logCase(case_, [embed]);
		await createCase(case_);
		await target.send({ embeds: [ban(target.user, interaction.user, interaction.guild, client.users.cache.get(client.config.display), case_)] });
		await target.ban({
			reason: `Banned by ${interaction.user.tag} (${interaction.user.id}) | Case #${case_.id}`,
			days: 0,
		});
		const embeds = [await modActionSuccessEmbed(case_)];
		await interaction.reply({ embeds });
	},
};
