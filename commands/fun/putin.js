const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');

module.exports = class PutinCommand extends Command {
    constructor(client) {
        super(client, {
            name: "putin",
            memberName: "putin",
            aliases: ["wideputin"],
            group: "fun",
            description: "wide"
        });
    };

    async run(message) {
        let embed = new MessageEmbed()
            .setColor("RANDOM")
            .setAuthor("Putin", message.author.displayAvatarURL())
            .setTimestamp()
            .setImage("https://media.tenor.com/images/1f70e6cb05211bc481af145bfe67bc64/tenor.gif");

        message.channel.send(embed);
    }
}
