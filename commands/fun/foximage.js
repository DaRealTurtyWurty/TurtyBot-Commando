const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
const superagent = require('superagent');

module.exports = class FoxImageCommand extends Command {
    constructor(client) {
        super(client, {
            name: "fox",
            aliases: ["foximage"],
            group: "fun",
            memberName: "fox",
            description: "Gets a random fox image",
            throttling: {
                usages: 2,
                duration: 10
            }
        });
    };

    async run(message) {
        let msg = await message.say("Generating...");

        let { body } = await superagent.get(`https://some-random-api.ml/img/fox`);
        if (!{ body }) return message.say("I broke. Please try again.");

        let embed = new MessageEmbed()
            .setColor("RANDOM")
            .setAuthor(`Fox 🦊`, message.author.displayAvatarURL())
            .setTimestamp()
            .setImage(body.link);
        message.channel.send({ embed: embed });
        msg.delete();
    }
}