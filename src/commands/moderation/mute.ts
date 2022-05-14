import { Command } from "sheweny";
import type { ShewenyClient } from "sheweny";
import { CommandInteraction, MessageEmbed } from "discord.js";
import ms from 'ms';

export class KickCommand extends Command {
    constructor(client: ShewenyClient) {
        super(client, {
            name: "mute",
            description: "La commande mute fait taire un membre du serveur",
            type: "SLASH_COMMAND",
            category: "Modération",
            options: [
                {
                    type: "USER",
                    name: "member",
                    description: "Le membre a faire taire",
                    required: true,
                  },
                  {
                    type: "NUMBER",
                    name: "time",
                    description: "Le temps que la personne sera mute (En minutes)",
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
                '/mute @Ozenrol 10mn Raison',
                '/mute @Ozenrol 100ans'
            ],
        });
    }
    async execute(interaction: CommandInteraction) {
        const member = interaction.options.getUser("member");
        let number = interaction.options.getNumber("time");
        const time = ms(`${number}m`);
        const mem = interaction.guild.members.cache.get(member.id);
        let reason = interaction.options.getString("reason");
    
        if (!mem.moderatable) return interaction.reply('Il faut mentionner un utilisateur qui peut être banni');
        if (!reason) reason = "Raison non spécifiée";
        mem ? mem.timeout(time , reason) : interaction.reply("L'utilisateur n'existe pas");
    
        const embed = new MessageEmbed()
          .setAuthor({ name: `${member.tag} (${member.id})`, iconURL: member.displayAvatarURL() })
          .setTitle('Mute!')
          .setColor('#dc143c')
          .setDescription(`${member.tag} a été mute ${number}mn pour la raison: ${reason}`)
          .setFooter({ text: interaction.user.username, iconURL: interaction.user.avatarURL() })
          .setTimestamp()
        interaction.reply({ embeds: [embed] });
    }
}