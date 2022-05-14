import { Command } from "sheweny";
import type { ShewenyClient } from "sheweny";
import { CommandInteraction, MessageEmbed, TextChannel } from "discord.js";

export class ClearCommand extends Command {
    constructor(client: ShewenyClient) {
        super(client, {
            name: "clear",
            description: "La commande clear supprime des messages d'un salon",
            type: "SLASH_COMMAND",
            category: "Modération",
            channel: 'GUILD',
            options: [
                {
                    type: "NUMBER",
                    name: "number",
                    description: "Le nombre de messages à supprimer",
                    minValue: 1,
                    maxValue: 99,
                    required: true,
                },
            ],
            userPermissions: ["MANAGE_MESSAGES"],
            clientPermissions: ["MANAGE_MESSAGES"],
            examples: '/clear 10',
        });
    }
    execute(interaction: CommandInteraction) {
        const number = interaction.options.getNumber("number");

        (interaction.channel as TextChannel).bulkDelete(number + 1, true);

        const embed = new MessageEmbed()
            .setTitle('Résumé du clear')
            .setColor('#dc143c')
            .setDescription(`${number} messages ont été supprimés!`)
            .setFooter({ text: interaction.user.username, iconURL: interaction.user.avatarURL() })
            .setTimestamp();
        interaction.reply({ embeds: [embed] });
    }
}