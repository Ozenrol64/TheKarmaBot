import { Guild } from "discord.js";
import { server }  from "./models";

export class GuildProvider {
    async get(guild: Guild) {
      const data = await server.findOne({ id: guild.id });
      if (data) return data;
    }
   
    async update(guild: Guild, settings: any) {
      let data = await this.get(guild);
      if (typeof data !== 'object') data = {}
      for (const key in settings) {
        if (data[key] !== settings[key]) data[key] = settings[key]
      }
      return data.updateOne(settings);
    }
   }
   