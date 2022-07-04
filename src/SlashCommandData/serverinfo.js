import { SlashCommandBuilder } from '@discordjs/builders';

const SlashCommandData = new SlashCommandBuilder()
	.setName('serverinfo')
	.setDescription('Shows information about the current server').setDMPermission(false)
	.setDMPermission(false);

export {
	SlashCommandData as ServerInfoSlashCommandData,
};
