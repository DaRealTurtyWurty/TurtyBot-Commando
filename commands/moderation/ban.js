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
                }
            ]
        });
    }

    async run(message, { user }, { reason }){
        let member = message.guild.members.cache.filter(user => user.id === text);
        message.say(member.name);
        if(member.bannable){
            message.member.ban(reason);
        }
    }
}