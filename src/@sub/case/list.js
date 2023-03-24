import { EmbedBuilder } from 'discord.js';
import { getUser } from '../../functions/message/getUser.js';

/**
 * List subcommand for parent command "case"; refer to .../SlashCommandData/case.js for further information.
 * @param {import("discord.js").CommandInteraction} interaction The interaction that instantiated the request
 */
export async function execute(interaction) {
	const target = interaction.options.getUser('target');
	const cases = await interaction.client.data.Cases.findAll({
		where: {
			target: target.id,
		},
	});

	if (!cases.length) {
		return await interaction.followUp({
			content: `No cases found for ${target.tag}`,
			ephemeral: true,
		});
	}
	let limit = interaction.options.getInteger('limit');
	if (limit <= 0) limit = 25;

	const history = new EmbedBuilder()
		.setColor('BLUE')
		.setTitle(`${target.tag}'s History [${cases.length} cases]`)
		.setDescription('To view information on a certain case, use `/case view case_id:caseId`');

	const data = await Promise.all(
		cases.map(async ({ dataValues }) => {
			const executor = await getUser(dataValues.executor);
			return {
				name: `Case #${dataValues.id} | ${executor.tag}`,
				value: `${dataValues.reason ?? interaction.client.config.case.defaultReason}`,
				inline: true,
			};
		}),
	);
	const results = data.reverse().slice(0, limit);
	history
		.addFields(results);

	await interaction.followUp({ embeds: [history] });
}
