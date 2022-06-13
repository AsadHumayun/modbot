import { createCase } from '../functions/case/createCase.js';
import { getCaseReferences } from '../functions/case/getCaseReferences.js';
import { constructEmbed } from '../functions/case/constructEmbed.js';
import { getNewCaseId } from '../functions/case/getNewCaseId.js';
import { modActionSuccessEmbed } from '../functions/message/modActionSuccessEmbed.js';

export default {
	name: 'warn',
	usage: '<member> [reason]',
	async execute(client, message, args) {
		if (!args.length) return message.reply(`You must use this command under the format of \`${this.name} ${this.usage}\``);
		const member = await message.guild.members.fetch(args[0]);
		if (!member) return message.reply('You must provide a valid member to warn');
		const caseId = await getNewCaseId();
		const sliced = args.slice(1);
		const [ refersCases, refIndex ] = getCaseReferences(sliced);
		sliced.splice(refIndex, 1);
		const reason = sliced.join(' ') ?? client.config.case.defaultReason;
		const caseData = {
			id: caseId,
			target: member.id,
			executor: message.author.id,
			reason,
			refersCases,
			guildId: message.guild.id,
			opcode: '0',
		};
		const embed = await constructEmbed(caseData);
		const logMessage = await client.channels.cache.get(client.config.modlog).send({ embeds: [embed] });
		caseData.caseLogURL = logMessage.url;
		await createCase(caseData);

		const embeds = [ await modActionSuccessEmbed(caseData) ];
		message.reply({
			embeds,
		});
	},
};