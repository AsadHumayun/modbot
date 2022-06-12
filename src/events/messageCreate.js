export default {
	name: 'messageCreate',
	once: false,
	async execute(client, message) {
		if (message.channel.type == 'DM') return;

		if (message.partial) message = await message.fetch().catch(() => {return;});
		if (message.author.bot || message.webhookId || !message) return;

		if (!message.content.startsWith(client.config.prefix)) return;

		const args = message.content.trim().slice(client.config.prefix.length, message.content.length).split(/ +/g);
		const commandName = args.shift();
		const command = client.commands.get(commandName) || client.commands.find((cmd) => cmd.aliases?.includes(commandName));

		try {
			command.execute(client, message, args);
		}
		catch (e) {
			message.reply(`Whoops, an error occurred :c\n\`${e}\``);
		}
	},
};