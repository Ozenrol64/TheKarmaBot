import { Guild, GuildMember } from "discord.js";
import { DBGuild } from "../class";
import { server }  from "../models/guildModel";


    export async function get(guild: Guild) {
      const data = await server.findOne({ id: guild.id });
      if (data) return data;
    }
   
    export async function update(guild: Guild, settings: any) {
      let data = await get(guild);
      if (typeof data !== 'object') data = {}
      for (const key in settings) {
        if (data[key] !== settings[key]) data[key] = settings[key]
      }
      return await data.updateOne(settings);
    }
   