const {
    Command
} = require('discord.js-commando')

module.exports = class ClearCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'clear',
            group: 'moderation',
            memberName: 'clear',
            description: 'Deletes the specified amount of messages',
            aliases: ['purge', 'deletemessages'],
            guildOnly: true,
            clientPermissions: ['MANAGE_MESSAGES'],
            userPermissions: ['MANAGE_MESSAGES'],
            args: [{
                key: 'messageToDelete',
                prompt: 'How many messages would you like to delete?',
                type: 'string'
            }]
        });
    }

    async run(message, {
        text
    }) {
        const args = message.content.split(' ').slice(1);
        const amount = args.join(' ');

        if(amount > 100) return message.channel.send('You can only delete up to 100 messages.')
        if(amount < 1) return message.channel.send('You can\'t delete one message.')
        if (isNaN(amount)) return message.channel.send('The amount you provided was not a number.')
        if (!amount) return message.channel.send('You didn\'t specify the amount of messages to delete!')

        await message.channel.messages.fetch({
            limit: amount
        }).then(messages => {
            message.channel.bulkDelete(messages)
            message.channel.send(`Deleted messages.`)
        })
    }
}