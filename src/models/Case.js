import { DataTypes } from 'sequelize';

/**
 * Defines the 'case' model and returns it
 * @param {import("sequelize").Sequelize} sequelize Sequelize instance
 * @returns {import("sequelize").Model}
 */
export function Case(sequelize) {
	return sequelize.define('cases', {
		id: {
			unique: true,
			primaryKey: true,
			allowNull: false,
			type: DataTypes.NUMBER,
		},
		target: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		executor: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		reason: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		refers_cases: {
			type: DataTypes.STRING,
		},
		guild_id: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		opcode: {
			type: DataTypes.NUMBER,
		},
		case_log_url: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		role_id: {
			type: DataTypes.STRING,
		},
		prune_members_kicked: {
			type: DataTypes.INTEGER,
		},
		prune_included_roles: {
			type: DataTypes.STRING,
		},
		prune_days: {
			type: DataTypes.INTEGER,
		},
	}, {
		timestamps: true,
	});
}
