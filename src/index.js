/**
 * @author asadhumayun
 */

import './functions/initClient.js';
import './functions/eventHandler.js';
import './functions/commandHandler.js';

import { client } from './functions/initClient.js';
import { initDb } from './functions/initDb.js';

client.data = initDb();

export {
	client,
};