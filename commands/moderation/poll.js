const { Command } = require('discord.js-commando');

module.exports = class PollCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'poll',
            group: 'moderation',
            memberName: 'poll',
            description: 'Make a poll',
            guildOnly: true
        });
    }

    async run(message) {
        let args = message.content.split(" ");
        if (!args[0]) return message.reply("You need to actually make a poll, dummy!").then(m => m.delete({ timeout: 15000 }));

        let poll = message.content.replace(`${process.env.PREFIX}poll `, "").replace(`${process.env.PREFIX}<@${message.client.user.id}> poll `, "").replace(`${process.env.PREFIX}<@!${message.client.user.id}> poll `, "");

        PollCommand.makeAndModeratePoll(message, poll);
    }

    static makeAndModeratePoll(message, cleanedPollMessage = "") {
        let emotes = [];
        const otherRegex = /<?:.+?:\d+>/g;
        const unicodeRegex = /\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff]/g;
        emotes = emotes.concat(cleanedPollMessage.match(otherRegex)).concat(cleanedPollMessage.match(unicodeRegex)).filter(emote => emote != null && emote != undefined);
        emotes.sort((a, b) => {
            return cleanedPollMessage.indexOf(a) - cleanedPollMessage.indexOf(b);
        });

        if (emotes.length == 0)
            return;
        if (emotes.length >= 20)
            if (new Date().getTime() < message.timestamp + 1000)
                message.reply("Too many emotes");
            else
                return;

        for (var i = 0; i < emotes.length; i++)
            if (emotes[i].includes('>')) {
                emotes[i] = emotes[i].substring(emotes[i].indexOf(':', 4) + 1, emotes[i].length - 1);
            }

        emotes.forEach(async (emote) => {
            //usually unknown emote causes error, catch it here
            try {
                //this is here so that the bot doesnt spend so much time being ratelimited with reactions. Will fail if:
                //reactions are removed => bot dies => user adds one of the emotes => then bot boots => and user removes reaction
                if (!message.reactions.cache.find(reaction => (reaction.emoji.id != undefined ? reaction.emoji.id : reaction.emoji.name) == emote))
                    try {
                        await message.react(emote);
                    } catch (err) { }
            } catch (err) {
                console.error(err);
            }
        });

        if (emotes.length == 1)//its here to just auto react
            return;

        const messagestuff = message.createReactionCollector((reaction) => {
            return (reaction.emoji.id != undefined ? emotes.includes(reaction.emoji.id) : (emotes.includes(reaction.emoji.name)));
        });
        messagestuff.on('collect', (reaction, reactionCollector) => {
            //if double react, and not the bot,
            const reactions = (reactionCache, targetID) => {
                var out = [];
                try {
                    emotes.forEach(emote => {
                        if (reactionCache.get(emote).users.cache.find(user => user.id == targetID))
                            out.push(emote);
                    });
                } catch (err) { }
                return out;
            }
            if (reactions(reaction.message.reactions.cache, reactionCollector.id).length > 1 && reactionCollector.id != reactionCollector.client.user.id)
                reaction.users.remove(reactionCollector.id);
        });
    }
}