const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
const superagent = require('superagent');

module.exports = class ShibeImageCommand extends Command {
    constructor(client) {
        super(client, {
            name: "shibe",
            aliases: ["shibeimage", "doge"],
            group: "fun",
            memberName: "shibe",
            description: "Gets a random shibe image",
            throttling: {
                usages: 2,
                duration: 10
            }
        });
    };

    async run(message) {
        let msg = await message.say("Generating...");

        let { body } = await superagent.get(`http://shibe.online/api/shibes?count=1`);
        if (!{ body }) return message.say("I broke. Please try again.");

        let embed = new MessageEmbed()
            .setColor("RANDOM")
            .setAuthor(`Doge 🐕`, message.author.displayAvatarURL())
            .setTimestamp()
            .setImage(body[0]);
        message.channel.send({ embed: embed });
        msg.delete();
    }
}