import { TimeoutSlashCommandData as slashCommandData } from '../SlashCommandData/timeout.js';

/**
 * @type {import('../../types/command').Command}
 */
export default {
	slashCommandData,
	name: 'timeout',
	moderator: true,
};
