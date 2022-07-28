import { join } from 'node:path';
import { InteractionType } from 'discord-api-types/v10';

const SUBCOMMAND_DIR = join(process.cwd(), 'src', '@sub');

/**
 * @type {import("../../types/Event").Event}
 */
export default {
	name: 'interactionCreate',
	once: false,
	async execute(client, interaction) {
		if (interaction.type !== InteractionType.ApplicationCommand) return;

		const command = client.commands.get(interaction.commandName) || client.commands.find((cmd) => cmd.aliases?.includes(interaction.commandName));
		const slashCommandData = command.slashCommandData.toJSON();

		const channel = await client.data.Channels.findByPk(interaction.channel.id);
		if (!['disable'].includes(command.name) && channel?.dataValues.disabled) return;

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
			// No sub command
			// Executing (command)
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
