/**
 * Starts the database and defines models.
 */

import Sequelize from 'sequelize';
import { join } from 'node:path';

import { Case } from '../models/Case.js';

export function initDb() {
	const sequelize = new Sequelize('database', 'user', 'password', {
		host: 'localhost',
		dialect: 'sqlite',
		storage: join(process.cwd(), 'assets', 'db', 'database.sqlite'),
		logging: false,
	});

	const Cases = Case(sequelize);

	if (process.argv.includes('--syncsql')) {
		// necessary to construct tables
		console.info('[Sequelize] Syncing database...');
		sequelize.sync({ force: true });
		console.info('[Sequelize] Successfully synced sequelize database');
	}

	return Object.freeze({
		sequelize,
		Cases,
	});
}