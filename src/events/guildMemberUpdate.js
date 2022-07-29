import { getUserData } from '../functions/userData/getUserData.js';

/**
 * @type {import("../../types/Case").Case}
 */
export default {
	name: 'guildMemberUpdate',
	once: false,
	async execute(client, oldMember, newMember) {
		if (oldMember.guild.id != client.config.guildId) return;
		// 'id' property will always remain static on guild members
		const user = await getUserData(newMember.id);
		let roles = user.get('roles')?.split(';') || [];

		const oldRoles = [...oldMember.roles.cache.keys()].filter((r) => r != newMember.guild.id);
		const newRoles = [...newMember.roles.cache.keys()].filter((r) => r != newMember.guild.id);

		for (const f of roles) {
			if (oldRoles.includes(f) && (!newRoles.includes(f))) {
				roles = roles.filter((f0) => ![f].includes(f0));
			}
		}
		roles.push(newRoles.filter((f) => !oldRoles.includes(f)).join(';'));
		newRoles.forEach((f) => {
			if (!roles.includes(f)) roles.push(f);
		});
		for (const f in roles) {
			if (newMember.guild.roles.cache.get(roles[f]) && (!newRoles.includes(roles[f]))) roles = roles.filter((f0) => ![roles[f]].includes(f0));
		}
		roles = roles.filter((f) => !['', client.config.roles.member].includes(f));

		// remove duplicates:
		roles = [...new Set(roles)];
		await client.data.Users.update({
			roles: roles.join(';'),
		}, {
			where: {
				id: oldMember.id,
			},
		});
	},
};
