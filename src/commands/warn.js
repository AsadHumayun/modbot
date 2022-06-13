import { createCase } from '../functions/case/createCase';
import { getCaseReferences } from '../functions/case/getCaseReferences.js';

export default {
	name: 'warn',
	usage: '<member> [reason]',
	async execute(client, message, args) {
		if (!args.length) return message.reply(`You must use this command under the format of \`${this.name} ${this.usage}\``);
		const member = await message.guild.members.fetch(args[0]);
		if (!member) return message.reply('You must provide a valid member to warn');
		const reason = args.slice(1).join(' ') ?? client.config.case.defaultReason;

		await createCase({
			target: member.id,
			executor: message.author.id,
			reason,
			refersCases: 
		})
	},
};