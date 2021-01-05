const { CommandoClient } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
const path = require('path');
const { makeAndModeratePoll } = require('./commands/moderation/poll.js');
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

client.on('guildMemberAdd', member => {
    client.channels.cache.find(channel => channel.name === "💬general").send(`Welcome to the server ${member}! Make sure to read the rules!`);
    member.roles.add(member.guild.roles.cache.find(role => role.name === 'Member'));
});

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

    //watch for polls
    if (message.channel.name.includes("poll")) {
        makeAndModeratePoll(message, message.content);
    }
});

client.on('error', console.error);

client.login(process.env.TOKEN);
