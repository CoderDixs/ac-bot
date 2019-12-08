const Discord = require('discord.js');
const httpAsPromised = require('http-as-promised');

exports.run = async (bot, message, args) => {				
  let setting = args[0];
  switch (setting) {
    default: {
      if (!message.channel.nsfw) return message.channel.send(`**${message.author.username}**, вы можете использовать эту команду только в <#617684916112588823>!`)
      let url_vanilla = `https://api.mcsrvstat.us/2/play.aquacraftmc.ru`;
      let vanilla = JSON.parse(await httpAsPromised.get(url_vanilla, { resolve : 'body' }));
      let url_mods = `https://api.mcsrvstat.us/2/play.aquacraftmc.ru:25566`;
      let mods = JSON.parse(await httpAsPromised.get(url_mods, { resolve : 'body' }));

      let embed_vanilla = new Discord.RichEmbed()
        if(vanilla.online) {
          embed_vanilla.setAuthor(`AquaCraft | Ванила ${vanilla.version}`, `https://i.ibb.co/7KcDCsh/530105854960336916.png`)
          embed_vanilla.setDescription(`Играют: \`${vanilla.players.online}\`/\`${vanilla.players.max}\``) 
          embed_vanilla.addField(`Сейчас онлайн`, `${vanilla.players.list && vanilla.players.list.length ? vanilla.players.list.join(' **|** ') : 'Нету'}`, true)
          embed_vanilla.setFooter(`play.aquacraftmc.ru`, message.author.avatarURL)
          embed_vanilla.setColor('BLUE'); 
        } else {
          embed_vanilla.setAuthor(`AquaCraft | Ванила ${vanilla.version ? vanilla.version : 'офлайн'}`, 'https://i.ibb.co/p48fHCh/530109111040344096.png')
          embed_vanilla.setFooter(`play.aquacraftmc.ru`, message.author.avatarURL)
          embed_vanilla.setColor('RED'); 
        }

        await message.channel.send(embed_vanilla);

      let embed_mods = new Discord.RichEmbed()
      if(mods.online) {
        embed_mods.setAuthor(`AquaCraft | Моды 1.7.10`, `https://i.ibb.co/7KcDCsh/530105854960336916.png`)
        embed_mods.setDescription(`Играют: \`${mods.players.online}\`/\`${mods.players.max}\``) 
        embed_mods.addField(`Сейчас онлайн`, `${mods.players.list && mods.players.list.length ? mods.players.list.join(' **|** ') : 'Нету'}`, true)
        embed_mods.setFooter(`play.aquacraftmc.ru:25566`, message.author.avatarURL)
        embed_mods.setColor('BLUE'); 
      } else {
        embed_mods.setAuthor(`AquaCraft | Моды ${mods.version ? mods.version : 'офлайн'}`, `https://i.ibb.co/p48fHCh/530109111040344096.png`)
        embed_mods.setFooter(`play.aquacraftmc.ru:25566`, message.author.avatarURL)
        embed_mods.setColor('RED'); 
      }

      await message.channel.send(embed_mods);
      break;
    }
  }
}

exports.help = {
	name: 'server',
	aliases: ['сервер', 'серв', 'ванила', 'моды', 'serv', 'mods', 'vanilla'],
	description: "",
	usage: "",
	cooldown: 5,
	enabled: true
};