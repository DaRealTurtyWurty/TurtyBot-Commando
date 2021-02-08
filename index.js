const { CommandoClient } = require('discord.js-commando');
const { MessageEmbed, Util } = require('discord.js');
const path = require('path');
const PollCommand = require('./commands/moderation/poll.js');
const SuggestCommand = require('./commands/util/suggest.js');
const StarboardManager = require('./commands/util/starboard.js');
const MuteCommand = require('./commands/moderation/mute.js');

const fs = require('fs');

require('dotenv').config();

const levels = require('discord-xp');
levels.setURL(`mongodb+srv://${process.env.PASSWORD}@turtybot.b8ggp.mongodb.net/test`);

async function fetchChannelMessages(channel) {
    const sum_messages = [];
    let last_id;

    while (true) {
        const options = { limit: 100 };
        if (last_id) {
            options.before = last_id;
        }
        const messages = await channel.messages.fetch(options);
        sum_messages.push(...messages.array());
        if (messages.size != 100) {
            break;
        }
        last_id = messages.last().id;
    }
    return sum_messages;
}

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
    client.channels.cache.each(async (channel) => {
        if (channel.isText() && channel.name.includes('poll')) {
            (await fetchChannelMessages(channel)).forEach(message => {
                channel.messages.fetch(message.id);//this is supposed to cache user reactions as well since bulk getting doesnt do this
                PollCommand.makeAndModeratePoll(message, message.content);
            });
        } else if (channel.isText() && channel.name.includes('suggest'))
            (await fetchChannelMessages(channel)).forEach(message => {
                channel.messages.fetch(message.id);//this is supposed to cache user reactions as well since bulk getting doesnt do this
                SuggestCommand.moderateSuggestions(message);
            });
        else if (channel.isText() && channel.name.includes('showcases')){
            (await fetchChannelMessages(channel)).forEach(message => {
                channel.messages.fetch(message.id);//we need to cache all the reactions here
            });
        } else if (channel.isText() && channel.name.includes('starboard')){
            await fetchChannelMessages(channel);//we only need a basic cache here
        }
    });
    fs.readdirSync("./data/mutes").forEach(file => {
        MuteCommand.applyMute(file.split('.')[0], client);
    });
    fs.readFileSync("./data/starboard_messages.dat").toString().split('\n').forEach(line => {
        if (line != "")
            StarboardManager.trackForReactions(line, client);
    });
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
        PollCommand.makeAndModeratePoll(message, message.content);
    }

    if (message.channel.name.includes("showcases")){
        message.react('⭐');
        StarboardManager.beginTracking(message);
        console.log("showcase message detected");
    }
});

client.on("messageDelete", async (message) => {
    if (message.channel.name.includes('showcases')){
        // Add latency as audit logs aren't instantly updated, adding a higher latency will result in slower logs, but higher accuracy.
        await Util.delayFor(1500);

        // Fetch a couple audit logs than just one as new entries could've been added right after this event was emitted.
        const fetchedLogs = await message.guild.fetchAuditLogs({
            limit: 6,
            type: 'MESSAGE_DELETE'
        }).catch(() => ({
            entries: []
        }));

        const auditEntry = fetchedLogs.entries.find(a =>
            // Small filter function to make use of the little discord provides to narrow down the correct audit entry.
            a.target.id === message.author.id &&
            a.extra.channel.id === message.channel.id /*&&
            // Ignore entries that are older than 20 seconds to reduce false positives.
            Date.now() - a.createdTimestamp < 20000*/
        );

        // If entry exists, grab the user that deleted the message and display username + tag, if none, display 'Unknown'. 
        const executor = auditEntry ? auditEntry.executor : null;

        if (executor){
            if (message.guild.members.cache.find(member => member.id == executor.id).roles.cache.find(role => role.name.toLowerCase() == "administrator"))
                (await StarboardManager.findStarboard(message.guild).messages.fetch(fs.readFileSync('./data/starboard_messages.dat').toString().split('\n').find(line => line.includes(message.id)).split(',')[2])).delete();
        }
        fs.writeFileSync('./data/starboard_messages.dat',
            fs.readFileSync('./data/starboard_messages.dat').toString().split('\n')
            .filter(line => !line.includes(message.id)).join('\n')
        );
        console.log(executor);
    }
})

client.on('error', console.error);

client.login(process.env.TOKEN);
