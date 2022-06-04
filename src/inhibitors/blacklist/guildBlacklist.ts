import { Inhibitor } from "sheweny";
import type { ShewenyClient } from "sheweny";
import * as moderationSettings from "../../structures/providers/moderationProvider";
import type { CommandInteraction } from "discord.js";
import { DBModeration } from "../../structures/class";

export class GuildBlackListInhibitor extends Inhibitor {
    constructor(client: ShewenyClient) {
        super(client, "guildblacklist", {
            type: ["ALL"],
            priority: 4
        });
    }

    async execute(client: ShewenyClient, interaction: CommandInteraction) {
        const moderation:DBModeration = await moderationSettings.getModeration();
        const blacklist = moderation.blacklist.guild;

        return !blacklist.includes(interaction.guildId!);
    }

    onFailure(client: ShewenyClient, interaction: CommandInteraction) {
        interaction.reply("Ce serveur est blacklisté.");
    }
}