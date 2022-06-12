/**
 * @author asadhumayun
 */

import './functions/initClient.js';
import './functions/eventHandler.js';
import './functions/commandHandler.js';

import config from '../config.js';
import { client } from './functions/initClient.js';
import { initDb } from './functions/initDb.js';

client.data = initDb();
client.config = config;

export {
	client,
};