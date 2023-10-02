import { TestSlashCommandData as slashCommandData } from '../SlashCommandData/test.js';
import { join } from 'node:path';

/**
 * @type {import('../../types/Command').Command}
 */
export default {
	slashCommandData,
	name: 'test',
	aliases: ['test', 't'],
	descriptor: 'A test command',
	async execute(client, interaction) {
		if (interaction.options.getString('command')) {
			return await interaction.followUp({
				content: 'Due to ESM constraints, this simply isn\'t possible. [(read more)](<https://github.com/nodejs/modules/issues/307>)',
			});
		}

		const types = [
			'CHANNEL_UPDATE',
			'CHANNEL_OVERWRITE_CREATE',
			'CHANNEL_OVERWRITE_UPDATE',
			'CHANNEL_OVERWRITE_DELETE',
		];
		const auditLogs = [];
		types.forEach(async (type) => {
			const log = await interaction.guild.fetchAuditLogs({
				limit: 1,
				type,
			}).entries; // .catch(() => {});
			if (log) auditLogs.push(log.first());
		});
		let largest = auditLogs[0];
		for (const audit in auditLogs) {
			if (auditLogs[audit].createdAt.getTime() > largest) {
				largest = auditLogs[audit];
			}
			else {continue;}
		}

		console.log(largest, auditLogs.length);

/*		interaction.guild.fetchAuditLogs({
			limit: 1,
			type: types[0],
		})
			.then((e)=>console.log(e.entries.first()));*/
	},
};
