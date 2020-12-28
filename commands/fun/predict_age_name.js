const { Command } = require('discord.js-commando');
const { MessageEmbed } = require("discord.js");
const superagent = require("superagent");

module.exports = class NameAgePredictCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'nameage',
            group: 'fun',
            memberName: 'nameage',
            description: 'Predicts an age for the given name.',
            throttling: {
                usages: 1,
                duration: 60
            },
            args: [
                {
                    key: "name",
                    prompt: "What name would you like to predict the age for?",
                    type: "string"
                }
            ]
        });
    }

    async run(message, { name }) {
        let msg = await message.channel.send("Generating...");

        let { body } = await superagent.get(`https://api.agify.io?name=${name}`);
        if (!{ body }) return message.channel.send("I broke. Please try again.");

        let embed = new MessageEmbed()
            .setColor("RANDOM")
            .setTimestamp()
            .setTitle(`I have estimated that the name '${body.name}' correlates to an age of ${body.age}`
                .replace("null", Math.floor(Math.random() * 101))
                .replace("undefined", Math.floor(Math.random() * 101)));
        message.channel.send({ embed: embed });
        msg.delete();
    }
}