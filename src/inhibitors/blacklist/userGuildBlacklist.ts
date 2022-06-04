import { Inhibitor } from "sheweny";
import * as guildSettings from "../../structures/providers/guildProvider";
import type { ShewenyClient } from "sheweny";
import type { CommandInteraction } from "discord.js";
import { DBGuild } from "../../structures/class";

export class UserGuildBlackListInhibitor extends Inhibitor {
    constructor(client: ShewenyClient) {
        super(client, "userGuildblacklist", {
            type: ["ALL"],
            priority: 1
        });
    }

    async execute(client: ShewenyClient, interaction: CommandInteraction) {
        const guild:DBGuild = await guildSettings.getGuild(interaction.guild);
        const blacklist:string[] = guild.blacklist.users;

        return !blacklist.includes(interaction.user.id!);
    }

    onFailure(client: ShewenyClient, interaction: CommandInteraction) {
        interaction.reply("Tu es sur la blacklist du serveur.");
    }
}