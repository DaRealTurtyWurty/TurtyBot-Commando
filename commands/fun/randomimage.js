const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');

module.exports = class RandomImageCommand extends Command {
    constructor(client) {
        super(client, {
            name: "image",
            aliases: ["randomimg", "randimg", "randomimage", "imgrandom", "imgrand", "imgrng", "rngimg", "rngimage", "imagerng"],
            group: "fun",
            memberName: "image",
            description: "Gets a completely random image.",
            throttling: {
                usages: 2,
                duration: 10
            }
        });
    };

    async run(message) {
        let msg = await message.say("Generating...");

        let embed = new MessageEmbed()
            .setColor("RANDOM")
            .setAuthor(`A random image 🖼`, message.author.displayAvatarURL())
            .setTimestamp()
            .setImage(`https://picsum.photos/id/` + Math.floor(Math.random() * Math.floor(999)).toString() + `/400`);
        message.channel.send({ embed: embed });
        msg.delete();
    }
}