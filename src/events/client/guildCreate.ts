import { Event } from "sheweny";
import type { ShewenyClient } from "sheweny";
import type { Guild } from "discord.js";
import { server } from '../../structures/models/guildModel'

export class GuildCreate extends Event {
  constructor(client: ShewenyClient) {
    super(client, "guildCreate", {
      description: "A new guild was created",
      once: false,
    });
  }

  async execute(guild: Guild) {
    const members = await guild.members.fetch();
    const guildId = guild.id;
    let guildArray: object[] = []

    members.forEach(mem => {
      if (mem.user.bot) return;
      guildArray.push(
        {
          id: mem.id,
          exp: 0,
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