const Discord = require('discord.js');
const db = require('quick.db');
const bot = new Discord.Client({disableEveryone: true});

bot.on('message', async message => {


  let msg = message.content.toUpperCase();
  let prefix = '_c';
  let sender = message.author;
  const args = message.content.slice(prefix.length).split(/ +/g)
  const command = args.shift().toLowerCase()

  if(sender.bot) return;
  if(!message.content.startsWith(prefix)) return;


  try {
    let commandFile = require(`./commands/${command}.js`);
    commandFile.run(bot, message, args);
  } catch (e) {

    console.log(e.message);


  }
});
bot.on('ready', () => {


  var status = [
    `Digunakan ${bot.guilds.size} Server`,
    `Total ${bot.users.size} Member`,
    `Total ${bot.emojis.size} Emoji`,
    `Total ${bot.channels.size} Channel`,
    `Total Pendukung ${bot.users.size}`,
    `Ansel Official`,
    `_c`];

  console.log(`Eingeloggt als ${bot.user.tag} und ist auf ${bot.guilds.size} Server`)

  setInterval(function() {

    var random = Math.floor(Math.random()*(status.length-0+1)+0);

    bot.user.setActivity(status[random]);
    }, 5000);
});

bot.login("NTYxOTgzMzg4ODY1NjU4ODgw.XMCSUg.SUdyBt2w91Bno3WGSbePaIa9iwc");
