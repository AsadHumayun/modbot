// eslint-disable-next-line spaced-comment
//@ts-nocheck
import { LockSlashCommandData as slashCommandData } from '../SlashCommandData/lock.js';
import { ChannelType, OverwriteType } from 'discord.js';
import { getNewCaseId } from '../functions/case/getNewCaseId.js';
import { constructEmbed } from '../functions/case/constructEmbed.js';
import { createCase } from '../functions/case/createCase.js';
import { logCase } from '../functions/case/logCase.js';
import { modActionSuccessEmbed } from '../functions/message/modActionSuccessEmbed.js';


export default {
	slashCommandData,
	name: 'lock',
	async execute(client, interaction) {
		const target = interaction.options.getChannel('target', true);
		const reason = interaction.options.getString('reason') || client.config.case.defaultReason;
		const refs = interaction.options.getString('reference')?.split(',').join(';');

		if (target.type !== ChannelType.GuildText) {
			return await interaction.reply({
				content: `Invalid channel "${target.name}"; a valid channel must be of type GuildText. Received ${Object.entries(ChannelType).find((enumMember) => target.type === enumMember[1])[0]}`,
				ephemeral: true,
			});
		}

		const caseId = await getNewCaseId();
		/**
		 * @type {import("../../types/Case").Case}
		 */
		const case_ = {
			id: caseId,
			target: '1',
			executor: interaction.user.id,
			guildId: interaction.guildId,
			reason,
			refersCases: refs,
			opcode: 15,
			channelId: target.id,
		};

		await target.permissionOverwrites.create(interaction.guildId, {
			SendMessages: false,
		}, {
			reason: `Channel lock by ${interaction.user.tag} (${interaction.user.id}) | Case #${case_.id}`,
			type: OverwriteType.Role,
		});

		const embed = await constructEmbed(case_);
		case_.caseLogURL = await logCase(case_, [embed]);
		await createCase(case_);
		const embeds = [await modActionSuccessEmbed(case_)];
		await interaction.reply({ embeds });
	},
};