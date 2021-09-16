require("dotenv").config();
const automod = require("./scripts/automod");
const legacy = require("./scripts/legacy"); //legacy, hardcoded code meant to work as reaction roles in a specific server
const commands = require("./scripts/commands");


const Discord = require("discord.js");
const intents = new Discord.Intents(parseInt(process.env.INTENTS, 10));
const bot = new Discord.Client({intents, partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });
const token = process.env.TOKEN;
const badwords = process.env.BADWORDS.toLowerCase().split(",");
const goodwords = process.env.GOODWORDS.toLowerCase().split(",");
const bannedGuilds = process.env.BANNED_GUILDS.split(",");
const prefix = "m!";
let rolemessageIDs = {};

//bot runs this everytime it starts
bot.on("ready", () => {
  console.log(`Hey. I was initialized inside ${bot.guilds.cache.size} servers.`);
  let initialact = Math.round(Math.random());
  if (initialact == 0) bot.user.setActivity("Meleeeee!");
  else bot.user.setActivity("DELTARUNE chap. 2");
  //bot.channels.fetch("").then((channel) => {
  //  channel.messages.fetch("").then((message) => {
  //    message.reply("")
  //  })
  //  }
  //);
})

//bot runs this everytime a message is posted.
bot.on("messageCreate", (message) => {
  content = message.content;
  channelId = message.channel.id;
  guildId = message.guild.id;
  if (!bannedGuilds.includes(guildId)) {
   automod.evalDelete(message, content, badwords, goodwords);
  }
  if (content.substring(0, prefix.length) === prefix) {
    prefixRemoved = content.substring(prefix.length, content.length); 
    commands(message, prefixRemoved);
  }

})

//bit runs this everytime a reaction is added.
bot.on('messageReactionAdd', async (reaction, user) => {
   legacy.reactionRolesAdd(reaction, user, rolemessageIDs); //hardcoded content
});

//bot runs this everytime a reaction is removed
bot.on('messageReactionRemove', async (reaction, user) => {
    legacy.reactionRolesRemove(reaction, user, rolemessageIDs); //hardcoded content
});

//This sets the bot online.
bot.login(token);
 