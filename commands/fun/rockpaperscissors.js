const { MessageEmbed } = require('discord.js');
const { Command } = require('discord.js-commando');
const choose = ['🗻', '📰', '✂'];

module.exports = class RockPaperScissorsCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'rps',
            group: 'fun',
            memberName: 'rps',
            description: 'Rock, Paper, Scissors game. React to the emojis to play.',
            throttling: {
                usages: 1,
                duration: 60
            }
        });
    }

    async run(message) {
        const embed = new MessageEmbed()
            .setColor("#ffffff")
            .setFooter(message.guild.me.displayName, this.client.user.displayAvatarURL)
            .setDescription("Add a reaction to one of these emojis to play the game.")
            .setTimestamp();

        const m = await message.say(embed);
        const reacted = await promptMessage(m, message.author, 30, choose);
        const botChoice = choose[Math.floor(Math.random() * choose.length)];
        const result = await getResult(reacted, botChoice);
        await m.reactions.removeAll();
        embed.setDescription("")
            .addField(result, `${reacted} vs ${botChoice}`);

        m.edit(embed);

        function getResult(me, clientChosen) {
            if ((me == "🗻" && clientChosen == "✂") || (me == "📰" && clientChosen == "🗻") || (me == "✂" && clientChosen == "📰")) return "You won!";
            else if (me == clientChosen) return "It's a tie!";
            else return "You lost!";
        }

        async function promptMessage(message, author, time, validReactions) {
            time *= 1000;

            for (const reaction of validReactions) await message.react(reaction);

            const filter = (reaction, user) => validReactions.includes(reaction.emoji.name) && user.id == author.id;

            return message
                .awaitReactions(filter, { max: 1, time: time })
                .then(collected => collected.first() && collected.first().emoji.name);
        }
    }
}