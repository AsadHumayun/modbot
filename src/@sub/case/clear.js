import { EmbedBuilder } from 'discord.js';
import { getCaseReferences } from '../../functions/case/getCaseReferences.js';

/**
 * List subcommand for parent command "case"; refer to .../SlashCommandData/case.js for further information.
 * @param {import("discord.js").CommandInteraction} interaction The interaction that instantiated the request
 */
export async function execute(interaction) {
	const target = interaction.options.getUser('target', true);
	const cases = await interaction.client.data.Cases.findAndCountAll({
		where: {
			target: target.id,
		},
	});
	const limit = interaction.options.getInteger('limit') || cases.count;
	if (limit < 0) {
		return await interaction.reply({
			content: '\'limit\' cannot be less than 0',
			ephemeral: true,
		});
	}

	const removeCases = cases.rows.map(({ dataValues }) => [dataValues.id, dataValues.case_log_url]).reverse();
	const embed = new EmbedBuilder()
		.setColor(interaction.client.config.colors.green)
		.setTitle(`Success | ${interaction.user.tag}`)
		.setDescription(
			`
			**Moderator**: ${interaction.user.tag} (${interaction.user.id})
			**Action**: ${interaction.client.config.opcodes[2].name.toLowerCase().replaceAll('_', '.')}
			**Reason**: ${interaction.options.getString('reason') ?? interaction.client.config.case.defaultReason}
			**Reference**: `,
		);

	if (interaction.options.getString('reference')) {
		const refs = await getCaseReferences(interaction.options.getString('reference').split(','), null, 6000 - embed.length - 4096);
		embed.setDescription(
			`${embed.description}${refs.join(', ')}`,
		);
	}
	embed.description += '\n**Affected Cases**: ';
	const affectedCases = await getCaseReferences(removeCases.map((x) => x[0]).slice(0, limit), null, 6000 - embed.length - 4096);
	embed.setDescription(
		`${embed.description}${affectedCases.join(', ')}`,
	);


	interaction.client.data.Cases.destroy({
		where: {
			id: removeCases.map(([ id ]) => id).slice(0, limit),
		},
	});

	await interaction.reply({
		embeds: [
			embed,
		],
	});
}
