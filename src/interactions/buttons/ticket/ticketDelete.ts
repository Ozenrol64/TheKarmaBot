import { Button, ShewenyClient } from "sheweny";
import type { ButtonInteraction } from "discord.js";
import { MessageButton, MessageActionRow } from "discord.js";

export class ticketDeleteButton extends Button {
    constructor(client: ShewenyClient) {
        super(client, ["delete"]);
    }
    
    execute(button: ButtonInteraction) {
        //@ts-ignore
        if (button.member.permissions.has("ADMINISTRATOR")) {
            button.channel.delete();
        } else {
            button.reply({ content: "Tu n'as pas la permission de supprimer ce ticket", ephemeral: true });
        }
    }
}