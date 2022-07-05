import { Command } from "sheweny";
import type { ShewenyClient } from "sheweny";
import { CommandInteraction, MessageEmbed } from "discord.js";
import BlaguesAPI from 'blagues-api';

export class JokeCommand extends Command {
    constructor(client: ShewenyClient) {
        super(client, {
            name: "joke",
            description: "La commande joke envoie une blague",
            type: "SLASH_COMMAND",
            category: "Misc",
            options: [
                {
                    name: "type",
                    description: "Choisir le type de blague",
                    type: "STRING",
                    choices: [
                        {
                            name: 'Aléatoire',
                            value: 'random'
                        },
                        {
                            name: 'Tout public',
                            value: 'global'
                        },
                        {
                            name: 'Humour Noir',
                            value: 'dark'
                        },
                        {
                            name: 'Blague de dev',
                            value: 'dev'
                        },
                        {
                            name: 'Blague 18+',
                            value: '18+'
                        },
                        {
                            name: 'Blague beauf',
                            value: 'beauf'
                        },
                        {
                            name: 'Blondes',
                            value: 'blondes'
                        },
                    ],
                    required: true
                }
            ],
            examples: [
                '/joke'
            ],
        });
    }
    async execute(interaction: CommandInteraction) {
        const jokeAPI = new BlaguesAPI('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNzA4MDE1NjM3NjQ1MDk5MDQ5IiwibGltaXQiOjEwMCwia2V5IjoiUHhySVlzRUhMbmdGeTdxSFduVWx1a2FJakQxR0tFeEY0Zmk4V1p0ck1nbmtBVENrVDEiLCJjcmVhdGVkX2F0IjoiMjAyMi0wNy0wNVQwNjoyMjoyNCswMDowMCIsImlhdCI6MTY1NzAwMjE0NH0.9owfp14iZKzR1etwHiE9ttboTPhEVaqw1aP0J9_343E')
        let type: string;
        let joke: string;
        let answer: string;

        switch (interaction.options.getString('type')) {
            case 'random':
                let blagueRan = await jokeAPI.random();
                type = blagueRan.type;
                joke = blagueRan.joke;
                answer = blagueRan.answer;
                break;

            case 'global':
                let blagueGlob = await jokeAPI.randomCategorized(
                    jokeAPI.categories.GLOBAL
                  );
                type = blagueGlob.type;
                joke = blagueGlob.joke;
                answer = blagueGlob.answer;
                break;

            case 'dark':
                let blagueDark = await jokeAPI.randomCategorized(
                    jokeAPI.categories.DARK
                  );
                type = blagueDark.type;
                joke = blagueDark.joke;
                answer = blagueDark.answer;
                break;

            case 'dev':
                let blagueDev = await jokeAPI.randomCategorized(
                    jokeAPI.categories.DEV
                  );
                type = blagueDev.type;
                joke = blagueDev.joke;
                answer = blagueDev.answer;
                break;

            case '18+':
                let blague18 = await jokeAPI.randomCategorized(
                    jokeAPI.categories.LIMIT
                  );
                type = blague18.type;
                joke = blague18.joke;
                answer = blague18.answer;
                break;

            case 'beauf':
                let blagueBeauf = await jokeAPI.randomCategorized(
                    jokeAPI.categories.BEAUF
                  );
                type = blagueBeauf.type;
                joke = blagueBeauf.joke;
                answer = blagueBeauf.answer;
                break;

            case 'blondes':
                let blagueBlondes = await jokeAPI.randomCategorized(
                    jokeAPI.categories.BLONDES
                  );
                type = blagueBlondes.type;
                joke = blagueBlondes.joke;
                answer = blagueBlondes.answer;
                break;
        }

        const embed = new MessageEmbed()
            .setColor('#dc143c')
            .setTitle('Joke!')
            .setDescription(`${joke} \n ||${answer}||`)
            .setFooter({ text: type, iconURL: interaction.user.avatarURL() });

        interaction.reply({ embeds: [embed] });
        /*let min: number = 1;
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
        });*/
    }
}