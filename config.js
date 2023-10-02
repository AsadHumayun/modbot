/**
* The configuration instance
* @type {import("./types/Config").Config}
*/
export default {
	display: '720270972229517413',
	case: {
		defaultReason: '*[Moderator did not specify a reason]*',
	},
	roles: {
		member: '1084206787118506126',
		muted: '1084207020707688468',
		mod: [
			'1084206763185811456',
		],
	},
	colors: {
		invis: '#36393e',
		green: '#00f514',
		red: '#da0000',
		orange: '#f59300',
	},
	channels: {
		welcome: '1084202656395964518',
		modlog: '1084209105159335976',
		memberlog: '1084209138093002762',
		permlog: '1084209120716013568',
		msglog: '1084210333201219764',
	},
	defaultClientPresenceData: {
		activities: [{
			name: 'you',
			type: 'WATCHING',
		}],
		status: 'dnd',
	},
	defaultRoles: [],
	opcodes: [
		/* severity = "high" | "mild" | "none" | ""; */
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
	guildId: '1084202655762620529',
	emojis: {
		verified: '<:Verified:1084214745156030494>',
		verifiedCDN: 'https://cdn.discordapp.com/attachments/985789702302994432/990371778327093268/Verified.png',
	},
	debugger: { '@link':'Your_Webhook_Link_Here' },
	ofncs: {
		'1': [ 'Spam', 1 ],
		'2': [ 'Excessive Mentions', 1 ],
		'3': [ 'Begging', 1 ],
		'4': [ 'Impersonating Staff', 1 ],
		'5': [ 'Discrimination', 1 ],
		'6': [ 'Advertising', 3 ],
		'7': [ 'NSFW', 2 ],
		'8': [ 'Threats', 2 ],
		'9': [ 'Joking about illnesses (or any other disability)', 3 ],
		'10': [ 'Disrespecting Privacy', 3 ],
		'11': [ 'Exploiting Glitches', 3 ],
		'12': [ 'Bypassing Punishments via the means of alts', 4 ],
		'13': [ 'Leaving server to evade punishments (before punished; not after)', 4 ],
		'14': [ 'Excessively Rude', 1 ],
	},
};
