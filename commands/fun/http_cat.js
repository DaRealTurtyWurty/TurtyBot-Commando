const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
const superagent = require('superagent');

module.exports = class HttpCatCommand extends Command {
    constructor(client) {
        super(client, {
            name: "httpcat",
            group: "fun",
            memberName: "httpcat",
            description: "Gets a cat image that corresponds with the http response code.",
            throttling: {
                usages: 2,
                duration: 10
            },
            args: [
                {
                    key: 'error_code',
                    prompt: 'What error code would you like to get a response for?',
                    type: "integer",
                    default: 404
                }
            ]
        });
    };

    async run(message, { error_code }) {
        let msg = await message.say("Generating...");

        let worked = true;

        let { body } = await superagent.get(`https://http.cat/${error_code}`).catch(err => {
            console.log("There was an error getting the status code for httpcat: " + err);
            worked = false;
            return message.say(`Invalid Status Code: ${error_code}`).then(m => msg.delete());
        });
        if (worked) {
            if (!body) return message.say("I broke. Please try again.");

            let embed = new MessageEmbed()
                .setColor("RANDOM")
                .setAuthor(`Error code: ${error_code} 🐱`, message.author.displayAvatarURL())
                .setTimestamp()
                .setImage(`https://http.cat/${error_code}`);
            message.channel.send({ embed: embed });
            msg.delete();
        }
    }
}