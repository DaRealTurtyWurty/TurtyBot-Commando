const levels = require('discord-xp');
const { MessageEmbed } = require('discord.js');
const { Command } = require('discord.js-commando');
const { getMember } = require('../../functions.js');

module.exports = class RankCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'rank',
            aliases: ["level", "lvl", "whatsmylevel"],
            group: 'util',
            memberName: 'rank',
            description: 'See what level you are.',
            usage: '[@user | id | username]',
            throttling: {
                usages: 1,
                duration: 20
            },
            guildOnly: true,
            args: [
                {
                    key: 'user',
                    prompt: 'What user would you like to see the rank for?',
                    type: 'string',
                    default: ""
                }
            ]
        });
    }

    async run(message, { user }) {
        let member = getMember(this.client, message, user);
        if (!member) message.channel.send(`We are unable to find this user, please try again, or use a different method. Use ${process.env.PREFIX}help rank for more info.`);
        const userA = await levels.fetch(member.id, message.guild.id);
        message.channel.send(new MessageEmbed().setDescription(`${member} is currently level **${userA.level}**!`).setColor("RANDOM"));
    }
}