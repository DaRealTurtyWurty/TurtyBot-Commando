const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
const superagent = require('superagent');

module.exports = class HugCommand extends Command {
    constructor(client) {
        super(client, {
            name: "pat",
            aliases: ["patting", "patme"],
            group: "fun",
            memberName: "pat",
            description: "Send a patting gif 😉.",
            throttling: {
                usages: 2,
                duration: 10
            }
        });
    };

    async run(message) {
        let msg = await message.say("Generating...");

        let { body } = await superagent.get(`https://some-random-api.ml/animu/pat`).catch(err => {
            console.log("There was an error getting the pat gif " + err);
        });

        if (!body) return message.say("I broke. Please try again.");

        let embed = new MessageEmbed()
            .setColor("RANDOM")
            .setAuthor(`Here's a pat 😉`, message.author.displayAvatarURL())
            .setTimestamp()
            .setImage(body.link);
        message.channel.send({ embed: embed });
        msg.delete();
    }
}