import { Command } from "sheweny";
import type { ShewenyClient } from "sheweny";
import { CommandInteraction, MessageEmbed } from "discord.js";

export class EvalCommand extends Command {
  constructor(client: ShewenyClient) {
    super(client, {
      name: "eval",
      description: "Cette commande est réservée au développeur",
      type: "SLASH_COMMAND",
      category: "Dev",
      examples: '/eval code',
      adminsOnly: true,
      options: [
        {
          type: "STRING",
          name: "code",
          description: "Le code à exécuter",
          required: true,
        },
      ],
      
    });
  }
  execute(interaction: CommandInteraction) {
    const code = interaction.options.getString("code");
    try {
      let evaled = eval(code);

      if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled);

      interaction.reply({content: evaled, ephemeral: true});
    } catch (err) {
      interaction.reply(`\`ERROR\` \`\`\`xl\n${err}\n\`\`\``);
    }
  }
}