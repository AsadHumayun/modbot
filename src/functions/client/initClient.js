import { Client, Intents, Options } from 'discord.js';
import { config } from 'dotenv';

/**
 * The currently instantiated Discord Client.
 * @type {Discord.Client}
 */
const client = new Client({
	// Overriding the cache used in GuildManager, ChannelManager, GuildChannelManager, RoleManager
	// and PermissionOverwriteManager is unsupported and will break functionality
	makeCache: Options.cacheWithLimits({
		MessageManager: 100,
		GuildMemberManager: 100,
		PresenceManager: 0,
		GuildStickerManager: 0,
		GuildInviteManager: 0,
		GuildBanManager: 0,
	}),
	allowedMentions: {
		parse: [],
		repliedUser: false,
	},
	intents: new Intents([
		Intents.FLAGS.GUILDS,
		Intents.FLAGS.GUILD_MESSAGES,
		Intents.FLAGS.GUILD_MEMBERS,
		Intents.FLAGS.DIRECT_MESSAGES,
	]),
});

config();
client.login(process.env.token);

export { client };