import { join } from 'node:path';
import { InteractionType } from 'discord.js';
import { EmbedBuilder, PermissionsBitField } from 'discord.js';

const SUBCOMMAND_DIR = join(process.cwd(), 'src', '@sub');

/**
 * @type {import("../../types/Event").Event}
 */
export default {
	name: 'interactionCreate',
	once: false,
	async execute(client, interaction) {
		if (interaction.type !== InteractionType.ApplicationCommand) return;

		await interaction.deferReply();

		const command = client.commands.get(interaction.commandName) || client.commands.find((cmd) => cmd.aliases?.includes(interaction.commandName));
		const slashCommandData = command.slashCommandData.toJSON();

		const channel = await client.data.Channels.findByPk(interaction.channel.id);
		if (!['disable'].includes(command.name) && channel?.dataValues.disabled) return;

		if (command.moderator) {
			const guildMember = await client.guilds.cache.get(client.config.guildId).members.fetch({ user: interaction.user.id });
			const hasModRole = function() {
				let isMod = false;
				[...guildMember.roles.cache.values()]
					.map(({ id }) => id)
					.forEach((id) => {
						if (client.config.roles.mod.includes(id)) isMod = true;
					});

				return isMod;
			};

			if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator) && !hasModRole()) {
				return await interaction.followUp({
					embeds: [
						new EmbedBuilder()
							.setColor(client.config.colors.orange)
							.setDescription('This is a moderator-only command, sorreh.'),
					],
				});
			}
		}
		/**
		 * if the slash command data has no options that are type 1, then it has no subcommands and can be executed normally
		 */
		if (slashCommandData.options.filter(({ type }) => type === 1).length >= 1) {
			const { execute } = await import('file:///' + join(SUBCOMMAND_DIR, interaction.commandName, interaction.options.getSubcommand() + '.js'));
			if (!execute) {
				return await interaction.followUp({
					content: `No subcommand with name "${interaction.options.getSubcommand()}" and parent command "${interaction.commandName}" was found.`,
					ephemeral: true,
				});
			}
			try {
				execute(interaction);
			}
			catch (e) {
				interaction.followUp({
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
				interaction.followUp({
					content: `Whoops, an error occurred :c\n\`${e}\``,
					ephemeral: true,
				});
			}
		}
	},
};
