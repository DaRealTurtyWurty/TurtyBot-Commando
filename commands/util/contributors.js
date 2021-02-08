const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');

const contributorsEmbed = new MessageEmbed();
contributorsEmbed.setTitle("Special thanks to all these helpers:")
.addField("TurtyWurty", "https://github.com/DaRealTurtyWurty")
.addField("jojo2357", "https://github.com/jojo2357")
.addField("AG6", "https://github.com/zAG6z")
.addField("LoneWolf", "https://github.com/BHLoneWolf0")
.setColor("RANDOM");

module.exports = class ContributorCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'contributors',
            group: 'util',
            memberName: 'contributors',
            description: 'See the contributors for this bot.',
            guildOnly: false
        });
    }

    async run(message) {
        message.channel.send(contributorsEmbed);
    }
}