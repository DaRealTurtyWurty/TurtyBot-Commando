const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');

module.exports = class LoveCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'love',
            group: 'fun',
            memberName: 'love',
            description: 'Compares your love with another user.',
            guildOnly: true,
            args: [
                {
                    key: 'user',
                    prompt: 'What user would you like to love?',
                    type: 'string',
                    default: ""
                }
            ]
        });
    }

    async run(message, { user }) {
        let person = this.getUserByName(message, user);
        if (!person) person = message.guild.members.cache
            .filter(m => m.id !== message.author.id)
            .random();

        const love = Math.random() * 100;
        const loveIndex = Math.floor(love / 10);
        const loveLevel = "💖".repeat(loveIndex) + "💔".repeat(10 - loveIndex);

        const embed = new MessageEmbed()
            .setColor("#ffb6c1")
            .addField(`☁ **${person.displayName || person.username}** loves **${message.member.displayName}** this much:`,
                `💟 ${Math.floor(love)}%\n\n${loveLevel}`);
        message.say({ embed: embed });
    }

    // Credits to jojo2357 for this
    getUserByName(message, name) {
        const user = this.client.users.cache.find(user => user.username == name) || message.guild.members.cache.get(name) || message.mentions.members.first();
        if (!user) {
            console.log(`Could not find ${name} in the cache`);
            return;
        }
        return user;
    }
}
