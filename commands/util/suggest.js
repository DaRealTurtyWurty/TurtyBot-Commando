const { Command } = require('discord.js-commando');
const { MessageEmbed } = require("discord.js");
const PouchDB = require("pouchdb");
const suggestions = new PouchDB("suggestions");
var suggestionNo = 0;

let reactionFilter = (reaction, user) => {
    return (reaction.emoji.name == "⬇" || reaction.emoji.name == "⬆");
};

let doubleBooked = (reactionCache, targetID) => {
    try {
        return reactionCache.get("⬇").users.cache.find(user => user.id == targetID) && reactionCache.get("⬆").users.cache.find(user => user.id == targetID);
    } catch (err) {
        return false;
    }
}

module.exports = class SuggestCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'suggest',
            group: 'util',
            memberName: 'suggest',
            description: 'Suggest something for the server or for a video.',
            throttling: {
                usages: 1,
                duration: 120
            },
            guildOnly: true
        });
    }
    
    async run(message) {
        let args = message.content.split(" ");
        if (!args[0]) return message.reply("You need to actually suggest something, dummy!").then(m => m.delete({ timeout: 15000 }));

        let suggestion = message.content.replace(`${process.env.PREFIX}suggest `, "").replace(`${process.env.PREFIX}<@${message.client.user.id}> suggest `, "").replace(`${process.env.PREFIX}<@!${message.client.user.id}> suggest `, "");

        var toAdd = {
            _id: message.id,
            suggestion: suggestion,
            reply: ""
        };

        let suggestionChannel = message.guild.channels.cache.find(channel => channel.name == "suggestions");

        if (!suggestionChannel) { message.channel.send("Error: No suggestion channel found").then(m => m.delete({ timeout: 15000 })); return; }

        suggestions.put(toAdd, function callback(err, result) {
            if (!err) {
                console.log("Suggestion Added: " + suggestion);
            }
        });

        suggestions.allDocs(function (err, response) {
            if (err) {
                return console.log(err);
            }

            suggestionNo = response.rows.length;
        });

        let r = await suggestions.allDocs().then(function (result) {
            return result.total_rows;
        }).catch(function (err) {
            return console.log(err);
        });

        let embed = new MessageEmbed()
            .setColor("RANDOM")
            .setTimestamp()
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setTitle("Suggestion #" + suggestionNo)
            .setDescription(suggestion)
            .setFooter(message.id);

        (await suggestionChannel.send(embed)).then(m => {
            m.react("⬆").then(m.react("⬇")).catch(console.error);
            SuggestCommand.moderateSuggestions(m);
        });

        let completeEmbed = new MessageEmbed()
            .setColor("BLUE")
            .setDescription(`${message.author}, your suggestion has successfully been added to ${suggestionChannel}!`);

        message.channel.send(completeEmbed);


        /*redrawUI = function (elements) {
            for (var i = 0; i < Object.keys(elements).length; i++) {
                message.channel.send("Suggestion ID: " + elements[i].id + ", Suggestion: " + elements[i].doc.suggestion);
            }
        }*/
    }

    //KNOWN WEAKNESS: does not cache who reacted to old messages, just polices old messages
    static moderateSuggestions(message) {
        var filter = message.createReactionCollector(reactionFilter);
        filter.on('collect', (reaction, reactionCollector) => {
            //if double react, and not the bot,
            if (doubleBooked(reaction.message.reactions.cache, reactionCollector.id) && reactionCollector.id != reactionCollector.client.user.id)
                reaction.users.remove(reactionCollector.id);
        });
    }
}