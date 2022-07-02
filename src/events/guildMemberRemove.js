import { MessageEmbed } from 'discord.js';

/**
 * @type {import("../../types/Event").Event}
 */
export default {
	name: 'guildMemberRemove',
	once: false,
	async execute(client, member) {
		if (member.guild.id != client.config.guildId) return;
		client.channels.cache.get(client.config.channels.memberlog).send({ embeds: [
			new MessageEmbed()
				.setColor(client.config.colors.invis)
				.setAuthor({ name: member.user.tag, iconURL: member.user.displayAvatarURL({ dynamic: true }) })
				.setDescription(`Created <t:${Math.trunc(member.user.createdAt.getTime() / 1000)}:R>`)
				.setFooter({ text: `Member Left • ID: ${member.user.id}` })
				.setTimestamp(),
		] });
	},
};
