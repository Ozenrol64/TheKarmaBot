import { Command } from "sheweny";
import type { ShewenyClient } from "sheweny";
import { CommandInteraction, MessageEmbed } from "discord.js";
import *  as moderationSettings from '../../structures/providers/moderationProvider';
import *  as guildSettings from '../../structures/providers/guildProvider';
import { DBGuild, DBModeration } from "../../structures/class";

export class BlacklistCommand extends Command {
    constructor(client: ShewenyClient) {
        super(client, {
            name: "blacklist",
            description: "La commande blacklist permet de retirer, d'ajouter ou de voir la liste noire du serveur.",
            type: "SLASH_COMMAND",
            category: "Modération",
            options: [
                {
                    type: "SUB_COMMAND",
                    name: "show",
                    description: "Affiche la liste noire du serveur ou globale.",
                    options: [
                        {
                            type: "STRING",
                            name: "cible",
                            description: "Choisir la liste noire à afficher.",
                            choices: [
                                {
                                    name: "guild",
                                    value: "guild"
                                },
                                {
                                    name: "global",
                                    value: "global"
                                }
                            ],
                            required: true,
                        }
                    ]
                },
                {
                    type: "SUB_COMMAND_GROUP",
                    name: "add",
                    description: "Ajoute un utilisateur ou un salon à la liste noire du serveur.",
                    options: [
                        {
                            type: "SUB_COMMAND",
                            name: "channel",
                            description: "Ajoute un salon à la liste noire du serveur.",
                            options: [
                                {
                                    type: "CHANNEL",
                                    name: "channel",
                                    description: "Choisir le salon à ajouter à la liste noire.",
                                    required: true,
                                },
                            ]
                        },
                        {
                            type: "SUB_COMMAND",
                            name: "member",
                            description: "Ajoute un utilisateur à la liste noire du serveur.",
                            options: [
                                {
                                    type: "USER",
                                    name: "member",
                                    description: "Le membre que l'on veut ajouter à la liste noire.",
                                    required: true,
                                },
                                {
                                    type: "STRING",
                                    name: "cible",
                                    description: "La cible de l'action.",
                                    choices: [
                                        {
                                            name: "guild",
                                            value: "guild"
                                        },
                                        {
                                            name: "global",
                                            value: "global"
                                        }
                                    ],
                                    required: true,
                                },
                            ],
                        },
                        {
                            type: "SUB_COMMAND",
                            name: "guild",
                            description: "Ajoute un serveur à la liste noire.",
                            options: [
                                {
                                    type: "STRING",
                                    name: "guild",
                                    description: "L'id du serveur que l'on veut ajouter à la liste noire.",
                                    required: true,
                                },
                            ],
                        },
                    ]
                },
                {
                    type: "SUB_COMMAND_GROUP",
                    name: "remove",
                    description: "Retire un utilisateur ou un salon de la liste noire du serveur.",
                    options: [
                        {
                            type: "SUB_COMMAND",
                            name: "channel",
                            description: "Retire un salon à la liste noire du serveur.",
                            options: [
                                {
                                    type: "CHANNEL",
                                    name: "channel",
                                    description: "Choisir le salon à retirer à la liste noire.",
                                    required: true,
                                },
                            ]
                        },
                        {
                            type: "SUB_COMMAND",
                            name: "member",
                            description: "Retire un utilisateur de la liste noire du serveur.",
                            options: [
                                {
                                    type: "USER",
                                    name: "member",
                                    description: "Le membre que l'on veut retirer de la liste noire.",
                                    required: true,
                                },
                                {
                                    type: "STRING",
                                    name: "cible",
                                    description: "La cible de l'action.",
                                    choices: [
                                        {
                                            name: "guild",
                                            value: "guild"
                                        },
                                        {
                                            name: "global",
                                            value: "global"
                                        }
                                    ],
                                    required: true,
                                },
                            ],
                        },
                        {
                            type: "SUB_COMMAND",
                            name: "guild",
                            description: "Retire un serveur de la liste noire.",
                            options: [
                                {
                                    type: "STRING",
                                    name: "guild",
                                    description: "L'id du serveur que l'on veut retirer de la liste noire.",
                                    required: true,
                                },
                            ],
                        },
                    ]
                },
            ],
            userPermissions: ["BAN_MEMBERS"],
            examples: [
                '/blacklist @Ozenrol add guild',
                '/ban @Ozenrol remove global',
            ],
        });
    }
    async execute(interaction: CommandInteraction) {
        let moderation: DBModeration = await moderationSettings.getModeration();
        let server: DBGuild = await guildSettings.getGuild(interaction.guild);

        switch (interaction.options.getSubcommandGroup(false)) {
            case null:
                let target = interaction.options.getString("cible");

                if (target === "guild") {
                    if (server.blacklist.users.length === 0 && server.blacklist.channels.length === 0) {
                        return interaction.reply("La liste noire du serveur est vide.");
                    }
                    let channels = server.blacklist.channels.map(channel => `<#${channel}>`).join(", ") ? server.blacklist.channels.map(channel => `<#${channel}>`).join(", ") : "Aucun salon";
                    let members = server.blacklist.users.map(member => `<@${member}>`).join(", ") ? server.blacklist.users.map(member => `<@${member}>`).join(", ") : "Aucun membre";
                    let embed = new MessageEmbed()
                        .setColor('#dc143c')
                        .setTitle(`Liste noire du serveur ${interaction.guild.name}`)
                        .addFields(
                            { name: 'Membres:', value: members, inline: true },
                            { name: 'Salons:', value: channels, inline: true },
                        )

                    interaction.reply({ embeds: [embed] });
                } else {
                    if (moderation.blacklist.users.length === 0 && moderation.blacklist.guild.length === 0) {
                        return interaction.reply("La liste noire globale est vide.");
                    }
                    let guilds = moderation.blacklist.guild.map(guild => guild).join(", ") ? moderation.blacklist.guild.map(guild => guild).join(", ") : "Aucun serveur";
                    let members = moderation.blacklist.users.map(member => `<@${member}>`).join(", ") ? moderation.blacklist.users.map(member => `<@${member}>`).join(", ") : "Aucun membre";
                    let embed = new MessageEmbed()
                        .setColor('#dc143c')
                        .setTitle(`Liste noire globale`)
                        .addFields(
                            { name: 'Membres', value: members, inline: true },
                            { name: 'Serveurs', value: guilds, inline: true },
                        )

                    interaction.reply({ embeds: [embed] });
                }
            case "add":
                switch (interaction.options.getSubcommand(false)) {
                    case "channel":
                        const channel = interaction.options.getChannel('channel');

                        server.blacklist.channels.push(channel.id);
                        let embed = new MessageEmbed()
                            .setTitle("Ajout d'un salon à la liste noire")
                            .setDescription(`Le salon ${channel.name} a été ajouté à la liste noire.`)
                            .setColor("#dc143c");

                        await guildSettings.updateGuild(interaction.guild, server);
                        interaction.reply({ embeds: [embed] });
                        break;
                    case "member":
                        const member = interaction.options.getUser('member');
                        const target = interaction.options.getString('cible');

                        if (target === "guild") {
                            server.blacklist.users.push(member.id);

                            let embed = new MessageEmbed()
                                .setTitle("Ajout d'un utilisateur à la liste noire du serveur")
                                .setDescription(`L'utilisateur ${member.tag} a été ajouté à la liste noire du serveur.`)
                                .setColor("#dc143c");

                            await guildSettings.updateGuild(interaction.guild, server);
                            interaction.reply({ embeds: [embed] });
                        } else if (target === "global" && interaction.user.id === '708015637645099049') {
                            moderation.blacklist.users.push(member.id);
                            let embed = new MessageEmbed()
                                .setTitle("Ajout d'un utilisateur à la liste noire globale")
                                .setDescription(`L'utilisateur ${member.tag} a été ajouté à la liste noire globale.`)
                                .setColor("#dc143c");

                            await moderationSettings.updateModeration(moderation);
                            interaction.reply({ embeds: [embed] });
                        }
                        break;
                    case "guild":
                        const guild = interaction.options.getString('guild');
                        if (interaction.user.id === '708015637645099049') {
                            moderation.blacklist.guild.push(guild);
                            moderationSettings.updateModeration(moderation);
                            let embed = new MessageEmbed()
                                .setTitle("Ajout d'un serveur à la liste noire")
                                .setDescription(`Le serveur ${guild} a été ajouté à la liste noire.`)
                                .setColor("#dc143c");
                            interaction.reply({ embeds: [embed] });
                        } else {
                            return interaction.reply("Vous n'avez pas la permission d'utiliser cette commande.");
                        }
                }
                break;
            case "remove":
                switch (interaction.options.getSubcommand(false)) {
                    case "channel":
                        let channel = interaction.options.getChannel('channel');
                        let indexC = server.blacklist.channels.indexOf(channel.id);

                        if (indexC === -1) return interaction.reply("Ce salon n'est pas dans la liste noire.");

                        server.blacklist.channels.splice(indexC);
                        await guildSettings.updateGuild(interaction.guild, server);

                        let embed = new MessageEmbed()
                            .setTitle("Supression d'un salon de la liste noire.")
                            .setDescription(`Le salon ${channel.name} a été retiré de la liste noire.`)
                            .setColor("#dc143c");
                        interaction.reply({ embeds: [embed] });
                        break;
                    case "member":
                        let member = interaction.options.getUser('member');
                        let target = interaction.options.getString('cible');

                        if (target === "guild") {
                            let indexM = server.blacklist.users.indexOf(member.id);

                            if (indexM === -1) return interaction.reply("Cet utilisateur n'est pas dans la liste noire du serveur.");

                            server.blacklist.users.splice(indexM);
                            await guildSettings.updateGuild(interaction.guild, server);

                            let embed = new MessageEmbed()
                                .setTitle("Supression d'un utilisateur de la liste noire du serveur.")
                                .setDescription(`L'utilisateur ${member.tag} a été retiré de la liste noire du serveur.`)
                                .setColor("#dc143c");
                            interaction.reply({ embeds: [embed] });
                        } else if (target === "global" && interaction.user.id === '708015637645099049') {
                            let indexM = moderation.blacklist.users.indexOf(member.id);

                            if (indexM === -1) return interaction.reply("Cet utilisateur n'est pas dans la liste noire globale.");

                            moderation.blacklist.users.splice(indexM);
                            await moderationSettings.updateModeration(moderation);

                            let embed = new MessageEmbed()
                                .setTitle("Supression d'un utilisateur de la liste noire globale.")
                                .setDescription(`L'utilisateur ${member.tag} a été retiré de la liste noire globale.`)
                                .setColor("#dc143c");
                            interaction.reply({ embeds: [embed] });
                        }
                        break;
                        case "guild":
                        const guild = interaction.options.getString('guild');
                        if (interaction.user.id === '708015637645099049') {
                            let indexG = moderation.blacklist.guild.indexOf(guild);

                            if (indexG === -1) return interaction.reply("Ce serveur n'est pas dans la liste noire.");

                            moderation.blacklist.guild.splice(indexG);
                            moderationSettings.updateModeration(moderation);

                            let embed = new MessageEmbed()
                                .setTitle("Supression d'un serveur de la liste noire.")
                                .setDescription(`Le serveur ${guild} a été retiré de la liste noire.`)
                                .setColor("#dc143c");
                            interaction.reply({ embeds: [embed] });
                        } else {
                            return interaction.reply("Vous n'avez pas la permission d'utiliser cette commande.");
                        }
                }
                break;
        }
    }
}