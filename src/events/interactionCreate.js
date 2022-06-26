import { join } from 'node:path';

const SUBCOMMAND_DIR = join(process.cwd(), 'src', '@sub');

export default {
	name: 'interactionCreate',
	once: false,
	async execute(client, interaction) {
		if (!interaction.isCommand()) return;

		const command = client.commands.get(interaction.commandName) || client.commands.find((cmd) => cmd.aliases?.includes(interaction.commandName));
		const slashCommandData = command.slashCommandData.toJSON();

		if (slashCommandData.options.filter(({ type }) => type === 1).length >= 1) {
			const { execute } = await import('file:///' + join(SUBCOMMAND_DIR, interaction.commandName, interaction.options.getSubcommand() + '.js'));
			if (!execute) {
				return await interaction.reply({
					content: `No subcommand with name "${interaction.options.getSubcommand()}" and parent command "${interaction.commandName}" was found.`,
					ephemeral: true,
				});
			}
			try {
				execute(interaction);
			}
			catch (e) {
				interaction.reply({
					content: `Whoops, an error occurred :c\n\`${e}\``,
					ephemeral: true,
				});
			}
		}
		else {
			try {
				command.execute(client, interaction);
			}
			catch (e) {
				interaction.reply({
					content: `Whoops, an error occurred :c\n\`${e}\``,
					ephemeral: true,
				});
			}
		}
	},
};