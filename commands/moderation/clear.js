const { Command } = require('discord.js-commando');

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
        message.delete();
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
        message.channel.messages.fetch().then(messageList => {
            if (multiplier == 1) {
                let deletes = parseInt(args[0]);
                messageList.forEach(msg => {
                    if ((deleteIDs.length == 0 || deleteIDs.includes(msg.author.id)) && deletes-- > 0)
                        msg.delete().catch();
                });
            } else {
                let startTime = new Date().getTime();
                let finishTime = startTime - multiplier * parseInt(args[0]);//.substring(0, args[0].indexOf('d'))
                messageList.forEach(msg => {
                    if (msg.createdTimestamp > finishTime && msg.createdTimestamp < startTime && (deleteIDs.length == 0 || deleteIDs.includes(msg.author.id)))
                        msg.delete().catch();
                });
            }
        });
        message.channel.send("Ok").then(msg => msg.delete({ timeout: 10000 }));
    }
}