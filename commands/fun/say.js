const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');

module.exports = class SayCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'say',
            group: 'fun',
            memberName: 'say',
            description: "Says the user's input via the bot. Note: Abusing this command will result in an instant kick. This involves extensive trolling, trying to bypass things and similar.",
            args: [
                {
                    key: 'text',
                    prompt: 'What would you like the bot to say?',
                    type: 'string'
                }
            ]
        });
    }

    async run(message, { text }) {
        if (message.deletable) message.delete();

        const roleColor = message.guild.me.displayHexColor == "#000000" ? "#ffffff" : message.guild.me.displayHexColor;

        if (text.toLowerCase().split("embed")[0] != undefined) {
            const embed = new MessageEmbed()
                .setColor(roleColor)
                .setDescription(text.replace(text.substring(0, 5), ""))
                .setTimestamp()
                .setFooter(this.client.user.username, this.client.user.displayAvatarURL)
                .setTitle(this.client.user.username + " said:");
            return message.say({ embed: embed });
        } else {
            return message.say(text);
        }
    }
}