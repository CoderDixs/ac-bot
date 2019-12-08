module.exports = client => {
    console.log(`${client.user.tag} сейчас в сети:)`);
    console.log(`${client.users.size} челиков:)`);
    console.log(`${client.channels.size} каналов:)`);
    console.log(`${client.guilds.size} серверов:)`);
};