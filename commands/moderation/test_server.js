const { Command } = require('discord.js-commando');

module.exports = class TestServerCommand extends Command {
    constructor(client) {
        super(client, {
            name: "test_server",
            aliases: ["create_server", "test_create"],
            group: "moderation",
            memberName: "test_server",
            description: "Creates the test server template",
            throttling: {
                usages: 1,
                duration: 1000
            },
            ownerOnly: true,
            guildOnly: true
        });
    };

    async run(message) {
        // If Member role does not exist
        if (!message.guild.roles.cache.find(role => role.name === "Member")) {
            // Create Member Role
            let memberRole = message.guild.roles.create({
                data: {
                    name: 'Member',
                    color: 0x05a32d,
                    hoisted: true,
                    mentionable: false,
                    permissions: 0x00000400 | 0x00010000 | 0x00000800 | 0x00004000 | 0x00008000 | 0x00040000 | 0x00000040 | 0x00100000 | 0x00200000 | 0x00000200 | 0x02000000
                },
                reason: 'Adds member role'
            }).catch(console.error);

            memberRole.then(role => {
                message.guild.members.cache.each(user => user.roles.add(message.guild.roles.cache.find(role => role.name === "Member")));
            });
        }

        // Rename Text Category
        let textCategory = message.guild.channels.cache.find(c => c.name == "Text Channels" && c.type == "category");
        if (textCategory) {
            textCategory.edit({ name: "General Talk 💬" }).catch(console.error);
        } else {
            textCategory = message.guild.channels.cache.find(c => c.name == "General Talk 💬" && c.type == "category");
        }

        // Rename Voice Category
        let voiceCategory = message.guild.channels.cache.find(c => c.name == "Voice Channels" && c.type == "category");
        if (voiceCategory) {
            voiceCategory.edit({ name: "Voice Channels 🗣" }).catch(console.error);
        }

        // If an Information Category doesn't already exist
        if (!message.guild.channels.cache.find(c => c.name == "Information 📋" && c.type == "category")) {
            // Create Information Category
            let infoCategory = message.guild.channels.create("Information 📋", {
                type: "category",
                reason: "Information Category",
                position: 2
            }).catch(console.error);

            infoCategory.then(category => {
                if (!message.guild.channels.cache.find(c => c.name == "🦺rules" && c.type == "text")) {
                    // Rules channel
                    message.guild.channels.create("🦺rules", {
                        type: "text",
                        topic: "Server Rules. If you do not follow you you be given a warning/kick/mute/ban.",
                        parent: category.id,
                        permissionOverwrites: [
                            {
                                id: message.guild.roles.cache.find(role => role.name === "Member").id,
                                allow: ['VIEW_CHANNEL', 'READ_MESSAGE_HISTORY']
                            }
                        ]
                    }).then(rulesChannel => message.guild.setRulesChannel(rulesChannel, "Rules.")).catch(console.error);
                }

                if (!message.guild.channels.cache.find(c => c.name == "📈announcements" && c.type == "text")) {
                    // Announcements Channel
                    message.guild.channels.create("📈announcements", {
                        type: "text",
                        topic: "Important announcements for the server.",
                        parent: category.id,
                        permissionOverwrites: [
                            {
                                id: message.guild.roles.cache.find(role => role.name === "Member").id,
                                allow: ['VIEW_CHANNEL', 'READ_MESSAGE_HISTORY', 'ADD_REACTIONS']
                            }
                        ]
                    }).then(announcementChannel => message.guild.setPublicUpdatesChannel(announcementChannel, "Allow for public updates to be broadcasted to other servers."))
                        .catch(console.error);
                }

                if (!message.guild.channels.cache.find(c => c.name == "📠general-info" && c.type == "text")) {
                    // General Information Channel
                    message.guild.channels.create("📠general-info", {
                        type: "text",
                        topic: "General information for the server - how things work.",
                        parent: category.id,
                        permissionOverwrites: [
                            {
                                id: message.guild.roles.cache.find(role => role.name === "Member").id,
                                allow: ['VIEW_CHANNEL', 'READ_MESSAGE_HISTORY']
                            }
                        ]
                    }).catch(console.error);
                }

                if (!message.guild.channels.cache.find(c => c.name == "📊polls" && c.type == "text")) {
                    // Polls Channel
                    message.guild.channels.create("📊polls", {
                        type: "text",
                        topic: "Server Polls for QnA and etc.",
                        parent: category.id,
                        permissionOverwrites: [
                            {
                                id: message.guild.roles.cache.find(role => role.name === "Member").id,
                                allow: ['VIEW_CHANNEL', 'READ_MESSAGE_HISTORY']
                            }
                        ]
                    }).catch(console.error);
                }
            });
        }

        // If can't find general channel
        if (!message.guild.channels.cache.find(c => c.name == "general" && c.type == "text")) {
            if (!message.guild.channels.cache.find(c => c.name == "💬general" && c.type == "text")) {
                // Create General Channel
                message.guild.channels.create("💬general", {
                    type: "text",
                    topic: "A chat to talk about general stuff, this can be anything from kittens to GTA V. But keep it PG and no memes. Memes and non-PG goes to #off-topic",
                    parent: textCategory.id
                }).catch(console.error);
            }
        } else {
            // Rename General Channel
            message.guild.channels.cache.find(c => c.name == "general" && c.type == "text").edit({ name: "💬general" }).catch(console.error);
        }

        if (!message.guild.roles.cache.find(role => role.name === "Administrator")) {
            let adminRole = message.guild.roles.create({
                data: {
                    name: 'Administrator',
                    color: 0x00ff76,
                    hoisted: true,
                    mentionable: true,
                    permissions: 0x10000000 | 0x00000010 | 0x00000002 | 0x00000004 | 0x08000000 | 0x00010000 | 0x00000800 | 0x00001000 | 0x00002000 |
                        0x00004000 | 0x00008000 | 0x00020000 | 0x00040000 | 0x00000040 | 0x00100000 | 0x00200000 | 0x00000200 | 0x00400000 | 0x00800000 |
                        0x01000000 | 0x02000000 | 0x00000100
                },
                reason: "Add Administrator Role"
            });
        }
    }
}