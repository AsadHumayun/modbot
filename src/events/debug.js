import { WebhookClient } from 'discord.js';

export default {
	name: 'debug',
	once: false,
	async execute(client, debug) {
		const webh = new WebhookClient({ url: client.config.debugger['@link'] });

		webh.send('`' + debug + '`')
	}
}