// eslint-disable-next-line spaced-comment
//@ts-nocheck
import { UnlockSlashCommandData as slashCommandData } from '../SlashCommandData/unlock.js';
import { ChannelType, OverwriteType } from 'discord.js';
import { getNewCaseId } from '../functions/case/getNewCaseId.js';
import { constructEmbed } from '../functions/case/constructEmbed.js';
import { createCase } from '../functions/case/createCase.js';
import { logCase } from '../functions/case/logCase.js';
import { modActionSuccessEmbed } from '../functions/message/modActionSuccessEmbed.js';
import { autoReference } from '../functions/case/autoReference.js';
import { insertReference } from '../functions/case/insertRefs.js';

/**
 * @type {import('../../types/Command').Command}
 */
export default {
	slashCommandData,
	name: 'unlock',
	async execute(client, interaction) {
		const target = interaction.options.getChannel('target', true);
		const reason = interaction.options.getString('reason') || client.config.case.defaultReason;
		const refs = interaction.options.getString('reference')?.split(',').join(';');

		if (target.type !== ChannelType.GuildText) {
			return await interaction.followUp({
				content: `Invalid channel "${target.name}"; a valid channel must be of type GuildText. Received ${Object.entries(ChannelType).find((enumMember) => target.type === enumMember[1])[0]}`,
				ephemeral: true,
			});
		}

		const caseId = await getNewCaseId();
		/**
		 * @type {import("../../types/Case").Case}
		 */
		let case_ = {
			id: caseId,
			target: '1',
			executor: interaction.user.id,
			guildId: interaction.guildId,
			reason,
			refersCases: refs,
			opcode: 16,
			channelId: target.id,
		};

		await target.permissionOverwrites.edit(interaction.guildId, {
			SendMessages: null,
		}, {
			reason: `Channel unlock by ${interaction.user.tag} (${interaction.user.id}) | Case #${case_.id}`,
			type: OverwriteType.Role,
		});

		await (async () => {
			const autoRef = await autoReference(interaction, case_);
			if (!case_.refersCases?.split(';').includes(autoRef.toString())) {
				case_ = insertReference(case_, autoRef);
			}
		})();

		const embed = await constructEmbed(case_);
		case_.caseLogURL = await logCase(case_, [embed]);
		await createCase(case_);
		const embeds = [await modActionSuccessEmbed(case_)];
		await interaction.followUp({ embeds });
	},
};
