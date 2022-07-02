import { MessageEmbed } from 'discord.js';

/**
 * @type {import('../../types/Event').Event}
 */
export default {
	name: 'messageUpdate',
	once: false,
	async execute(client, oldMessage, newMessage) {
		if (newMessage.partial) newMessage = await newMessage.fetch();
		if (oldMessage.channel.type == 'DM') return;
		if ((oldMessage.guild.id != client.config.guildId || (oldMessage.author?.bot) || (oldMessage.content === newMessage.content))) return;
		client.channels.cache.get(client.const.channels.msgLogs).send({
			embeds: [
				new MessageEmbed()
					.setAuthor({ name: `${newMessage.author.tag} (${newMessage.author.id})`, iconURL: newMessage.author.displayAvatarURL({ dynamic: true }) })
					.setTitle(`Message Edited in #${oldMessage.channel.name}`)
					.setThumbnail(oldMessage.author.displayAvatarURL())
					.setColor('RANDOM')
					.addField('Old Message', client.utils.trim(oldMessage.content, 1024), true)
					.addField('New Message', client.utils.trim(newMessage.content, 1024), true)
					.setFooter({ text: `Message ID: ${newMessage.id}`, iconURL: newMessage.guild.iconURL({ dynamic: true }) })
					.setTimestamp(),
			],
		});
	},
};
