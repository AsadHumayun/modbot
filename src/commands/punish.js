import { EmbedBuilder } from 'discord.js';
import { getNewCaseId } from '../functions/case/getNewCaseId.js';
import { getUserData } from '../functions/userData/getUserData.js';
import { PunishSlashCommandData as slashCommandData } from '../SlashCommandData/punish.js';
import { constructEmbed } from '../functions/case/constructEmbed.js';
import { logCase } from '../functions/case/logCase.js';
import { createCase } from '../functions/case/createCase.js';
import { ban as generateBanEmbed } from '../embeds/dmNotification/ban.js';
import { timeout as generateTimeoutEmbed } from '../embeds/dmNotification/timeout.js';
import { warn as generateWarnEmbed } from '../embeds/dmNotification/warn.js';
import { removeZeros } from '../utils/array/removeZeros.js';
import { autoReference } from '../functions/case/autoReference.js';
import { insertReference } from '../functions/case/insertRefs.js';

/**
 * @type {import('../../types/command').Command}
 */
export default {
	slashCommandData,
	name: 'punish',
	moderator: true,
	async execute(client, interaction) {
		const target = interaction.options.getUser('target', true);
		const data = await getUserData(target.id);
		const index = Number(interaction.options.getInteger('ofnc', true));
		const ofncs = data.get('ofncs') ? data.get('ofncs').split(';').map(Number) : [];

		if (!Object.values(client.config.ofncs)[index - 1]) {
			return await interaction.followUp(`Index ${index} out of bounds for length ${Object.keys(client.config.ofncs).length}`);
		}
		if (!ofncs[index - 1]) ofncs[index - 1] = 0;

		await interaction.followUp({
			embeds: [
				new EmbedBuilder()
					.setColor(client.config.colors.invis)
					.setDescription(`${target.tag} has been punished for "${Object.values(client.config.ofncs)[index - 1][0]}"; they were sent the following message:`),
			],
		});

		const mem = await client.guilds.cache.get(client.config.guildId).members.fetch(target.id);
		const level = Object.values(client.config.ofncs)[index - 1][1];

		const caseId = await getNewCaseId();
		/**
		 * @type {import("../../types/Case").Case}
		 */
		let case_ = {
			id: caseId,
			target: target.id,
			executor: interaction.user.id,
			reason: Object.values(client.config.ofncs)[index - 1][0],
			guildId: interaction.guildId,
			opcode: 11,
		};

		async function ban() {
			try {
				case_.opcode = 12;
				const banEmbed = generateBanEmbed(target, interaction.user, interaction.guild, client.users.cache.get(client.config.display), case_);

				await interaction.followUp({ embeds: [ banEmbed ] });
				await mem.send({ embeds: [ banEmbed ] }).catch(() => interaction.followUp({ content: `Unable to send messages to this user: ${target.tag} (${target.id})` }));
				await mem.ban({
					reason: `User punished by ${interaction.user.tag} (${interaction.user.id}) | Case #${case_.id}`,
					days: 0,
				});
			}
			catch (e) {
				interaction.followUp(`Failed to ban U: <${mem.user.tag} (${mem.id})>: \`${e}\``);
			}

			return void 0;
		}

		/**
		 *
		 * @param {number} hrs
		 * @returns {Promise<void>}
		 */
		async function timeout(hrs) {
			case_.opcode = 3;
			const timeoutEmbed = generateTimeoutEmbed(target, interaction.user, interaction.guild, client.users.cache.get(client.config.display), case_);

			try {
				await mem.timeout(hrs * 60 * 60_000, `Punished by ${interaction.user.tag} (${interaction.user.id}) | Case #${caseId}`);

				client.users.cache.get(target.id).send({ embeds: [ timeoutEmbed ] });
				await interaction.followUp({ embeds: [ timeoutEmbed ] });
			}
			catch (e) {
				await interaction.followUp(`Unable to PM ${target.tag} (${target.id})`);
			}

			return void 0;
		}

		async function warn() {
			case_.opcode = 0;
			const warnEmbed = generateWarnEmbed(target, interaction.user, interaction.guild, client.users.cache.get(client.config.display), case_);

			try {
				client.users.cache.get(target.id).send({ embeds: [ warnEmbed ] });
				await interaction.followUp({ embeds: [ warnEmbed ] });
			}
			catch (e) {
				await interaction.followUp(`Unable to send messages to this user: ${target.tag} (${target.id})`);
			}

			return void 0;
		}

		/**
		 * Maximum timeout duration.
		 * The Discord API facilitates a maximum timeout
		 * duration of up to 28 days, hence
		 * it was decided to use 27 days (672 hours) as a "permanent" timeout.
		 */
		const PERMANENT_TIMEOUT_DURATION = 672;

		if (level == 1) {
			/**
			 * Level 1 offences:
			 * 2 warnings then 1 hour timeouts
			 */
			if (ofncs[index - 1] > 2) {
				await timeout(1);
			}
			else {
				await warn();
			}
		}
		else if (level == 2) {
			/**
			 * Level 2 offences:
			 * first 2 offences - 1 hour timeouts
			 * then 3 hour timeouts
			 */
			if (ofncs[index - 1] >= 2) {
				await timeout(3);
			}
			else {
				await timeout(1);
			}
		}
		else if (level == 3) {
			/**
			 * Level 3 offences:
			 * 6h timeouts, then a "permanent" timeout
			 */
			if (ofncs[index - 1] <= 3) {
				await timeout(6);
			}
			else {
				await timeout(PERMANENT_TIMEOUT_DURATION);
			}
		}
		else if (level == 4) {
			/**
			 * level 4 offences:
			 * users are allowed to appeal for "permanent" timeouts. They have 3 perm timeouts,
			 * and then it's a permanent ban from the guild.
			 */
			if (ofncs[index - 1] >= 3) {
				await ban();
			}
			else {
				await timeout(PERMANENT_TIMEOUT_DURATION);
			}
		}

		await (async () => {
			const autoRef = await autoReference(interaction, case_);
			if (!case_.refersCases?.split(';').includes(autoRef.toString())) {
				case_ = insertReference(case_, autoRef);
			}
		})();

		const embed = await constructEmbed(case_);
		case_.caseLogURL = await logCase(case_, [embed]);

		await createCase(case_);
		ofncs[index - 1] = Number(ofncs[index - 1]) + 1;

		await client.data.Users.update({
			ofncs: removeZeros(ofncs).join(';'),
		}, {
			where: {
				id: target.id,
			},
		});
	},
};
