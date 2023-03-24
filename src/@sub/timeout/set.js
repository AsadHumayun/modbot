import { client } from '../../functions/client/initClient.js';
import { createCase } from '../../functions/case/createCase.js';
import { timeout } from '../../embeds/dmNotification/timeout.js';
import { getNewCaseId } from '../../functions/case/getNewCaseId.js';
import { constructEmbed } from '../../functions/case/constructEmbed.js';
import { modActionSuccessEmbed } from '../../functions/message/modActionSuccessEmbed.js';
import { autoReference } from '../../functions/case/autoReference.js';
import { insertReference } from '../../functions/case/insertRefs.js';

/**
 * Set subcommand for parent command "timeout"; refer to .../SlashCommandData/timeout.js for further information.
 * @param {import("discord.js").CommandInteraction} interaction The interaction that instantiated the request
 */
export async function execute(interaction) {
	const caseId = await getNewCaseId();
	const target = interaction.options.getMember('target', true);
	const minutes = interaction.options.getInteger('minutes', true);
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
		opcode: 3,
	};

	try {
		await target.timeout(minutes * 60000, `Moderator: ${interaction.user.tag} (${interaction.user.id})\nReason: ${reason}`);
	}
	catch (e) {
		await interaction.followUp({
			content: `Unable to timeout user ${target.user.tag} (${target.id}) due to a lack of sufficient permissions or invalid minutes specified`,
			ephemeral: true,
		});

		return;
	}
	const embed = await constructEmbed(case_);

	await (async () => {
		const autoRef = await autoReference(interaction, case_);
		if (!case_.refersCases?.split(';').includes(autoRef.toString())) {
			case_ = insertReference(case_, autoRef);
		}
	})();

	const msg = await client.channels.cache.get(client.config.channels.modlog).send({
		embeds: [
			embed,
		],
	});
	case_.caseLogURL = msg.url;
	await createCase(case_);
	const embeds = [await modActionSuccessEmbed(case_)];
	await interaction.followUp({ embeds });
	target.send({
		embeds: [timeout(target, interaction.user, interaction.guild, client.users.cache.get(client.config.display), case_)],
	});
}
