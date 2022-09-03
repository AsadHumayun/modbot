import { EmbedBuilder } from 'discord.js';
import { arrayToMatrix } from '../utils/array/arrayToMatrix.js';
import { ChannelType } from 'discord.js';

/**
 * @type {import("../../types/Event").Event}
 */
export default {
	name: 'messageDelete',
	once: false,
	async execute(client, message) {
		if (message.channel.type == ChannelType.DM || message.guild.id !== client.config.guildId) return;
		if (!message.content) return;
		/**
		 * Image detection section sourced from {@link https://github.com/AsadHumayun/Discord-Image-Logger/blob/master/src/index.js}
		 * Written by myself
		 */
		const images = [...message.attachments.values()]
			.filter((attachment) => attachment.contentType.startsWith('image'))
			.map((attachment, index) => {
				attachment.index = index;
				return attachment;
			});

		let embeds = [];
		for (const image of images) {
			embeds.push(
				new EmbedBuilder()
					.setColor('#da0000')
					.setAuthor({ name: `${message.author.tag} (${message.author.id})`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
					.setDescription(`Image ${image.index + 1} of ${images.length} sent in ${message.channel}.`)
					.setImage(image.url)
					.setFooter({ text: `Message ID: ${message.id}` })
					.setTimestamp(),
			);
		}

		embeds = arrayToMatrix(embeds, 10);
		const embed = new EmbedBuilder()
			.setColor(client.config.colors.red)
			.setTitle(`Message sent by ${message.author.tag} (${message.author.id}) deleted in #${message.channel.name}`)
			.setDescription(message.content)
			.setFooter({ text: `Messgae ID: ${message.id}` })
			.setTimestamp();
		client.channels.cache.get(client.config.channels.msglog).send({ embeds: [ embed ] }).catch(() => {return;});
		for (const everyTenEmbeds of embeds) {
			client.channels.cache.get(client.config.channels.msglog).send({ embeds: everyTenEmbeds }).catch(() => {return;});
		}
	},
};
