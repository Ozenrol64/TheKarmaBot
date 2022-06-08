import { Command } from "sheweny";
import { server } from '../../structures/models/guildModel';
import type { ShewenyClient } from "sheweny";
import { CommandInteraction } from "discord.js";

export class UpdateAllCommand extends Command {
    constructor(client: ShewenyClient) {
        super(client, {
            name: "updateall",
            description: "Cette commande est réservée au développeur",
            type: "SLASH_COMMAND",
            category: "Dev",
            examples: '/updateall',
            adminsOnly: true,
        });
    }
    async execute(interaction: CommandInteraction) {
        const update = await server.updateMany({}, { blacklist: { channels: [], users: [] } }, { upsert: true });
        interaction.reply(`${update.matchedCount} guilds updated`);
        console.log(`Serveurs trouvés: ${update.matchedCount}. Serveurs modifiés: ${update.modifiedCount}`)
    }
}