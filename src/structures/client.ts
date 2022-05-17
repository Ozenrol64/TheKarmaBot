import { ShewenyClient } from "sheweny";
import mongoose from 'mongoose'
import { TOKEN, MONGOSTRING } from "../util/config";
import { GuildProvider } from "./providers";

export class client extends ShewenyClient {
  start: () => void;
  GuildSettings: GuildProvider;
  constructor() {
    super({
      admins: ['708015637645099049'],
      allowedMentions: {
        parse: ['roles', 'everyone', 'users'],
        repliedUser: false,
      },
      partials: ['CHANNEL', 'GUILD_MEMBER', 'GUILD_SCHEDULED_EVENT', 'MESSAGE', 'REACTION', 'USER'],
      presence: {
        status: 'online',
        activities: [
          {
            name: 'se faire développer',
            type: 'PLAYING',
          },
        ],
      },
      intents: 32767,
      managers: {
        commands: {
          directory: './commands',
          loadAll: true,
          autoRegisterApplicationCommands: true,
          guildId: ["882179773017755678"]
        },
        events: {
          directory: './events',
          loadAll: true,
        },
        inhibitors: {
          directory: './inhibitors',
          loadAll: true,
        },
        buttons: {
          directory: './interactions/buttons',
          loadAll: true,
        },
        selectMenus: {
          directory: './interactions/select-menus',
          loadAll: true,
        },
      },
    });

    this.GuildSettings = new GuildProvider

    this.start = async () => {
      try {
        await mongoose.connect(MONGOSTRING, {
          autoIndex: false,
          maxPoolSize: 10,
          serverSelectionTimeoutMS: 5000,
          socketTimeoutMS: 45000,
          family: 4
        });
        console.log('DB connectée');
      } catch (e) {
        console.log("DB pas connectée!\n\n", e)
        return process.exit();
      }
      return this.login(TOKEN);
    }
  }
};