import { Command } from "sheweny";
import type { ShewenyClient } from "sheweny";
import { CommandInteraction, MessageEmbed } from "discord.js";

export class PingCommand extends Command {
  constructor(client: ShewenyClient) {
    super(client, {
      name: "ping",
      description: "Ping the bot",
      type: "SLASH_COMMAND",
      category: "Misc",
    });
  }
  async execute(interaction: CommandInteraction) {
    const sentMessage = await interaction.channel.send('Pong!');
    const timeStamp = sentMessage.editedTimestamp ? sentMessage.editedTimestamp : sentMessage.createdTimestamp;
    const botLatency = `${'```'}\n ${Math.round(sentMessage.createdTimestamp - timeStamp)}ms ${'```'}`;
    const apiLatency = `${'```'}\n ${Math.round(interaction.client.ws.ping)}ms ${'```'}`;

    const embed = new MessageEmbed()
      .setTitle('Pong! 🏓')
      .addField('Latence du bot', botLatency, true)
      .addField('Latence de l\'API', apiLatency, true)
      .setFooter({ text: interaction.user.username, iconURL: interaction.user.displayAvatarURL() })
      .setTimestamp();

    await sentMessage.edit({
      content: null,
      embeds: [embed]
    });

    interaction.reply({ content: "La commande a été exécutée avec succès", ephemeral: true });
  }
}