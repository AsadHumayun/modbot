export default {
	prefix: '?',
	display: '974480619432206336',
	case: {
		defaultReason: '*[Moderator did not specify a reason]*',
	},
	roles: {
		muted: '991102197918085181',
		/**
		 * @todo
		 */
		modRoles: [],
	},
	colors: {
		invis: '#36393e',
		green: '#00f514',
		red: '#da0000',
		orange: '#f59300',
	},
	channels: {
		welcome: '990934663147188254',
		modlog: '985789719361245205',
		memberlog: '991088774857490503',
		permlog: '991091202478731337',
		msglog: '992597659439333439',
	},
	defaultRoles: [
		'990957499190489159',
	],
	modlog: '985789719361245205',
	opcodes: [
		/* type severity = "high" | "mild" | "none" | ""; */
		{ name: 'WARNING_ADD', severity: 'mild' },
		{ name: 'WARNING_REMOVE', severity: 'none', rel: 1 },
		{ name: 'CASE_REMOVE', severity: 'none' },
		{ name: 'TIMEOUT_SET', severity: 'mild' },
		{ name: 'TIMEOUT_REMOVE', severity: '', rel: 3 },
		{ name: 'ANTI_RAID_TIMEOUT', severity: 'high' },
		{ name: 'ROLE', severity: 'none' },
		{ name: 'UNROLE', severity: 'none' },
		{ name: 'GUILDMEMBER.KICK', severity: 'mild' },
	],
	guildId: '980833164945657878',
	emojis: {
		verified: '<:Verified:990362737500622858>',
		verifiedCDN: 'https://cdn.discordapp.com/attachments/985789702302994432/990371778327093268/Verified.png',
	},

	/**
	 * @property {string} '@link' Link to the webhook
	 */
	debugger: { '@link':'https://discord.com/api/webhooks/987867533833031691/giUkQ8Hc22w-BZaJN96silAHHA7AymOJqhvkZjMwzWHE_Y7PpE6b3Qx6v0wtV4ZyM_uO' },
};
