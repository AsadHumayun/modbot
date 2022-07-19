import { MessageEmbed } from 'discord.js';
import { getUser } from '../message/getUser.js';

import { warn } from '../../embeds/dmNotification/warn.js';
import { antiRaidMuteSet } from '../../embeds/dmNotification/antiRaidMuteSet.js';

/**
 * Notifies the target user of the fact that a user has been created in regard to them.
 * @param {import("discord.js").Guild} guild The guild in which this member resides
 * @param {import("../../../types/Case").Case} caseData Case data of which to notify the user of
 * @returns {Promise<void>}
 */
export async function notifyUserOfCase(guild, caseData) {
	const user = await guild.members.fetch(caseData.target);
	const target = await getUser(caseData.target);
	if (!user) return;

	switch (Number(caseData.opcode)) {
	case 0:
		embed;
	}
}
