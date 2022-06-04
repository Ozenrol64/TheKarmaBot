import { Guild } from "discord.js";
import { server }  from "../models/guildModel";


    export async function getGuild(guild: Guild) {
      const data = await server.findOne({ id: guild.id });
      if (data) return data;
    }
   
    export async function updateGuild(guild: Guild, settings: any) {
      let data = await getGuild(guild);
      if (typeof data !== 'object') data = {}
      for (const key in settings) {
        if (data[key] !== settings[key]) data[key] = settings[key]
      }
      return await data.updateOne(settings);
    }
   