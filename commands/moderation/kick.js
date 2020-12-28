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
                }
            ]
        });
    }

    async run(message, { text }) {
        let member = message.guild.members.cache.filter(user => user.id === text);
        message.say(member.name);
    }
}