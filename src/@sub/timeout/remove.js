import { client } from '../../functions/client/initClient.js';
import { createCase } from '../../functions/case/createCase.js';
import { getNewCaseId } from '../../functions/case/getNewCaseId.js';
import { insertReference } from '../../functions/case/insertRefs.js';
import { autoReference } from '../../functions/case/autoReference.js';
import { constructEmbed } from '../../functions/case/constructEmbed.js';
import { modActionSuccessEmbed } from '../../functions/message/modActionSuccessEmbed.js';
import { timeoutRemove } from '../../embeds/dmNotification/timeoutRemove.js';

/**
 * Remove subcommand for parent command "timeout"; refer to .../SlashCommandData/timeout.js for further information.
 * @param {import("discord.js").CommandInteraction} interaction The interaction that instantiated the request
 */
export async function execute(interaction) {
	const caseId = await getNewCaseId();
	const target = interaction.options.getMember('target', true);

	if (!target.isCommunicationDisabled()) {
		return await interaction.reply({
			content: 'That user is not timed out',
			ephemeral: true,
		});
	}

	const reason = interaction.options.getString('reason', false) || client.config.case.defaultReason;
	const refersCases = interaction.options.getString('reference')?.split(',')?.join(';') || null;
	/**
	 * @type {import("../../../types/Case").Case}
	 */
	let case_ = {
		id: caseId,
		target: target.id,
		executor: interaction.user.id,
		reason,
		refersCases,
		guildId: interaction.guildId,
		opcode: '4',
	};
	await (async () => {
		const autoRef = await autoReference(interaction, case_);
		if (!case_.refersCases?.split(';').includes(autoRef.toString())) {
			case_ = insertReference(case_, autoRef);
		}
	})();

	try {
		await target.timeout(null, `Moderator: ${interaction.user.tag} (${interaction.user.id})\nReason: ${reason}`);
		await target.send({
			embeds: [
				timeoutRemove(target, interaction.user, interaction.guild, client.users.cache.get(client.config.display), case_),
			],
		});
	}
	catch (e) {
		console.error(e);
		await interaction.reply({
			content: `Unable to remove timeout for user ${target.user.tag} (${target.id}) due to a lack of sufficient permissions`,
			ephemeral: true,
		});

		return;
	}
	const embed = await constructEmbed(case_);
	const msg = await client.channels.cache.get(client.config.channels.modlog).send({
		embeds: [
			embed,
		],
	});
	case_.caseLogURL = msg.url;
	await createCase(case_);
	const embeds = [await modActionSuccessEmbed(case_)];
	await interaction.reply({ embeds });
}
