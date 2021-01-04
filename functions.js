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
    }
}