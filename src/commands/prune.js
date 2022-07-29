import { PruneSlashCommandData as slashCommandData } from '../SlashCommandData/prune.js';
import { ActionRowBuilder, ButtonBuilder, ButtonStyle, ComponentType, EmbedBuilder } from 'discord.js';
import { getNewCaseId } from '../functions/case/getNewCaseId.js';
import { logCase } from '../functions/case/logCase.js';
import { createCase } from '../functions/case/createCase.js';
import { prune } from '../embeds/logger/prune.js';

export default {
	slashCommandData,
	name: 'prune',
	moderator: true,
	async execute(client, interaction) {
		const days = interaction.options.getInteger('days', true) || 0;
		console.log(days, typeof days);
		const reason = interaction.options.getString('reason') || client.config.case.defaultReason;
		const roles = [
			interaction.options.getRole('role0'),
			interaction.options.getRole('role1'),
			interaction.options.getRole('role2'),
			interaction.options.getRole('role3'),
			interaction.options.getRole('role4'),
		]
			.filter((f) => f)
			?.map(({ id }) => id);

		const count = await interaction.guild.members.prune({
			dry: true,
			days,
			roles: roles || null,
		});
		const msg = await interaction.reply({
			embeds: [
				new EmbedBuilder()
					.setColor(client.config.colors.red)
					.setDescription(`Pruning will kick \`${count}\` members. Would you like to continue?`),
			],
			components: [
				new ActionRowBuilder()
					.addComponents([
						new ButtonBuilder()
							.setCustomId('1')
							.setLabel(`Kick ${count} members`)
							.setStyle(ButtonStyle.Danger),
						new ButtonBuilder()
							.setCustomId('0')
							.setLabel('Cancel')
							.setStyle(ButtonStyle.Success),
					]),
			],
		});
		const filter = i => {
			return i.user.id === interaction.user.id;
		};

		msg.awaitMessageComponent({ filter, componentType: ComponentType.Button, time: 60_000, errors: ['time'] })
			.then(async (i) => {
				if (i.customId === '1') {
					const caseId = await getNewCaseId();
					// ok to prune
					const kicked = await interaction.guild.members.prune({
						dry: false,
						days,
						reason: `Prune by ${interaction.user.tag} (${interaction.user.id}) | Case #${caseId}`,
					}).catch(console.error);
					/**
						* @type {import("../../types/Case").Case}
					*/
					const case_ = {
						id: caseId,
						target: '1',
						executor: interaction.user.id,
						guildId: interaction.guildId,
						reason,
						pruneDays: days,
						pruneIncludedRoles: roles.length >= 1 ? roles.join(';') : null,
						pruneMembersKicked: kicked,
						opcode: 10,
					};
					const embed = prune(interaction.user, client.users.cache.get(client.config.display), case_);
					console.log('3');
					case_.caseLogURL = await logCase(case_, [embed]);
					await createCase(case_);
					await i.update({
						embeds: [
							new EmbedBuilder()
								.setColor(client.config.colors.green)
								.setDescription(`\`${kicked}\` members have been kicked from the current guild`),
						],
						components: [],
					});
				}
				else {
					await i.update({
						embeds: [
							new EmbedBuilder()
								.setColor(client.config.colors.green)
								.setDescription('Pruning cancelled. No members were kicked.'),
						],
						components: [],
					});
				}
			})
			.catch((e) => {
				console.error(e);
				interaction.editReply({
					embeds: [
						new EmbedBuilder()
							.setColor(client.config.colors.invis)
							.setDescription('Pruning cancelled due to no response. No members were kicked.'),
					],
					components: [],
				});
			});

	},
};
