import { Client, GatewayIntentBits, Options } from 'discord.js';
import { config as setupEnvironmentVariables } from 'dotenv';
import config from '../../../config.js';

/**
 * The currently instantiated Discord Client.
 * @type {Client}
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
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.DirectMessages,
		GatewayIntentBits.MessageContent,
	],
});

/**
 * Moved here from index.js as when adding choices
 * for the punish command in slashCommandData, config was
 * not accessible.
 */
client.config = config;

setupEnvironmentVariables();
client.login(process.env.token);

export { client };
