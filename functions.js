module.exports = {
    getMember(client, message, name) {
        const user = client.users.cache.find(user => user.username == name) || message.guild.members.cache.get(name) || message.mentions.members.first() || message.author;
        if (!user) {
            console.log(`Could not find ${name} in the cache`);
            return;
        }
        return user;
    },

    getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    getMuteRole(guild) {
        let muteRole = guild.roles.cache.find(role => role.name === 'Muted');
        if (!muteRole) {
            muteRole = guild.roles.create({
                data: {
                    name: 'Muted',
                    color: 'GRAY',
                    hoist: true,
                    position: 10,
                    permissions: 0
                },
                reason: 'Created muted role.'
            }).catch(console.error);
        }

        return muteRole;
    }
}