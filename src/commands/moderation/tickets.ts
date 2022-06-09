import { Command } from "sheweny";
import type { ShewenyClient } from "sheweny";
import { CommandInteraction } from "discord.js";
import { MessageButton, MessageActionRow } from "discord.js";

export class TicketsCommand extends Command {
    constructor(client: ShewenyClient) {
        super(client, {
            name: "tickets",
            description: "Cette commande créé un salon de ticket",
            type: "SLASH_COMMAND",
            category: "Modération",
            examples: '/tickets',
            userPermissions: ["ADMINISTRATOR"],
            clientPermissions: ["MANAGE_CHANNELS"],
        });
    }
    execute(interaction: CommandInteraction) {
        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId("create")
                    .setLabel("Créer un ticket")
                    .setStyle("SUCCESS")
            );

        interaction.guild.channels.create('Tickets').then(channel => {
            channel.send({ content: "Créer un ticket", components: [row] });
        })
            interaction.reply({ content: "Le salon de ticket a été créé avec succès", ephemeral: true });
        }
}