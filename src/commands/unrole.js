import { logCase } from '../functions/case/logCase.js';
import { createCase } from '../functions/case/createCase.js';
import { getNewCaseId } from '../functions/case/getNewCaseId.js';
import { constructEmbed } from '../functions/case/constructEmbed.js';
import { modActionSuccessEmbed } from '../functions/message/modActionSuccessEmbed.js';
import { UnroleSlashCommandData as slashCommandData } from '../SlashCommandData/unrole.js';
import { EmbedBuilder } from 'discord.js';
import { autoReference } from '../functions/case/autoReference.js';
import { insertReference } from '../functions/case/insertRefs.js';

/**
 * @type {import('../../types/command').Command}
 */
export default {
	slashCommandData,
	name: 'unrole',
	moderator: true,
	async execute(client, interaction) {
		const target = interaction.options.getMember('target', true);
		const role = interaction.options.getRole('role', true);
		const reason = interaction.options.getString('reason') || client.config.case.defaultReason;
		const refs = interaction.options.getString('reference')?.split(',').join(';');

		await target.roles.remove(role.id)
			.catch((err) => {
				interaction.reply({
					embeds: [
						new EmbedBuilder()
							.setColor('Red')
							.setDescription(`
							There was an error whilst attempting to \`unrole\` M: ${target.user.tag}(${target.id}).
							It is likely to be a permission-related error; please ensure that I have the Manage Roles permission and that I am able to manage the role and the Member.
							Error:
							\`\`\`xl
								${err}
							\`\`\`
							`),
					],
				});
			});

		const caseId = await getNewCaseId();
		/**
		 * @type {import("../../types/Case").Case}
		 */
		let case_ = {
			id: caseId,
			target: target.id,
			executor: interaction.user.id,
			guildId: interaction.guildId,
			reason,
			refersCases: refs,
			roleId: role.id,
			opcode: 7,
		};
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
		await interaction.reply({ embeds });
	},
};
