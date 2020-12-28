const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
const superagent = require('superagent');

module.exports = class RedPandaImageCommand extends Command {
    constructor(client) {
        super(client, {
            name: "redpanda",
            aliases: ["redpandaimage"],
            group: "fun",
            memberName: "redpanda",
            description: "Gets a random redpanda image",
            throttling: {
                usages: 2,
                duration: 10
            }
        });
    };

    async run(message) {
        let msg = await message.say("Generating...");

        let { body } = await superagent.get(`https://some-random-api.ml/img/red_panda`);
        if (!{ body }) return message.say("I broke. Please try again.");

        let embed = new MessageEmbed()
            .setColor("RANDOM")
            .setAuthor(`Red Panda 🐼`, message.author.displayAvatarURL())
            .setTimestamp()
            .setImage(body.link);
        message.channel.send({ embed: embed });
        msg.delete();
    }
}