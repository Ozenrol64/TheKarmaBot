import { Button, ShewenyClient } from "sheweny";
import type { ButtonInteraction } from "discord.js";
import { MessageButton, MessageActionRow } from "discord.js";

export class ticketCreateButton extends Button {
  constructor(client: ShewenyClient) {
    super(client, ["create"]);
  }
  execute(button: ButtonInteraction) {
    const row = new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setCustomId("delete")
          .setLabel("Supprimer le ticket")
          .setStyle("DANGER")
      );

    button.guild.channels.create(`Ticket de ${button.user.username}`).then(channel => {
      channel.send({ content: `Ticket de ${button.user.username}`, components: [row] });
    });

    button.reply({ content: "Tu as créé un nouveau ticket", ephemeral: true });
  }
}