import { Command } from "sheweny";
import type { ShewenyClient } from "sheweny";
import { CommandInteraction, MessageEmbed } from "discord.js";

export class BotInfoCommand extends Command {
    constructor(client: ShewenyClient) {
        super(client, {
            name: "botinfo",
            description: "La commande botinfo renvoie les informations du le bot",
            type: "SLASH_COMMAND",
            category: "Infos",
            examples: '/botinfo',
        });
    }
    execute(interaction: CommandInteraction) {
        const bot = this.client;
        const nonBotUsers = this.client.users.cache.filter(user => !user.bot);

        return interaction.reply({
            embeds: [
                new MessageEmbed()
                    .setAuthor({ name: bot.user.username, iconURL: bot.user.displayAvatarURL() })
                    .setDescription(`Maintainer: [Ozenrol64#5030](https://discord.gg/ex8H5nX2)
          Uptime: ${bot.uptime}
          ---
          **Users**: ${nonBotUsers.size}
          **Servers**: ${bot.guilds.cache.size}`)
          .setColor('#dc143c')
                    .setFooter({ text: interaction.user.username, iconURL: interaction.user.avatarURL() })
                    .setTimestamp()
            ]
        })
    }
}