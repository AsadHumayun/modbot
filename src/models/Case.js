import { DataTypes } from "sequelize";

export function Case(sequelize) {
	return sequelize.define("cases", {
		id: {
			unique: true,
			primaryKey: true,
			notNull: true,
			type: DataTypes.NUMBER,
		},
		target: {
			type: DataTypes.STRING,
			notNull: true,
		},
		executor: {
			type: DataTypes.STRING,
			notNull: true,
		},
		reason: {
			type: DataTypes.STRING,
			notNull: true,
		},
		refers_cases: {
			type: DataTypes.STRING,
		},
		guild_id: {
			type: DataTypes.STRING,
			notNull: true,
		},
		opcode: {
			type: DataTypes.NUMBER,
		},
	}, {
		timestamps: true,
	});
}