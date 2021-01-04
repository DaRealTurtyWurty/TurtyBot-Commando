const { Command } = require('discord.js-commando');
const { getMuteRole } = require('../../functions.js');
const ms = require('ms');

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
                    key: 'reason',
                    prompt: 'What is the reason you would like to mute this user for?',
                    type: "string",
                    default: ""
                }
            ]
        });
    }

    async run(message, { user }, { duration }, { reason }) {
        let member = this.getUserByName(message, user);
        if (!member) return message.reply('You must provide a valid member to mute!');

        let allRoles = member.roles.cache;
        let muteRole = getMuteRole(message.guild);

        if (!muteRole) return message.reply('Cannot find the \'Muted\' role!');

        allRoles.forEach(role => {
            if (role.name !== 'everyone') {
                member.roles.remove(role.id);
            }
        });

        member.roles.add(muteRole.id);
        console.log(" " + duration)
        message.channel.send(`@${member.user.tag} has now been muted for ${ms(ms(duration))}`);

        setTimeout(function () {
            allRoles.array.forEach(role => {
                member.roles.add(role.id);
            });
            member.roles.remove(muteRole.id);
            message.channel.send(`@${member.user.tag} has been unmuted.`);
        }, ms(time));
    }

    getUserByName(message, name) {
        const user = this.client.users.cache.find(user => user.username == name) || message.guild.members.cache.get(name) || message.mentions.members.first();
        if (!user) {
            console.log(`Could not find ${name} in the cache`);
            return;
        }
        return user;
    }
}