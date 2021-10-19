require("dotenv").config();


const messageCreate = require("./scripts/messageCreate")
const legacy = require("./scripts/legacy"); //legacy, hardcoded code meant to work as reaction roles in a specific server

const Discord = require("discord.js");
const intents = new Discord.Intents(parseInt(process.env.INTENTS, 10));
const bot = new Discord.Client({intents, partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });
const token = process.env.TOKEN;

let rolemessageIDs = {};

function changeStatus() {
  let initialact = Math.round(Math.random());
  if (initialact == 0) bot.user.setActivity("Meleeeee!");
  else bot.user.setActivity("DELTARUNE chap. 2");
}

//bot runs this everytime it starts
bot.on("ready", () => {
  console.log(`Hey. I was initialized inside ${bot.guilds.cache.size} servers.`);
  changeStatus();
  setInterval(changeStatus, 900000);
  //bot.channels.fetch("").then((channel) => {
  //  channel.messages.fetch("").then((message) => {
  //    message.reply("")
  //  })
  //  }
  //);
})

//bot runs this everytime a message is posted.
bot.on("messageCreate", (message) => { messageCreate(message, bot) })

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
 