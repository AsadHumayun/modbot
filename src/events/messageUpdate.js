import { EmbedBuilder } from 'discord.js';
import { trimStr } from '../utils/string/trimStr.js';

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
		client.channels.cache.get(client.config.channels.msglog).send({
			embeds: [
				new EmbedBuilder()
					.setAuthor({ name: `${newMessage.author.tag} (${newMessage.author.id})`, iconURL: newMessage.author.displayAvatarURL({ dynamic: true }) })
					.setTitle(`Message Edited in #${oldMessage.channel.name}`)
					.setThumbnail(oldMessage.author.displayAvatarURL())
					.setColor('RANDOM')
					.addFields(
						{ name: 'Old Message', value: trimStr(oldMessage.content, 1024), inline: true },
						{ name: 'New Message', value: trimStr(newMessage.content, 1024), inline: true },
					)
					.setFooter({ text: `Message ID: ${newMessage.id}`, iconURL: newMessage.guild.iconURL({ dynamic: true }) })
					.setTimestamp(),
			],
		});
	},
};
