const { Command } = require('discord.js-commando');
const { getMuteRole } = require('../../functions.js');
const ms = require('ms');

const fs = require('fs');

//ms to whatever. Note 1 will signify that the given number of messages are to be deleted
const timeConversions = {
    "s": 1000, "m": 60000, "h": 3600000, "d": 86400000,
    "second": 1000, "minute": 60000, "hour": 3600000, "day": 86400000,
    "seconds": 1000, "minutes": 60000, "hours": 3600000, "days": 86400000,
};
Object.freeze(timeConversions);

module.exports = class MuteCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'mute',
            group: 'moderation',
            memberName: 'mute',
            description: 'Mutes a member from chatting in the guild.',
            guildOnly: true,
            clientPermissions: ['MANAGE_ROLES', 'MANAGE_MESSAGES'],
            userPermissions: ['MANAGE_ROLES', 'MANAGE_MESSAGES'],
            args: [
                {
                    key: 'user',
                    prompt: 'What user would you like to mute?',
                    type: 'string'
                },

                {
                    key: 'duration',
                    prompt: 'What is the duration that you would like to mute this user for?',
                    type: 'string'
                },

                {
                    key: 'duration_unit',
                    prompt: 'time unit? (sec, min, hour, etc)',
                    type: 'string',
                    default: 'hour'
                },

                {
                    key: 'reason',
                    prompt: 'What is the reason you would like to mute this user for?',
                    type: "string",
                    default: ""
                }
            ]
        });
    }

    async run(message, { user, duration, duration_unit, reason }) {
        if (!timeConversions[duration_unit])
            return message.reply("Invalid time");
        let time = parseInt(duration) * timeConversions[duration_unit];
        let member = this.getUserByName(message, user);
        if (!member) return message.reply('You must provide a valid member to mute!');

        let allRoles = member.roles.cache;
        allRoles.delete('@everyone');
        let muteRole = getMuteRole(message.guild);

        if (!muteRole) return message.reply('Cannot find the \'Muted\' role!');

        if (allRoles.has(muteRole.id))
            return message.reply('They are already muted!');

        //creates new ban file
        fs.writeFileSync(`./data/mutes/${member.id}.dat`, Date.now() + time);

        allRoles.forEach(role => {
            if (role.name !== '@everyone') {
                fs.appendFileSync(`./data/mutes/${member.id}.dat`, '\n' + role.id);
                member.roles.remove(role.id);
            }
        });

        member.roles.add(muteRole.id);
        message.channel.send(`${member} has now been muted for ${duration} ${duration_unit}`);

        MuteCommand.applyMute(member.id, this.client);
    }

    getUserByName(message, name) {
        const user = message.guild.members.cache.find(user => user.user.username == name) || message.guild.members.cache.get(name) || message.mentions.members.first();
        if (!user) {
            console.log(`Could not find ${name} in the cache`);
            return;
        }
        return user;
    }

    static applyMute(mutedID, client) {
        let theData = fs.readFileSync(`./data/mutes/${mutedID}.dat`).toString().split('\n');
        let muteTime = parseInt(theData.shift()) - Date.now();
        let aRoleTheyLost = theData[0];
        const mutedGuild = client.guilds.cache.find(guild => guild.roles.cache.find(role => role.id == aRoleTheyLost));
        if (!mutedGuild)
            return;
        let member = mutedGuild.members.cache.find(member => member.id == mutedID);
        if (!member)
            return;
        console.log("Unmuting in " + muteTime);
        setTimeout(function () {
            if (member) {
                if (!fs.existsSync(`./data/mutes/${mutedID}.dat`)) {
                    console.log(mutedID + " was not unmuted since their mute file was missing at unmute time");
                    return;
                }
                //for persisting across restarts
                member.roles.remove(getMuteRole(mutedGuild));
                theData.forEach(role => {
                    if (role != "")
                        try {
                            member.roles.add(role);
                        } catch (err) { }
                });
                console.log(`@${member} has been unmuted.`);
                fs.unlinkSync(`./data/mutes/${mutedID}.dat`);
            } else {
                // Add warn
            }
        }, muteTime)//.catch(err => console.error(err));
    }
}