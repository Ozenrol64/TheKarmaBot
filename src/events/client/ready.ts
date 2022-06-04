import { Event } from "sheweny";
import * as moderationSettings from '../../structures/providers/moderationProvider';
import type { ShewenyClient } from "sheweny";
import type { Client } from "discord.js";
import { Moderation } from "../../structures/models/moderationModel";

export class Ready extends Event {
  constructor(client: ShewenyClient) {
    super(client, "ready", {
      description: "Client is logged in",
      once: true,
    });
  }

  async execute(client: Client) {
    const moderationDB = await moderationSettings.getModeration();
    if (!moderationDB) {
      await Moderation.create({ id: 1 });
    }

    console.log("The client is logged in");
  }
}