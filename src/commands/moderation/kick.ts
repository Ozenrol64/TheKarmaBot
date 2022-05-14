import { Command } from "sheweny";
import type { ShewenyClient } from "sheweny";
import { CommandInteraction, MessageEmbed } from "discord.js";

export class KickCommand extends Command {
    constructor(client: ShewenyClient) {
        super(client, {
            name: "kick",
            description: "La commande ban exclu un membre du serveur",
            type: "SLASH_COMMAND",
            category: "Modération",
            options: [
                {
                    type: "USER",
                    name: "member",
                    description: "Le membre qui doit être exclu",
                    required: true,
                },
                {
                    type: "STRING",
                    name: "reason",
                    description: "La raison",
                },
            ],
            userPermissions: ["KICK_MEMBERS"],
            clientPermissions: ["KICK_MEMBERS"],
            examples: [
                '/kick @Ozenrol Raison',
                '/kick @Ozenrol'
            ],
        });
    }
    async execute(interaction: CommandInteraction) {
        const member = interaction.options.getUser("member");
        const mem = await interaction.guild.members.fetch(member.id);
        let reason = interaction.options.getString("reason");

        if (!mem.kickable) return interaction.reply('Il faut mentionner un utilisateur qui peut être expulsé');
        if (!reason) reason = "Raison non spécifiée";
        mem ? mem.kick(reason) : interaction.reply("L'utilisateur n'existe pas");

        const embed = new MessageEmbed()
            .setAuthor({ name: `${member.tag} (${member.id})`, iconURL: member.displayAvatarURL() })
            .setTitle('Expulsion!')
            .setColor('#dc143c')
            .setDescription(`${member.tag} a été expulsé pour la raison ${reason}`)
            .setFooter({ text: interaction.user.username, iconURL: interaction.user.avatarURL() })
            .setTimestamp()
        interaction.reply({ embeds: [embed] });
    }
}