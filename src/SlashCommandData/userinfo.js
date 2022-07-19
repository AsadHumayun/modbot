import { SlashCommandBuilder } from '@discordjs/builders';

const SlashCommandData = new SlashCommandBuilder()
	.setName('userinfo')
	.setDescription('Displays information of a user (or yourself)')
	.addUserOption(
		opt => opt
			.setName('target')
			.setDescription('User whose information is to be displayed (leave blank to see your info)'),
	);

export {
	SlashCommandData as UserInfoSlashCommandData,
};
