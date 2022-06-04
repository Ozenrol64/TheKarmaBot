import { Inhibitor } from "sheweny";
import * as guildSettings from '../../structures/providers/guildProvider';
import type { ShewenyClient } from "sheweny";
import type { CommandInteraction } from "discord.js";
import { DBGuild } from "../../structures/class";

export class ChannelBlackListInhibitor extends Inhibitor {
    constructor(client: ShewenyClient) {
        super(client, "channelblacklist", {
            type: ["ALL"],
            priority: 2,
        });
    }

    async execute(client: ShewenyClient, interaction: CommandInteraction) {
        const guild:DBGuild = await guildSettings.getGuild(interaction.guild);
        const blacklist:string[] = guild.blacklist.channels;

        return !blacklist.includes(interaction.channelId!);
    }

    onFailure(client: ShewenyClient, interaction: CommandInteraction) {
        interaction.reply("Ce salon est blacklisté.");
    }
}