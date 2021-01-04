const {MessageEmbed} = require('discord.js');
const {Command} = require('discord.js-commando');

module.exports = class LearnJavaCommand extends Command {
    constructor(client) {
        super(client, {
                name: 'learnjava',
                group: 'util',
                aliases: ['java', 'lj'],
                memberName: 'learnjava',
                description: 'Sends useful information about learning java.',
            }
        )
    };

    async run(message) {
        const embed = new MessageEmbed()
            .setColor('ff0000')
            .setDescription('Before coding mods for Minecraft, we would highly recommend learning java. Learning java would stop unnecessary issues occuring that could be solved by simple java knowledge. \n Below are some useful links to get you started!')
            .addField(
                'Official Java Docs:', 'https://docs.oracle.com/javase/tutorial', false
            )
            .addField(
                'Basic Course & Interactive Environment:', 'https://www.codecademy.com/learn/learn-java', false
            )
            .addField(
                'Full Java Course:', 'https://java-programming.mooc.fi/', false
            )

        message.channel.send(embed)
    };
}