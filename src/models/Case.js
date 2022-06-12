import { DataTypes } from 'sequelize';

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
	}, {
		timestamps: true,
	});
}