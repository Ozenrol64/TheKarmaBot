import { Command } from "sheweny";
import type { ShewenyClient } from "sheweny";
import { CommandInteraction, MessageEmbed } from "discord.js";

export class BanCommand extends Command {
    constructor(client: ShewenyClient) {
        super(client, {
            name: "ban",
            description: "La commande ban banni un membre du serveur",
            type: "SLASH_COMMAND",
            category: "Modération",
            options: [
                {
                    type: "USER",
                    name: "member",
                    description: "Le membre qui doit être banni",
                    required: true,
                },
                {
                    type: "STRING",
                    name: "reason",
                    description: "La raison",
                },
            ],
            userPermissions: ["BAN_MEMBERS"],
            clientPermissions: ["BAN_MEMBERS"],
            examples: [
                '/ban @Ozenrol Raison',
                '/ban @Ozenrol'
            ],
        });
    }
    execute(interaction: CommandInteraction) {
        const member = interaction.options.getUser("member");
        const mem = interaction.guild.members.cache.get(member.id);
        let reason = interaction.options.getString("reason");

        if (!mem.bannable) return interaction.reply('Il faut mentionner un utilisateur qui peut être banni');
        if (!reason) reason = "Raison non spécifiée";
        mem.ban({ days: 7, reason: reason });

        const embed = new MessageEmbed()
            .setAuthor({ name: `${member.tag} (${member.id})`, iconURL: member.displayAvatarURL() })
            .setTitle('Bannissement!')
            .setColor('#dc143c')
            .setDescription(`${member.tag} a été banni pour la raison: ${reason}`)
            .setFooter({ text: interaction.user.username, iconURL: interaction.user.avatarURL() })
            .setTimestamp()
        interaction.reply({ embeds: [embed] });
    }
}