import { Event } from "sheweny";
import type { ShewenyClient } from "sheweny";
import * as guildSettings from "../../structures/providers/guildProvider"
import { GuildMember, MessageEmbed, TextChannel } from "discord.js";
import { DBGuild } from "../../structures/class";

export class GuildMemberAdd extends Event {
    constructor(client: ShewenyClient) {
        super(client, "guildMemberAdd", {
            description: "A new member join the guild",
            once: false,
        });
    }

    async execute(member: GuildMember) {
        const server: DBGuild = await guildSettings.getGuild(member.guild);
        const logChannel = this.client.channels.cache.get(server.logChannel) as TextChannel;
        let number: number = 0;

        server.members.forEach(mem => {
            if (mem.id != member.id) {
                number += 1;
            }
        });
        if (server.members.length === number) {
            server.members.push({
                id: member.id,
                level: 0,
                exp: 0,
            });
            await guildSettings.updateGuild(member.guild, server);
        }

        try {
            const embed = new MessageEmbed()
                .setColor('#dc143c')
                .setTitle('Nouveau membre')
                .setDescription(`${member.user.tag} (${member.user.id}) a rejoint le serveur, nous sommes maintenant ${member.guild.memberCount} membres`)
                .setTimestamp()
                .setFooter({ text: member.guild.name, iconURL: member.guild.iconURL() });
            await logChannel.send({ embeds: [embed] });
        } catch (e) {
            console.log('Erreur lors de l\'envoi du message d\'arrivée d\'un membre');
        }
    }
}
