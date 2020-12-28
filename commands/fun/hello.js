const { Command } = require('discord.js-commando');

module.exports = class HelloCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'hello',
            aliases: ['hi', 'howdy', 'heya', 'hey'],
            group: 'fun',
            memberName: 'hello',
            description: 'Replies with a hello.',
            throttling: {
                usages: 1,
                duration: 60
            }
        });
    }

    run(message) {
        return message.say('Hello there!!');
    }
}