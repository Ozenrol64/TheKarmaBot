import { Command } from "sheweny";
import type { ShewenyClient } from "sheweny";
import { CommandInteraction, MessageEmbed, AutocompleteInteraction } from "discord.js";

export class HelpCommand extends Command {
    constructor(client: ShewenyClient) {
        super(client, {
            name: "help",
            description: "La commande help renvoie les informations sur les commandes du bot",
            type: "SLASH_COMMAND",
            category: "Misc",
            options: [
                {
                    name: "commande",
                    description: "Donner une commande pour plus d'informations",
                    type: "STRING",
                    autocomplete: true,
                }
            ]
        });
    }
    execute(interaction: CommandInteraction) {
        const cmd = interaction.options.getString('commande');
        const commands = Array.from(this.client.util.getCommands());
        const categories = new Set(commands.map((command) => command.category));
        let reply: number = 1

        if (cmd) {
            const cmdL = cmd.toLowerCase();
            commands.forEach(c => {
                if (c.name.match(cmdL)) {
                    const cmdEmbed = new MessageEmbed()
                        .setAuthor({ name: `Bonjour je suis ${this.client.user.username}!`, iconURL: this.client.user.displayAvatarURL() })
                        .setDescription(`Retrouvez ci-dessous les informations sur la commande ${cmd}!
      Si vous avez besoin de plus de précisions [retrouvez mon créateur](https://discord.gg/ex8H5nX2)
      ---------------`)
                        .addField(
                            `${cmd}`,
                            `Les informations sur la commande`
                        )
                        .setTimestamp()
                        .setColor('#dc143c')
                        .setFooter({ text: `Command module: Bot`, iconURL: interaction.guild && interaction.guild.iconURL() ? interaction.guild.iconURL() : null });

                    interaction.reply({ embeds: [cmdEmbed] });
                    reply = 3;
                }
            })
        }

        const embed = new MessageEmbed()
            .setAuthor({ name: `Bonjour je suis ${this.client.user.username}!`, iconURL: this.client.user.displayAvatarURL() })
            .setDescription(`Retrouvez ci-dessous la liste de mes commandes!
      Si vous avez besoin de plus de précisions [retrouvez mon créateur](https://discord.gg/ex8H5nX2)
      ---------------`)
            .addField(
                "Liste des commandes",
                `Une liste de toutes les catégories et de leurs commandes.\nPour plus d'informations, faites \`/help <command_name>\`.`
            )
            .setTimestamp()
            .setColor('#dc143c')
            .setFooter({ text: `Command module: Bot`, iconURL: interaction.guild && interaction.guild.iconURL() ? interaction.guild.iconURL() : null });

        for (const category of categories) {
            if (!category) continue;
            const commandsInCategory = commands.filter(
                (command) => command.category === category
            );
            embed.addField(
                category.toString(),
                `${commandsInCategory
                    .map(
                        (cmd) =>
                            "__" + `/` + cmd.name + " __ - " + cmd.description
                    )
                    .join(`\r\n`)}`
            );
        }
        if (!cmd) {
            interaction.reply({ embeds: [embed] });
        } else if (reply == 1) {
            interaction.reply({ content: `Argument incorrect (${cmd})`, ephemeral: true });
        }
    }

    async onAutocomplete(interaction: AutocompleteInteraction) {
        const focusedOption = interaction.options.getFocused(true);
        const choices = Array.from(this.client.util.getCommands()).map(c => c.name);
        const filtered = choices.filter((choice) =>
            choice.startsWith(`${focusedOption.value}`)
        );
        await interaction.respond(
            filtered.map((choice) => ({ name: choice, value: choice }))
        );
    }
}