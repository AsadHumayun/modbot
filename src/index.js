/**
 * @author asadhumayun
 */

import './functions/client/initClient.js';
import './functions/client/eventHandler.js';
import './functions/client/commandHandler.js';

import config from '../config.js';
import { client } from './functions/client/initClient.js';
import { initDb } from './functions/client/initDb.js';

client.data = initDb();
client.config = config;

process.on('uncaughtException', console.error);

export {
	client,
};