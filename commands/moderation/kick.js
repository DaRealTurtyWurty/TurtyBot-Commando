const { Command } = require('discord.js-commando');

module.exports = class KickCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'kick',
            group: 'moderation',
            memberName: 'kick',
            description: 'Kicks a member from the guild.',
            guildOnly: true,
            clientPermissions: ['KICK_MEMBERS'],
            userPermissions: ['KICK_MEMBERS'],
            args: [
                {
                    key: 'user',
                    prompt: 'What user would you like to kick?',
                    type: 'string'
                },

                {
                    key: 'reason',
                    prompt: 'What is the reason you would like to kick this user for?',
                    type: "string",
                    default: ""
                }
            ]
        });
    }

    async run(message, { user }, { reason }) {
        let userA = this.getUserByName(message, user);
        let member = message.guild.member(userA);
        if (member.kickable) {
            member.kick(reason)
            .then(userB => console.log(`Kicked ${userB.username} from ${message.guild.name}`))
            .catch(console.error);
            message.channel.send(`${userA.name} has been kicked from the server! Pog champ!`);
        }
        else message.channel.send("I cannot kick this user!");
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