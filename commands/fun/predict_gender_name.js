const { Command } = require('discord.js-commando');
const { MessageEmbed } = require("discord.js");
const superagent = require("superagent");

module.exports = class NameAgePredictCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'namegender',
            group: 'fun',
            memberName: 'namegender',
            description: 'Predicts an gender for the given name.',
            throttling: {
                usages: 1,
                duration: 60
            },
            args: [
                {
                    key: "name",
                    prompt: "What name would you like to predict the gender for?",
                    type: "string"
                }
            ]
        });
    }

    async run(message, { name }) {
        let msg = await message.channel.send("Generating...");

        let { body } = await superagent.get(`https://api.genderize.io?name=${name}`);
        if (!{ body }) return message.channel.send("I broke. Please try again.");

        let embed = new MessageEmbed()
            .setColor("RANDOM")
            .setTimestamp()
            .setTitle(`I have estimated that the name '${body.name}' correlates to an gender of ${body.gender} with ${body.probability.toString()
                .replace("0.", "")}% probability.`
                .replace("null", "turty")
                .replace("undefined", "turty")
                .replace("0%", Math.round(Math.random() * 100) + "%"));
        message.channel.send({ embed: embed });
        msg.delete();
    }
}