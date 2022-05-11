import { ShewenyClient } from "sheweny";

export class client extends ShewenyClient {
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
    })
  }
};