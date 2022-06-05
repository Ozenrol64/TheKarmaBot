import { Command } from "sheweny";
import type { ShewenyClient } from "sheweny";
import * as guildSettings from "../../structures/providers/guildProvider";
import { CommandInteraction, Message, MessageEmbed, TextChannel } from "discord.js";
import { DBGuild } from "../../structures/class";

export class BanCommand extends Command {
    constructor(client: ShewenyClient) {
        super(client, {
            name: "logchannel",
            description: "La commande logChannel permet de définir ou de voir le channel de log du serveur",
            type: "SLASH_COMMAND",
            category: "Modération",
            options: [
                {
                    type: "SUB_COMMAND",
                    name: "set",
                    description: "Définir le channel de log du serveur",
                    options: [
                        {
                            type: "CHANNEL",
                            name: "channel",
                            description: "Le channel de log du serveur",
                            required: true,
                        }
                    ]
                },
                {
                    type: "SUB_COMMAND",
                    name: "show",
                    description: "Voir le channel de log du serveur",
                },
            ],
            userPermissions: ["ADMINISTRATOR"],
            examples: [
                '/logChannel set #logs',
                '/logChannel show',
            ],
        });
    }
    async execute(interaction: CommandInteraction) {
        switch (interaction.options.getSubcommand(false)) {
            case "set":
                const server: DBGuild = await guildSettings.getGuild(interaction.guild);
                const channel = interaction.options.getChannel("channel");

                server.logChannel = channel.id;
                await guildSettings.updateGuild(interaction.guild, server);

                interaction.reply(`Le channel de log du serveur a été défini sur <#${channel.id}>`);
                break;
            case "show":
                const server2: DBGuild = await guildSettings.getGuild(interaction.guild);
            return interaction.reply(`Le channel de log du serveur est <#${server2.logChannel}>`);
        }
    }
}