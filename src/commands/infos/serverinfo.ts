import { Command } from "sheweny";
import type { ShewenyClient } from "sheweny";
import { CommandInteraction, MessageEmbed } from "discord.js";

export class ServerInfoCommand extends Command {
    constructor(client: ShewenyClient) {
        super(client, {
            name: "serverinfo",
            description: "La commande serverinfo renvoie les informations du serveur",
            type: "SLASH_COMMAND",
            category: "Infos",
            examples: '/serverinfo',
        });
    }
    async execute(interaction: CommandInteraction) {
        const guild = interaction.guild;
        const owner = await guild.fetchOwner();

        return interaction.reply({
            embeds: [
                new MessageEmbed()
                    .setAuthor({ name: `${guild.name} (${guild.id})`, iconURL: guild.iconURL() })
                    .setDescription(`Owner: ${owner.displayName} (${owner.id})
          Créé le: ${guild.createdAt}
          Utilisateurs: ${guild.memberCount}
          Salons: ${guild.channels.cache.size}`)
          .setColor('#dc143c')
            ]
        })
    }
}