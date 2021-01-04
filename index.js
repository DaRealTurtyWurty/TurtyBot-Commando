const { CommandoClient } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
const path = require('path');
require('dotenv').config();

const levels = require('discord-xp');
levels.setURL(`mongodb+srv://${process.env.PASSWORD}@turtybot.b8ggp.mongodb.net/test`);

const client = new CommandoClient({
    commandPrefix: process.env.PREFIX,
    owner: process.env.OWNER_ID,
    invite: process.env.INVITE,
    fetchAllMembers: true
});

client.registry
    .registerDefaultTypes()
    .registerGroups([
        ['moderation', 'Commands for moderators to use when moderating'],
        ['fun', 'Miscellaneous fun commands that the average user can use'],
        ['util', 'Utility commands for the user to use in order to obtain information']
    ])
    .registerDefaultGroups()
    .registerDefaultCommands()
    .registerCommandsIn(path.join(__dirname, 'commands'));

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}! (${client.user.id})`);
    client.user.setActivity(`${process.env.PREFIX}help`);
});

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Levelling System
client.on("message", async message => {
    if (!message.guild) return;
    if (message.author.bot) return;

    const randXp = Math.floor(Math.random() * 9) + 1;
    const hasLeveledUp = await levels.appendXp(message.author.id, message.guild.id, randXp);
    if (hasLeveledUp) {
        const user = await levels.fetch(message.author.id, message.guild.id);
        message.channel.send(new MessageEmbed().setDescription(`Pog Champ, ${message.author} leveled up to level: **${user.level}**. Congrats 🎉!`).setColor("RANDOM"));
    }
});

client.on('error', console.error);

client.login(process.env.TOKEN);
