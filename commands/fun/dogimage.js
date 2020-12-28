const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
const superagent = require('superagent');

module.exports = class DogImageCommand extends Command {
    constructor(client) {
        super(client, {
            name: "dog",
            aliases: ["dogimage", "woof", "doggo"],
            group: "fun",
            memberName: "dog",
            description: "Gets a random dog image",
            throttling: {
                usages: 2,
                duration: 10
            }
        });
    };

    async run(message) {
        let msg = await message.say("Generating...");

        let { body } = await superagent.get(`https://dog.ceo/api/breeds/image/random`);
        if (!{ body }) return message.say("I broke. Please try again.");

        let embed = new MessageEmbed()
            .setColor("RANDOM")
            .setAuthor(`Dog 🐶`, message.author.displayAvatarURL())
            .setTimestamp()
            .setImage(body.message);
        message.channel.send({ embed: embed });
        msg.delete();
    }
}