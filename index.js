require("dotenv").config();


const messageCreate = require("./scripts/messageCreate")
const legacy = require("./scripts/actions/legacy"); //legacy, hardcoded code meant to work as reaction roles in a specific server

const Discord = require("discord.js");
const intents = new Discord.Intents(parseInt(process.env.INTENTS, 10));
const bot = new Discord.Client({intents, partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });
const token = process.env.TOKEN;

let rolemessageIDs = {};

function changeStatus() {
  //let initialact = Math.round(Math.random());
  //if (initialact == 0) bot.user.setActivity("Meleeeee!");
  //else bot.user.setActivity("DELTARUNE chap. 2");
  let max = (Math.floor(Math.random() * (10 - 1)) + 1) * (Math.floor(Math.random() * (10 - 2)) + 2) + 1
  let kromer = Math.floor(Math.random() * (max - 2)) + 2
  kromer = (kromer * (kromer - 1) * (kromer - 1)) 
  kromer -= Math.floor(Math.random() * (kromer - Math.floor(kromer / 2))) + Math.floor(kromer / 2)
  kromer += Math.floor(Math.random() * 5) * Math.floor(Math.random() * 5)
  bot.user.setActivity(`${kromer} kromer`);
}

//bot runs this everytime it starts
bot.on("ready", () => {
  console.log(`Hey. I was initialized inside ${bot.guilds.cache.size} servers.`);
  // bot.guilds.fetch("").then((guild) => {
  //   guild.members.fetch().then((members) => {
  //     for (let [key] of members.entries()) {
  //       bot.users.fetch(key).then((user) => {
  //         user.send("**I GAVE YOU EVERYTHING I HAD! MY LIFE ADVICE! I TOLD YOU** [4 Left] **AND ASKED YOU** [Buy] **OR** [Don't Buy]**!** [Spam Mail]").catch(() => console.log("[[Hyperlink blocked]]"))
  //         console.log("I GAVE YOU EVERYTHING I HAD! MY LIFE ADVICE! I TOLD YOU [4 Left] AND ASKED YOU [Buy] OR [Don't Buy]! [Spam Mail]")
  //       }).catch(e => console.log(e))
  //     }
  //   })
  // })
  changeStatus();
  setInterval(changeStatus, 4000)
  //setInterval(changeStatus, 900000);
  // bot.channels.fetch("").then((channel) => channel.send("**DELICIOUS KROMER**"))
  // bot.channels.fetch("").then((channel) => {
  //   channel.messages.fetch("").then((message) => {
  //     message.reply("**GO** [[hyperlink blocked]] **yourself HAHAHAHAHAHAHAHA!**")
  //   }).catch(e => console.log("[[Hyperlink blocked]]\n", e))
  //   }
  // ).catch(e => console.log("[[Hyperlink blocked]]\n", e));
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
 