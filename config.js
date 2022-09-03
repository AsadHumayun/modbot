/**
 * The configuration instance
 * @type {import("./types/Config").Config}
 */
export default {
	display: '1005086922558930954',
	case: {
		defaultReason: '*[Moderator did not specify a reason]*',
	},
	roles: {
		member: '1015565127518531687',
		muted: '1015565241117052949',
		mod: ['1015565047226974289'],
	},
	colors: {
		invis: '#36393e',
		green: '#00f514',
		red: '#da0000',
		orange: '#f59300',
	},
	channels: {
		welcome: '1014643454954979331',
		modlog: '1015562274578112533',
		memberlog: '1015562290474516500',
		permlog: '1015563907424849980',
		msglog: '1015563970104528967',
	},
	defaultRoles: ['1015565127518531687'],
	opcodes: [
		/* type severity = "high" | "mild" | "none" | ""; */
		{ name: 'WARNING_ADD', severity: 'mild' },
		{ name: 'WARNING_REMOVE', severity: 'none', rel: 1 },
		{ name: 'CASE_REMOVE', severity: 'none' },
		{ name: 'TIMEOUT_SET', severity: 'mild', rel: 4 },
		{ name: 'TIMEOUT_REMOVE', severity: '', rel: 3 },
		{ name: 'ANTI_RAID_TIMEOUT', severity: 'high' },
		{ name: 'GUILDMEMBER_ROLES_ADD', severity: 'none', rel: 7 },
		{ name: 'GUILDMEMBER_ROLES_REMOVE', severity: 'none', rel: 6 },
		{ name: 'GUILDMEMBER_KICK', severity: 'mild' },
		{ name: 'GUILDMEMBER_SOFTBAN', severity: 'mild' },
		{ name: 'MEMBERS_PRUNE', severity: 'mild' },
		{ name: 'PUNISH', severity: 'mild' },
		{ name: 'GUILDMEMBER_BAN', severity: 'high', rel: 14 },
		{ name: 'GUILDMEMBER_UNPUNISH', severity: '' },
		{ name: 'GUILDMEMBER_UNBAN', severity: '', rel: 12 },
		{ name: 'GUILDCHANNEL_LOCK', severity: 'mild', rel: 16 },
		{ name: 'GUILDCHANNEL_UNLOCK', severity: '', rel: 15 },
	],
	guildId: '1014643454954979328',
	emojis: {
		verified: '<:Verified:990362737500622858>',
		verifiedCDN: 'https://cdn.discordapp.com/attachments/985789702302994432/990371778327093268/Verified.png',
	},

	/**
	 * @const {Record<string, string>}
	 */
	debugger: { '@link': 'https://discord.com/api/webhooks/1015565723776585781/slMl346RJh0L8HrgjhHz0eQ_NS29tB5NT71NcPcNpEWBE2uDK5a_miOHzV1nVu46uURU' },

	ofncs: {
		'1': [ 'Spam', 1 ],
		'2': [ 'Excessive Mentions', 1 ],
		'3': [ 'Begging', 1 ],
		'4': [ 'Impersonating Staff', 1 ],
		'5': [ 'Discrimination', 1 ],
		'6': [ 'Advertising', 3 ],
		'7': [ 'NSFW', 2 ],
		'8': [ 'Threats', 2 ],
		'9': [ 'Joking about Mental Illnesses (or any other disability)', 3 ],
		'10': [ 'Disrespecting Privacy', 3 ],
		'11': [ 'Exploiting Glitches', 3 ],
		'12': [ 'Bypassing Punishments via the means of alts', 4 ],
		'13': [ 'Leaving server to evade punishments (before punished; not after)', 4 ],
		'14': [ 'Excessively Rude', 1 ],
	},
};
