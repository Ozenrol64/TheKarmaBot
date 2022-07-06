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
    }
}