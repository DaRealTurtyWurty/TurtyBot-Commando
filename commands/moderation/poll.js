//Rn, it only lets you react once.

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

        let pollChannel = message.guild.channels.cache.find(channel => channel.name.includes('poll'));

        if (!pollChannel) {
            message.channel.send("Error: No poll channel found").then(m => m.delete({ timeout: 15000 })); return;
        }

        if (pollChannel != message.channel)
            PollCommand.makeAndModeratePoll(await pollChannel.send(poll), poll);
        else
            PollCommand.makeAndModeratePoll(message, poll);
        message.delete();
    }

    static makeAndModeratePoll(message, cleanedPollMessage = "") {
        let emotes = [];
        const otherRegex = /<:.+?:\d+>/g;
        const unicodeRegex = /\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff]/g;
        emotes = emotes.concat(cleanedPollMessage.match(otherRegex)).concat(cleanedPollMessage.match(unicodeRegex)).filter(emote => emote != null && emote != undefined);
        emotes.sort((a, b) => {
            return cleanedPollMessage.indexOf(a) - cleanedPollMessage.indexOf(b);
        });
        emotes.forEach(emote => {
            message.react(emote);
        });
        const messagestuff = message.createReactionCollector((rection) => emotes.includes(rection.emoji.name));
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