import { Event } from "sheweny";
import type { ShewenyClient } from "sheweny";
import * as guildSettings from '../../structures/providers/guildProvider';
import { DBGuild } from "../../structures/class";
import { Guild, GuildMember, Message } from "discord.js";

export class MessageCreate extends Event {
  constructor(client: ShewenyClient) {
    super(client, "messageCreate", {
      description: "A message was send",
      once: false,
    });
  }

  async execute(message: Message) {
    let pLevel: number = 1;
    let pExp: number = 100;
    let min: number = 1;
    let max: number = 13;
    let random = Math.random() * (max - min) + min;
    const xp: number = Math.floor(random)

    async function updateLevel(guild: Guild, member: GuildMember) {
      let data: DBGuild = await guildSettings.getGuild(guild);

      data.members.forEach(mem => {
        if (mem.id.match(member.id)) {
          mem.exp += xp;

          while (pLevel < 100) {
            if (mem.exp >= pExp && mem.level + 1 === pLevel) {
              mem.level = pLevel;
              message.channel.send(`${message.member} Tu as gagné un niveau! Tu es maintenant niveau: ${mem.level}!`);
              break;
            } else {
              pLevel++;
              pExp = pExp * 2;
            }
          }
        }
      })
      return data
    };
    const updateData = await updateLevel(message.guild, message.member);
    await guildSettings.updateGuild(message.guild, updateData);
  }
}
