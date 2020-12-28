const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
const superagent = require('superagent');

module.exports = class KoalaImageCommand extends Command {
    constructor(client) {
        super(client, {
            name: "koala",
            aliases: ["koalaimage"],
            group: "fun",
            memberName: "koala",
            description: "Gets a random koala image",
            throttling: {
                usages: 2,
                duration: 10
            }
        });
    };

    async run(message) {
        let msg = await message.say("Generating...");

        let { body } = await superagent.get(`https://some-random-api.ml/img/koala`);
        if (!{ body }) return message.say("I broke. Please try again.");

        let embed = new MessageEmbed()
            .setColor("RANDOM")
            .setAuthor(`Koala 🐨`, message.author.displayAvatarURL())
            .setTimestamp()
            .setImage(body.link);
        message.channel.send({ embed: embed });
        msg.delete();
    }
}