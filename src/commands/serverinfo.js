import { EmbedBuilder, ChannelType } from 'discord.js';
import { formatEnums } from '../utils/string/formatEnums.js';
import { ServerInfoSlashCommandData as slashCommandData } from '../SlashCommandData/serverinfo.js';

/**
 * Appropriate documentation references
 * Guid: {@link https://discord.js.org/#/docs/discord.js/main/class/Guild}
 * @type {import('../../types/Command').Command}
 */
export default {
	slashCommandData,
	name: 'serverinfo',
	async execute(client, interaction) {
		const fields = [];
		const members = await interaction.guild.members.fetch();
		const bots = members.filter(member => member.user.bot).size;
		const threads = await interaction.guild.channels.fetchActiveThreads(true);
		const bans = await interaction.guild.bans.fetch();
		const owner = await client.users.fetch(interaction.guild.ownerId);
		fields.push(...[
			{
				name: 'Owner',
				// Discord timestamps are UNIX timestamps, so divide by 1000
				value: `
${owner.tag}
Guild created
<t:${Math.trunc(interaction.guild.createdAt.getTime() / 1000)}:R>`,
			},
			{
				name: 'Channels',
				value: `
**${interaction.guild.channels.cache.filter(({ type }) => [ChannelType.GuildText, ChannelType.GuildNews, ChannelType.GuildNewsThread, ChannelType.GuildPrivateThread, ChannelType.GuildPublicThread].includes(type)).size}** Text,
**${interaction.guild.channels.cache.filter(({ type }) => [ChannelType.GuildVoice, ChannelType.GuildStageVoice].includes(type)).size}** Voice,
**${interaction.guild.channels.cache.size}** Total.
${threads?.size >= 1 ? `**${threads.size}** Active Threads.` : ''}
				`,
			},
			{
				name: 'Members',
				value: `
	**${bots}** Bots,
	**${interaction.guild.memberCount - bots}** Humans,
	**${interaction.guild.memberCount}** Total.

	${bans.size > 0 ? `**${bans.size}** Banned users.` : ''}
				`,
			},
			{
				name: 'Boosts',
				value:
`
**${interaction.guild.premiumSubscriptionCount}**,
Tier **${interaction.guild.premiumTier}**.`,
			},
			{
				name: 'Emojis',
				value: `**${interaction.guild.emojis.cache.size.toString()}**`,
			},
			{
				name: 'Stickers',
				value: `**${interaction.guild.stickers.cache.size.toString()}**`,
			},
		]);

		if (interaction.guild.features.length > 0) {
			fields.push({
				name: 'Features',
				value: formatEnums(interaction.guild.features).join(', '),
			});
		}

		fields.map(field => {
			field.inline = true;
			return field;
		});
		const embed = new EmbedBuilder()
			.setColor('Blue')
			.setAuthor({ name: interaction.guild.name })
			.setThumbnail(interaction.guild.iconURL({
				dynamic: true,
			}))
			.addFields(fields)
			.setTimestamp();

		if (interaction.guild.description) {
			embed.setDescription(interaction.guild.description);
		}

		if (interaction.guild.bannerURL()) embed.setImage(interaction.guild.bannerURL());

		if (interaction.guild.verified) embed.setAuthor({ name: interaction.guild.name, iconURL: client.config.emojis.verifiedCDN });

		await interaction.followUp({
			embeds: [
				embed,
			],
		});
	},
};
