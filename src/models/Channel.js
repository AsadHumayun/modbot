import { DataTypes } from 'sequelize';

/**
 * Defines the 'channel' model and returns it
 * @param {import("sequelize").Sequelize} sequelize Sequelize instance
 * @returns {import("sequelize").Model}
 */
export function Channel(sequelize) {
	return sequelize.define('channels', {
		id: {
			unique: true,
			primaryKey: true,
			allowNull: false,
			type: DataTypes.STRING,
		},
		disabled: {
			type: DataTypes.STRING,
			allowNull: false,
			defaultValue: '0',
		},
	}, {
		timestamps: true,
	});
}
