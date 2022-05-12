import { Command } from "sheweny";
import type { ShewenyClient } from "sheweny";
import { CommandInteraction, MessageEmbed } from "discord.js";

export class JokeCommand extends Command {
    constructor(client: ShewenyClient) {
        super(client, {
            name: "joke",
            description: "La commande joke envoie une blague",
            type: "SLASH_COMMAND",
            category: "Misc",
            examples: [
                '/joke'
            ],
        });
    }
    execute(interaction: CommandInteraction) {
        let min: number = 1;
        let max: number = 11;
        let random = Math.random() * (max - min) + min;
        const joke = Math.floor(random)
        const title = 'It\'s a Joke!';
        let text: string = ""

        switch (joke) {
            case 1:
                text = 'Qu\'est-ce que dark vador commande à la boulangerie ? \n ||3 petits pains et 2 tartes tatins pour pains pains pains tarte tatin tarte tatin!||';
                break;
            case 2:
                text = 'Qu\'est ce qui est pire qu\'un bébé dans une poubelle ? \n ||Un bébé dans deux poubelles||';
                break;
            case 3:
                text = 'Que faire quand on voit un épileptique dans une baignoire ? \n ||On met son linge, sa lessive et on règle sur 90°||';
                break;
            case 4:
                text = 'Pourquoi Marine Lepen aime le ski ? \n ||Parce qu’elle peut descendre des noirs||';
                break;
            case 5:
                text = 'Quel est le point commun entre les chaussures et les juifs ? \n ||Il y en a plus en 39 qu’en 45||';
                break;
            case 6:
                text = 'Quel est le point commun entre un ascenseur un juif et une cigarette ?\n ||Ca fait des cendres||';
                break;
            case 7:
                text = 'Que dit un oiseau qui passe au dessus d\'un camp de concentration ? \n ||Cui cui||';
                break;
            case 8:
                text = 'En Allemagne, il y a trois grands riches : \n le premier riche le deuxième riche ||et le troisième Reich||';
                break;
            case 9:
                text = 'Il existe trois états de la matière : \n liquide, solide ||et juif||';
                break;
            case 10:
                text = 'Quand est ce que Hitler s\'est suicidé ?\n ||Quand il a reçu sa facture de gaz||';
                break;
        }
        return interaction.reply({
            embeds: [
                new MessageEmbed()
                    .setTitle(title)
                    .setDescription(text)
                    .setColor('#dc143c')
                    .setFooter({ text: interaction.user.username, iconURL: interaction.user.avatarURL() })
                    .setTimestamp()
            ]
        });
    }
}