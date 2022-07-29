/**
 * @type {import("../../types/Event").Event}
 */
export default {
	name: 'interactionCreate',
	once: false,
	execute(client, interaction) {
		if (!interaction.isButton()) return;
	},
};
