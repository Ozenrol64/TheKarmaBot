import { Command } from "sheweny";
import type { ShewenyClient } from "sheweny";
import { CommandInteraction, MessageEmbed } from "discord.js";

export class ShiFuMiCommand extends Command {
    constructor(client: ShewenyClient) {
        super(client, {
            name: "shifumi",
            description: "La commande shifumi permet de jouer à Pierre Feuille Ciseaux contre le bot",
            type: "SLASH_COMMAND",
            category: "Misc",
            examples: [
                '/shifumi'
            ],
            options: [
                {
                    name: 'choix',
                    description: 'Votre choix',
                    type: 'STRING',
                    choices: [
                        {
                            name: 'Pierre',
                            value: 'r'
                        },
                        {
                            name: 'Feuille',
                            value: 'f'
                        },
                        {
                            name: 'Ciseaux',
                            value: 'c'
                        }
                    ],
                    required: true
                }
            ]
        });
    }
    execute(interaction: CommandInteraction) {
        const choix = Math.floor(Math.random() * 3);

        switch (interaction.options.getString('choix')) {
            case 'r':
            switch (choix) {
                case 0: 
                interaction.reply('Egalité!')
                break;

                case 1: 
                interaction.reply('Perdu! Le choix du bot était Feuille')
                break;

                case 2: 
                interaction.reply('Victoire! Le choix du bot était Ciseaux')
                break;
            }
            break;

            case 'f':
                switch (choix) {
                    case 0: 
                    interaction.reply('Victoire! Le choix du bot était Pierre')
                    break;
    
                    case 1: 
                    interaction.reply('Egalité!')
                    break;
    
                    case 2: 
                    interaction.reply('Perdu! Le choix du bot était Ciseaux')
                    break;
                }
            break;

            case 'c':
                switch (choix) {
                    case 0: 
                    interaction.reply('Perdu! Le choix du bot était Pierre')
                    break;
    
                    case 1: 
                    interaction.reply('Victoire! Le choix du bot était Pierre')
                    break;
    
                    case 2: 
                    interaction.reply('Egalité!')
                    break;
                }
            break;
        }
    }
}