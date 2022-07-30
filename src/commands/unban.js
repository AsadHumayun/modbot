import { logCase } from '../functions/case/logCase.js';
import { unban } from '../embeds/dmNotification/unban.js';
import { createCase } from '../functions/case/createCase.js';
import { getNewCaseId } from '../functions/case/getNewCaseId.js';
import { constructEmbed } from '../functions/case/constructEmbed.js';
import { modActionSuccessEmbed } from '../functions/message/modActionSuccessEmbed.js';
import { UnbanSlashCommandData as slashCommandData } from '../SlashCommandData/unban.js';
import { getUser } from '../functions/message/getUser.js';

export default {
	slashCommandData,
	name: 'unban',
	moderator: true,
	async execute(client, interaction) {
		const targetId = interaction.options.getString('target', true);
		const reason = interaction.options.getString('reason') || client.config.case.defaultReason;
		const refs = interaction.options.getString('reference')?.split(',').join(';');

		const target = await getUser(targetId);
		if (!target) {
			return await interaction.reply({
				content: 'Unable to find a Discord user by that ID',
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
			opcode: 14,
		};
		const embed = await constructEmbed(case_);
		case_.caseLogURL = await logCase(case_, [embed]);
		await createCase(case_);
		/**
		 * Not likely to be able to DM target, however an attempt should still be made as
		 * per request of the client.
		 */
		await target.send({ embeds: [unban(target.user, interaction.user, interaction.guild, client.users.cache.get(client.config.display), case_)] })
			.catch(() => {return;});
		await client.guilds.cache.get(client.config.guildId).members.unban(target.id, `Unbanned by ${interaction.user.tag} (${interaction.user.id}) | Case #${case_.id}`);
		const embeds = [await modActionSuccessEmbed(case_)];
		await interaction.reply({ embeds });
	},
};
