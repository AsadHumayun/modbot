export default {
	name: 'test',
	aliases: ['test', 't'],
	descriptor: 'A test command',
	async execute(client, message) {
		message.reply('I am alive!!!!!');
	},
};