const { Command } = require('discord.js-commando');

module.exports = class BanCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'ban',
            group: 'moderation',
            memberName: 'ban',
            description: 'Bans a member from the guild.',
            guildOnly: true,
            clientPermissions: ['BAN_MEMBERS'],
            userPermissions: ['BAN_MEMBERS'],
            args: [
                {
                    key: 'user',
                    prompt: 'What user would you like to ban?',
                    type: 'string'
                },

                {
                    key: 'reason',
                    prompt: 'What is the reason you would like to ban this user for?',
                    type: "string",
                    default: ""
                }
            ]
        });
    }

    async run(message, { user }, { reason }) {
        let userA = this.getUserByName(message, user);
        let member = message.guild.member(userA);
        if (member.bannable) {
            member.ban({ reason: reason });
            console.log(userA);
            message.channel.send(`${member.user.username} has been banned from the server! Pog champ!`);
        }
        else message.channel.send("I cannot ban this user!");
    }

    getUserByName(message, name) {
        const user = this.client.users.cache.find(user => user.username == name) || message.guild.members.cache.get(name) || message.mentions.members.first();
        if (!user) {
            console.log(`Could not find ${name} in the cache`);
            return;
        }
        return user;
    }
}
