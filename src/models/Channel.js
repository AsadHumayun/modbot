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
			type: DataTypes.NUMBER,
		},
		disabled: {
			allowNull: false,
			defaultValue: false,
			type: DataTypes.BOOLEAN,
		},
	}, {
		timestamps: true,
	});
}
