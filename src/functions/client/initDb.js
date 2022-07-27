/**
 * Starts the database and defines models.
 */

import Sequelize from 'sequelize';
import { join } from 'node:path';

import { Case } from '../../models/Case.js';
import { User } from '../../models/User.js';
import { Channel } from '../../models/Channel.js';

export function initDb() {
	const sequelize = new Sequelize('database', 'user', 'password', {
		host: 'localhost',
		dialect: 'sqlite',
		storage: join(process.cwd(), 'assets', 'db', 'database.sqlite'),
		// logging: console.log,
		// logQueryParameters: true,
	});

	/**
	 * @MP Potential class usage here? Seeing some rep.
	 * @EndMP
	 */
	const Cases = Case(sequelize);
	const Users = User(sequelize);
	const Channels = Channel(sequelize);

	if (process.argv.includes('--syncdb')) {
		// necessary to construct tables
		console.info('[Sequelize] Syncing database...');
		const start = Date.now();
		sequelize.sync({ force: true });
		console.info(`[Sequelize] Successfully synced sequelize database in ${start - Date.now()} ms`);
	}

	return Object.freeze({
		sequelize,
		Cases,
		Users,
		Channels,
	});
}
