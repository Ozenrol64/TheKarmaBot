import { Command } from "sheweny";
import type { ShewenyClient } from "sheweny";
import { CommandInteraction, MessageEmbed } from "discord.js";

export class UserInfoCommand extends Command {
    constructor(client: ShewenyClient) {
        super(client, {
            name: "userinfo",
            description: "La commande userinfo renvoie les informations de l'utilisateur",
            type: "CONTEXT_MENU_USER",
            category: "Infos",
            examples: 'CONTEXT MENU',
        });
    }
    execute(interaction: CommandInteraction) {
        const user = interaction.options.getUser('user');
        const member = interaction.guild.members.cache.get(user.id)

    return interaction.reply({
      embeds: [
        new MessageEmbed()
          .setAuthor({
            name: `${user.username} (${user.id})`, iconURL: user.avatarURL()
          })
          .setColor('#dc143c')
          .setDescription(`Son compte a été créé le ${user.createdAt}
          Il a rejoint le serveur le ${member.joinedAt}
          Bot: ${user.bot}
          Rôles: ${member.roles.cache.map(role => role.name).join(', ')}`)
      ]
    })
    }
}