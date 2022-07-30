/**
 * @note
 * The unpunish command will NOT provide functionality to automatically unban uusers
 * as this can lead to potential abuse, as requested by the client.
 */


import { UnpunishSlashCommandData as slashCommandData } from '../SlashCommandData/unpunish.js';
import { getUserData } from '../functions/userData/getUserData.js';
import { removeZeros } from '../utils/array/removeZeros.js';
import { timeoutRemove } from '../embeds/dmNotification/timeoutRemove.js';
import { EmbedBuilder } from '@discordjs/builders';
import { getNewCaseId } from '../functions/case/getNewCaseId.js';
import { createCase } from '../functions/case/createCase.js';
import { logCase } from '../functions/case/logCase.js';
import { constructEmbed } from '../functions/case/constructEmbed.js';

export default {
	slashCommandData,
	name: 'unpunish',
	moderator: true,
	async execute(client, interaction) {
		const target = interaction.options.getUser('target', true);
		const index = interaction.options.getInteger('ofnc', true);
		const reason = interaction.options.getString('reason') || 'User unpunished';
		const refs = interaction.options.getString('reference')?.split(',').join(';');

		const data = await getUserData(target.id);
		const ofncs = data.get('ofncs') ? data.get('ofncs').split(';').map(Number) : [];

		if (!Object.values(client.config.ofncs)[index - 1]) {
			return await interaction.reply(`Index ${index} out of bounds for length ${Object.keys(client.config.ofncs).length}`);
		}

		if (!ofncs[index - 1]) ofncs[index - 1] = 0;
		ofncs[index - 1] -= 1;

		await client.data.Users.update({
			ofncs: removeZeros(ofncs).join(';'),
		}, {
			where: {
				id: target.id,
			},
		});

		await interaction.reply(`Successfully updated ofncs ${index} ${target.id} from ${ofncs[index - 1] + 1} to ${ofncs[index - 1] || 0} R: ${reason}`);

		const caseId = await getNewCaseId();

		/**
		 * @type {import("../../types/Case").Case}
		 */
		const case_ = {
			id: caseId,
			target: target.id,
			executor: interaction.user.id,
			reason,
			refersCases: refs,
			guildId: interaction.guildId,
			opcode: 13,
		};

		const level = Object.values(client.config.ofncs)[index - 1][1];
		const mem = await client.guilds.cache.get(client.config.guildId).members.fetch(target.id);
		if (!mem) return;

		async function unmute() {
			if (!mem.isCommunicationDisabled()) return;

			case_.opcode = 4;
			await interaction.followUp({
				embeds: [
					new EmbedBuilder()
						.setColor(client.config.colors.invis)
						.setDescription(`${target.tag}'s mute has been removed because of "${reason}"; they were sent the following message:`),
				],
			});

			const embed = timeoutRemove(target, interaction.user, interaction.guild, client.users.cache.get(client.config.display), case_);
			await interaction.followUp({ embeds: [ embed ] });
			await target.send({ embeds: [ embed ] }).catch(() => {return;});
		}

		if (level == 1 && (ofncs[index - 1] < 2)) {
			await unmute();
		}
		else if (level == 2) {
			await unmute();
		}
		else if (level == 3) {
			await unmute();
		}
		else if (level == 4) {
			await unmute();
		}

		const embed = await constructEmbed(case_);
		case_.caseLogURL = await logCase(case_, [embed]);

		await createCase(case_);
	},
};
