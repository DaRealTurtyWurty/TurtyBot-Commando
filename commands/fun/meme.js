const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
const randomPuppy = require("random-puppy");

module.exports = class MemeCommand extends Command {
    constructor(client) {
        super(client, {
            name: "meme",
            group: "fun",
            memberName: "meme",
            description: "Gets an epic meme from reddit.",
            throttling: {
                usages: 2,
                duration: 10
            }
        });
    };

    async run(message) {
        const subreddits = ["dankmemes", "memes", "me_irl", "ProgrammerHumor"];
        const random = subreddits[Math.floor(Math.random() * subreddits.length)];
        const img = await randomPuppy(random);

        const embed = new MessageEmbed()
            .setColor("RANDOM")
            .setImage(img)
            .setTitle(`From /r/${random}`)
            .setURL(`https://reddit.com/r/${random}`);
        message.channel.send({ embed: embed });
    }
}