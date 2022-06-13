import { Command } from "sheweny";
import type { ShewenyClient } from "sheweny";
import { CommandInteraction, GuildMember } from "discord.js";
import { RPGmember } from "../../structures/models/memberModel";
import * as memberSettings from "../../structures/providers/memberProvider";

export class StartRPGCommand extends Command {
    constructor(client: ShewenyClient) {
        super(client, {
            name: "startrpg",
            description: "La commande startrpg permet de s'inscrire au jeu du bot (RPG)",
            type: "SLASH_COMMAND",
            category: "RPG",
        });
    }
    async execute(interaction: CommandInteraction) {
        const member = interaction.member as GuildMember;
        const memberDB = await memberSettings.getRPGMember(member);
        if (memberDB) {
            interaction.reply({ content: "Vous êtes déjà inscrit au jeu du bot (RPG)", ephemeral: true });
            return;
        } else {
            RPGmember.create({ id: interaction.user.id })
            interaction.reply({ content: "Vous êtes inscrit au jeu du bot!", ephemeral: true });
        }
    }
}