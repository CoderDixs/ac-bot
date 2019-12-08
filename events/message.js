const Discord = require('discord.js');
const cooldowns = new Discord.Collection();
const prefix = '!';

module.exports = async (client, message) => {
    if (message.author.bot) return;
	const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|\\${prefix})\\s*`);
	if (!prefixRegex.test(message.content)) return;

	const [, matchedPrefix] = message.content.match(prefixRegex);
	const args = message.content.slice(matchedPrefix.length).trim().split(/ +/);
    const cmd = args.shift().toLowerCase();
    let command;

    if (!message.content.startsWith(prefix) && message.channel.type === 'dm') return message.channel.send();
	if (new RegExp(`^<@!?${client.user.id}> ?$`, 'gm').test(message.content)) return message.channel.sendEmbed(new Discord.RichEmbed()
    .setFooter(client.user.username, client.user.displayAvatarURL)
    .setColor("#2A5B5F"));

    if (client.commands.has(cmd)){
        command = client.commands.get(cmd);
        console.log(`${message.author.tag}, использовал команду ${command.help.name}, на сервере ${message.guild.name}`)
    } else {
        command = client.commands.get(client.aliases.get(cmd));
        console.log(`${message.author.tag}, использовал команду ${command.help.name}, на сервере ${message.guild.name}`)
    }

    if (command) {
        if (message.author.id !== "291705363097452555" && !command.help.enabled) return message.channel.send(`**${message.author.username}**, извините. Команда была отключена!`);
        }

      if (!cooldowns.has(command.help.name)) {
            cooldowns.set(command.help.name, new Discord.Collection());
        }
    
        const now = Date.now();
        const timestamps = cooldowns.get(command.help.name);
        const cooldownAmount = (command.help.cooldown || 3) * 1000;
    
        if (timestamps.has(message.author.id)) {
            const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
    
            if (now < expirationTime) {
                const timeLeft = (expirationTime - now) / 1000;
                return message.channel.send(`**${message.author.username}**, подождите еще **${timeLeft.toFixed(1)}** секунды, прежде чем повторно использовать \`${command.help.name}\` команду!`);
            }
        }
    
        timestamps.set(message.author.id, now);
        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

    command.run(client, message, args);
};