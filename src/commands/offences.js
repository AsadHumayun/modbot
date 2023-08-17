import { OffencesSlashCommandData as slashCommandData } from '../SlashCommandData/offences.js';
import { getUserData } from '../functions/userData/getUserData.js';
import { EmbedBuilder } from 'discord.js';

/**
 * @type {import('../../types/Command').Command}
 */
export default {
	slashCommandData,
	name: 'offences',
	moderator: true,
	async execute(client, interaction) {
		const target = interaction.options.getUser('target') || interaction.user;
		const userData = await getUserData(target.id);
		let ofncs = userData.get('ofncs') ? userData.get('ofncs').split(';').map(Number) : new Array(Object.keys(client.config.ofncs).length).fill(0);

		if (target.bot) ofncs = ofncs.map(() => -1);
		if (interaction.options.getBoolean('raw')) return await interaction.followUp('```\n[' + ofncs.join(', ') + ']\n```');

		await interaction.followUp({
			embeds: [
				new EmbedBuilder()
					.setColor('Blue')
					.setTitle(`${target.tag}'s Offences [${ofncs.reduce((a, b) => a + b, 0)}]`)
					.setDescription(
						`
\`/punish <user> <offence>\` to punish a user for an offence;
\`/unpunish <user> <offence>\` to unpunish a user for an offence.

${Object.entries(client.config.ofncs).map((ofnc, index) => `[${ofnc[0]}]: ${ofnc[1][0]} - ${ofncs[index] || 0}`).join('\n')}
						`,
					),
			],
		});
	},
};
