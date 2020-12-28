const { CommandoClient } = require('discord.js-commando');
const path = require('path');
require('dotenv').config();

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

client.on('error', console.error);

client.login(process.env.TOKEN);