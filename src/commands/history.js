import { MessageEmbed } from 'discord.js';
import { getUser } from '../functions/message/getUser.js';

export default {
	name: 'history',
	usage: '<user> [number of cases]',
	async execute(client, message, args) {
		if (!args.length) return message.reply(`You must use the command under the format of \`${this.name} ${this.usage}\``);
		const target = await getUser(args[0]);
		const cases = await client.data.Cases.findAll({
			where: {
				target: target.id,
			},
		});

		if (!cases.length) return message.reply(`No cases found for ${target.tag}`);
		if (!args[1] || args[1] <= 0) args[1] = 25;
		args[1] = Number(args[1]);

		const history = new MessageEmbed()
			.setColor('BLUE')
			.setTitle(`${target.tag}'s History [${cases.length} cases]`)
			.setDescription(`To view information on a certain case, use \`${client.config.prefix}case <id>\``);

		const data = await Promise.all(
			cases.map(async ({ dataValues }) => {
				const executor = await getUser(dataValues.executor);
				return {
					name: `Case #${dataValues.id} | ${executor.tag}`,
					value: `${dataValues.reason ?? client.config.case.defaultReason}`,
					inline: true,
				};
			}),
		);
		const results = data.reverse().slice(0, args[1]);
		history
			.addFields(results);

		message.reply({ embeds: [history] });
	},
};