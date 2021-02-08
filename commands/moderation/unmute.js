const { Command } = require('discord.js-commando');
const { getMuteRole } = require('../../functions.js');
const ms = require('ms');

const fs = require('fs');

module.exports = class MuteCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'unmute',
            group: 'moderation',
            memberName: 'unmute',
            description: 'unMutes a member from chatting in the guild.',
            guildOnly: true,
            clientPermissions: ['MANAGE_ROLES', 'MANAGE_MESSAGES'],
            userPermissions: ['MANAGE_ROLES', 'MANAGE_MESSAGES'],
            args: [
                {
                    key: 'user',
                    prompt: 'What user would you like to mute?',
                    type: 'string'
                }
            ]
        });
    }

    getUserByName(message, name) {
        const user = message.members.users.cache.find(user => user.user.username == name) || message.guild.members.cache.get(name) || message.mentions.members.first();
        if (!user) {
            console.log(`Could not find ${name} in the cache`);
            return;
        }
        return user;
    }

    async run(message, { user }) {
        let member = this.getUserByName(message, user);
        if (!fs.existsSync(`./data/mutes/${member.id}.dat`)) {
            console.log(member.id + " was not unmuted since their mute file was missing at unmute time");
            return;
        }
        //for persisting across restarts
        member.roles.remove(getMuteRole(message.guild));
        let theData = fs.readFileSync(`./data/mutes/${member.id}.dat`).toString().split('\n');
        let unmuteTime = parseInt(theData.shift());
        theData.forEach(role => {
            if (role != "")
                try {
                    member.roles.add(role);
                } catch (err) { }
        });        
        fs.unlinkSync(`./data/mutes/${member.id}.dat`);
        return message.reply(`${member} has been unmuted ${ms(unmuteTime - Date.now())} early`);
    }
}