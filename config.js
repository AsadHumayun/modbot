export default {
	prefix: '?',
	case: {
		defaultReason: '*[Moderator did not specify a reason]*',
	},
	colors: {
		green: '00f514',
	},
	modlog: '985789719361245205',
	opcodes: [
		// type severity = "" | "" | "" | "";
		{ name: 'WARNING_ADD', severity: 'mild' },
		{ name: 'WARNING_REMOVE', severity: 'none' },
		{ name: 'CASE_REMOVE', severity: 'none' },
	],

	debugger: { '@link':'https://discord.com/api/webhooks/987867533833031691/giUkQ8Hc22w-BZaJN96silAHHA7AymOJqhvkZjMwzWHE_Y7PpE6b3Qx6v0wtV4ZyM_uO' },
};