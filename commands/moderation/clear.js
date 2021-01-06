/*
Authored by jojo2357
Deletes messages in this channel based on many options.
Notes: 
****************************************************************
Deleting a specific number of messages works mostly as intended

Deleting messages after timestamp works as intended a code review
would be hype to tidy it all up and to add more customized time
conversion
****************************************************************
*/

const { Command } = require('discord.js-commando');

let markedDelete = [];

function addDelete(messageID) {
    markedDelete.push(messageID);
    return markedDelete.length >= 100;
}

function deleteSavedMessages(channel) {
    if (markedDelete.length == 0)
        return;
    if (markedDelete.length == 1)
        channel.messages.cache.find(msg => msg.id == markedDelete[0]).delete().catch();
    else if (markedDelete.length > 1)
        channel.bulkDelete(markedDelete.slice(0, 100)).catch();
    markedDelete.splice(0, Math.min(100, markedDelete.length));
}

//use this to get around that pesky 100 message limit
async function getLotsaMessages(channel, limit) {
    const sum_messages = [];
    let last_id;

    while (true) {
        const options = { limit: 100 };
        if (last_id) {
            options.before = last_id;
        }

        const messages = await channel.messages.fetch(options);
        sum_messages.push(...messages.array());
        last_id = messages.last().id;

        if (messages.size != 100 || sum_messages >= limit) {
            break;
        }
    }

    return sum_messages;
}

async function getLotsaMessagesAfter(channel, time) {
    const sum_messages = [];
    let last_id;

    do {
        const options = { limit: 100 };
        if (last_id) {
            options.before = last_id;
        }

        const messages = await channel.messages.fetch(options);
        sum_messages.push(...messages.array());
        last_id = messages.last().id;

        if (messages.size != 100) {
            break;
        }
    } while (snowflakeToTimestamp(last_id) > time);

    return sum_messages;
}

function snowflakeToTimestamp(snowflake) {
    return (parseInt(snowflake) >> 22) + 142007400000;
}

//ms to whatever. Note 1 will signify that the given number of messages are to be deleted
const timeConversions = {
    "second": 1000, "minute": 60000, "hour": 3600000, "day": 86400000, "message": 1,
    "seconds": 1000, "minutes": 60000, "hours": 3600000, "days": 86400000, "messages": 1
};
Object.freeze(timeConversions);

module.exports = class ClearCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'clear',
            group: 'moderation',
            memberName: 'clear',
            description: 'Clear message history in this channel',
            clientPermissions: ['MANAGE_MESSAGES'],
            userPermissions: ['MANAGE_MESSAGES'],
            args: [
                {
                    key: 'amount',
                    prompt: 'How much to clear?',
                    type: 'integer'
                },
                {
                    key: 'unit',
                    prompt: 'Can be messages, seconds, hours, minutes, days',
                    type: 'string',
                    default: 'hours',
                },
                {
                    key: 'users',
                    prompt: "Mention users/user id's",
                    type: 'string',
                    default: '',
                }
            ],
            guildOnly: true
        });
    }

    async run(message) {
        if (message.deletable) {
            message.delete();
        }

        let args = message.content.toLowerCase().replace(`${process.env.PREFIX}clear `, "").replace(`<@${process.env.PREFIX}${message.client.user.id}> clear `, "").split(" ");
        if (!args[0] || Number.isNaN(parseInt(args[0])))
            return;
        let multiplier = timeConversions.hour;//Default ms => hours
        let deleteIDs = [];
        if (args.length > 2) {
            for (var i = 2; i < args.length; i++) {
                deleteIDs.push(args[i].substring((args[i].includes('<') ? args[i].includes('!') ? 3 : 2 : 0), args[i].length + (args[i].includes('>') ? -1 : 0)));
            }
        }
        if (args.length > 1) {
            multiplier = timeConversions[args[1].toLowerCase()];
            if (multiplier == undefined)
                return message.say(args[1] + " is not a valid unit of time");
        }
        let startTime = new Date().getTime();
        let twoWeeksAgo = startTime - 14 * timeConversions.days;
        if (multiplier == 1)
            getLotsaMessages(message.channel, parseInt(args[0])).then(messageList => {
                let deletes = parseInt(args[0]);//keep doing this just in case cache is over zealous
                messageList.forEach(msg => {
                    if (((deleteIDs.length == 0 || deleteIDs.includes(msg.author.id))) && deletes-- > 0)
                        if (msg.createdTimestamp > twoWeeksAgo)//UNTESTED that the special case will work
                            if (addDelete(msg.id))
                                deleteSavedMessages(msg.channel);
                            else;
                        else {
                            msg.delete().catch();
                        }
                });
                deleteSavedMessages(message.channel);
            });
        else {
            let finishTime = startTime - multiplier * parseInt(args[0]);
            getLotsaMessagesAfter(message.channel, finishTime).then(messageList => {
                messageList.forEach(msg => {
                    if (msg.createdTimestamp > finishTime && msg.createdTimestamp < startTime && (deleteIDs.length == 0 || deleteIDs.includes(msg.author.id)))
                        if (msg.createdTimestamp > twoWeeksAgo)//UNTESTED that the special case will work
                            if (addDelete(msg.id))
                                deleteSavedMessages(msg.channel);
                            else;
                        else {
                            msg.delete().catch();
                        }
                });
                deleteSavedMessages(message.channel);
            });
        }
    }
}