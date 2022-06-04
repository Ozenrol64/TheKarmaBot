import { Event } from "sheweny";
import type { ShewenyClient } from "sheweny";
import type { CommandInteraction } from "discord.js";

export class MissingPermissions extends Event {
  constructor(client: ShewenyClient) {
    super(client, "clientMissingPermissions", {
      description: "Client is missing permissions",
      once: false,
      emitter: client.managers.commands
    });
  }

  async execute(interaction: CommandInteraction, missingPermissions: string[]) {
    return await interaction.reply(`Il me manque l${missingPermissions.length > 1 ? 'es' : 'a'} permission${missingPermissions.length > 1 ? 's' : ''} \`${missingPermissions}\` pour la commande **${interaction.commandName}**`);
  }
}