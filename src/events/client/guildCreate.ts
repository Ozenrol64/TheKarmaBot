import { Event } from "sheweny";
import type { ShewenyClient } from "sheweny";
import type { Guild, GuildMember } from "discord.js";
import { server } from '../../structures/models'
import { GuildProvider } from "../../structures/providers";

export class GuildCreate extends Event {
  constructor(client: ShewenyClient) {
    super(client, "guildCreate", {
      description: "A new guild was created",
      once: false,
    });
  }

  async execute(guild: Guild) {
    const members = await guild.members.fetch();
    const guildMembers = members.map(m => m.id)
    const guildId = guild.id;
    let guildArray: object[] = []

    guildMembers.forEach(id => {
      guildArray.push(
        {
          id: id,
          level: 0
        }
      )
    })

    server.create({ id: guildId, members: guildArray }, err => {
      if (err) return console.log("Erreur de création de guild");
      console.log(`Nouveau Serveur => ${guild.name} (${guildId})`);
    });  
  }
}