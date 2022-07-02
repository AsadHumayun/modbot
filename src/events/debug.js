import { WebhookClient } from 'discord.js';
import { default as config } from '../../config.js';

/**
 * @type {import("../../types/Event").Event}
 */
export default {
	name: 'debug',
	once: false,
	async execute(client, debug) {
		const webh = new WebhookClient({ url: config.debugger['@link'] });

		webh.send('`' + debug + '`');
	},
};
