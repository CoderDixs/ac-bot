console.log('Загрузка...')
const Discord = require('discord.js');
const fs = require('fs');
require('dotenv-flow').config();

const client = new Discord.Client();
const { promisify } = require("util");
const readdir = promisify(fs.readdir);
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

// Load commands Function
function load(dir) { 
  fs.readdir(dir, (err, files) => {
    if (err) console.log(err);
    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if (jsfile.length <= 0) {
      console.log("Нет команд.");
      return;
    }
    jsfile.forEach((f, i) => {
      delete require.cache[require.resolve(`${dir}${f}`)];
      let props = require(`${dir}${f}`);
      console.log(`${dir}${f} команда!`);
      client.commands.set(props.help.name, props);
      props.help.aliases.forEach(alias => {
        client.aliases.set(alias, props.help.name);
      });
    });
  });
}

const loadEvt = async () => {
  // Events
  const evtFiles = await readdir("./events/");
  evtFiles.forEach(file => {
    if (file.split(".").slice(-1)[0] !== "js") return;
    const evtName = file.split(".")[0];
    const event = require(`./events/${file}`);
    console.log(`./events/${file} событие!`);
    client.on(evtName, event.bind(null, client));
    delete require.cache[require.resolve(`./events/${file}`)];
  });
}


load("./commands/information/");
loadEvt();

client.on('ready', function() {  
  setInterval(async () => {
const statuslist = [
  `AquaPorn`,
  `vk.com/servaquacraft`
];
const random = Math.floor(Math.random() * statuslist.length);

try {
  await client.user.setPresence({
    game: {
      name: `${statuslist[random]}`,
      type: 3
      //url: 'https://www.twitch.tv/twitch'
    },
    status: "online"
  });
} catch (error) {
  console.error(error);
}
}, 10000);
});

client.login('NTY2NTg3MzUyMTE0NTI4MjY5.XcDWZg.kuTdHkHbJ0WVbRGCaVXFuZFf3xk');