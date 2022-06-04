import { Command } from "sheweny";
import * as guildSettings from '../../structures/providers/guildProvider';
import type { ShewenyClient } from "sheweny";
import { CommandInteraction, MessageEmbed, User } from "discord.js";
import { DBGuild } from "../../structures/class";

export class RankCommand extends Command {
    constructor(client: ShewenyClient) {
        super(client, {
            name: "rank",
            description: "Affiche ton niveau ou celui d'un utilisateur",
            type: "SLASH_COMMAND",
            category: "Misc",
            examples: '/rank',
            options: [
                {
                    name: "member",
                    description: "Donner un membre pour afficher son niveau",
                    type: "USER",
                }
            ]
        });
    }
    async execute(interaction: CommandInteraction) {
        const data: DBGuild = await guildSettings.getGuild(interaction.guild);
        const member = interaction.options.getUser('member') ? interaction.options.getUser('member') : interaction.user;

        data.members.forEach(mem => {
            if (mem.id === member.id) {
                const embed = new MessageEmbed()
                    .setTitle('Niveau')
                    .setColor('#dc143c')
                    .addField(`Niveau: ${mem.level}`, `XP: ${mem.exp}`)
                    .setFooter({ text: member.username, iconURL: member.displayAvatarURL() })
                    .setTimestamp();

                interaction.reply({ embeds: [embed] });
            }
        })
    }
}