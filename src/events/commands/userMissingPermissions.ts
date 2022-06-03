import { Event } from "sheweny";
import type { ShewenyClient } from "sheweny";
import type { Client, CommandInteraction } from "discord.js";

export class UserMissingPermissions extends Event {
  constructor(client: ShewenyClient) {
    super(client, "userMissingPermissions", {
      description: "User is missing permissions",
      once: false,
    });
  }

  execute(client: Client, interaction: CommandInteraction) {
    console.log('User is missing permissions');
  }
}