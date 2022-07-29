import { DataTypes } from 'sequelize';

const {
	STRING,
	TEXT,
} = DataTypes;

/**
 * Defines the 'user' model and returns it
 * @param {import("sequelize").Sequelize} sequelize Sequelize instance
 * @returns {import("sequelize").Model<any, any>}
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
			ofncs: {
				type: TEXT,
			},
		}, {
			timestamps: true,
		});
}
