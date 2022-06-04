import { Inhibitor } from "sheweny";
import type { ShewenyClient } from "sheweny";
import * as moderationSettings from "../../structures/providers/moderationProvider";
import type { CommandInteraction } from "discord.js";
import { DBModeration } from "../../structures/class";

export class UserGlobalBlackListInhibitor extends Inhibitor {
    constructor(client: ShewenyClient) {
        super(client, "userGlobalblacklist", {
            type: ["ALL"],
            priority: 3
        });
    }

    async execute(client: ShewenyClient, interaction: CommandInteraction) {
        const moderation: DBModeration = await moderationSettings.getModeration();
        const blacklist = moderation.blacklist.users;

        return !blacklist.includes(interaction.user.id!);
    }

    onFailure(client: ShewenyClient, interaction: CommandInteraction) {
        interaction.reply("Tu es sur la blacklist du bot.");
    }
}