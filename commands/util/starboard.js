const fs = require('fs');
const { MessageEmbed } = require('discord.js');

let stars = [
    "⭐",
    "star"
];

let stars_to_get_on_starboard = 5;

let starThresholds = [
    [stars_to_get_on_starboard, "⭐"],
    [10, "🌟"],
    [15, "✨"],
    [20, "💫"],
    [25, "🌠"],
    [30, "🤩"]
];

function getStar(reactions){
    for (var i = starThresholds.length - 1; i >= 0; i--)
        if (starThresholds[i][0] <= reactions)
            return starThresholds[i][1];
    return "";
}

module.exports = {
    beginTracking(message) {
        fs.appendFileSync('./data/starboard_messages.dat', '\n' + message.channel.id + "," + message.id + "," + null)
        this.trackForReactions(message.channel.id + "," + message.id + "," + null, message.client);
    },

    async createMessage(message, reactions){
        let starboard = this.findStarboard(message.guild);
        let embed = new MessageEmbed()
        .setAuthor(`${message.author.username}`, `${message.author.avatarURL({ format: "png", size: 128 })}`)
        .setDescription(message.content)
        .addField("Where'd it come from?", `[Show me!](https://discordapp.com/channels/${message.guild.id}/${message.channel.id}/${message.id})`)
        .setFooter(message.id)
        .setTimestamp()
        .setColor("YELLOW");
        if (message.attachments.size > 0)
            embed = embed.setImage(message.attachments.array()[0].url);
        return await starboard.send(getStar(reactions) + " **" + reactions + "**", embed)
    },

    async trackForReactions(data, client) {
        try{//debug on corrupted starboard messages file
            data = data.split(',');
            let hasChild = false;
            if (data[2] != "null")
                hasChild = true;
            let showcaseChannel = client.channels.cache.find(channel => channel.id == data[0]);
            let showcaseMessage = await showcaseChannel.messages.fetch(data[1]);
            let starboardMessage = hasChild ? await this.findStarboard(showcaseChannel.guild).messages.fetch(data[2]):null;
            const messagestuff = showcaseMessage.createReactionCollector((reaction) => {
                return stars.includes(reaction.emoji.name);
            }, { dispose: true});
            messagestuff.on('collect', (reaction, reactionCollector) => {
                if (reaction.count >= starThresholds[0][0] && starboardMessage == null)
                    this.createMessage(showcaseMessage, reaction.count).then(msg => {
                        fs.writeFileSync('./data/starboard_messages.dat', fs.readFileSync('./data/starboard_messages.dat').toString().split('\n').filter(line => !line.includes(data[0])));
                        fs.appendFileSync('./data/starboard_messages.dat', '\n' + showcaseMessage.channel.id + "," + showcaseMessage.id + "," + msg.id);
                        starboardMessage = msg;
                    });
                else if (reaction.count > starThresholds[0][0])
                    starboardMessage.edit(getStar(reaction.count) + " **" + reaction.count + "**");
            });
            messagestuff.on('remove', (reaction, reactionCollector) => {
                if (reaction.count == starThresholds[0][0] - 1 && starboardMessage != null){
                    starboardMessage.delete();
                    fs.writeFileSync('./data/starboard_messages.dat', fs.readFileSync('./data/starboard_messages.dat').toString().split('\n').filter(line => !line.includes(data[0])));
                    fs.appendFileSync('./data/starboard_messages.dat', '\n' + showcaseMessage.channel.id + "," + showcaseMessage.id + "," + null);
                    starboardMessage = null
                }else if (reaction.count > starThresholds[0][0])
                    starboardMessage.edit(getStar(reaction.count) + " **" + reaction.count + "**");
            });
            showcaseMessage.react("⭐");
        }catch (err){}
    },

    findStarboard(guild) {
        return guild.channels.cache.find(channel => channel.name.toLowerCase().includes("starboard"));
    }
}