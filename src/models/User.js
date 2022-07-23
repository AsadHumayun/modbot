import { DataTypes } from 'sequelize';

const {
	STRING,
	TEXT,
} = DataTypes;

/**
 * Defines the 'case' model and returns it
 * @param {import("sequelize").Sequelize} sequelize Sequelize instance
 * @returns {import("sequelize").Model}
 */
export function User(sequelize) {
	return sequelize
		.define('user', {
			id: {
				unique: true,
				allowNull: false,
				primaryKey: true,
				type: STRING,
			},
			roles: {
				type: TEXT,
			},
			chnlp: {
				type: TEXT,
			},
			metadata: {
				type: TEXT,
			},
		}, {
			timestamps: true,
		});
}
