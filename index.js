require("dotenv").config()
const automod = require("./scripts/automod")

const Discord = require("discord.js")
const intents = new Discord.Intents(parseInt(process.env.INTENTS, 10))
const bot = new Discord.Client({intents, partials: ['MESSAGE', 'CHANNEL', 'REACTION'] })
const token = process.env.TOKEN
const badword = process.env.BADWORDS.toLowerCase()
const goodword = process.env.GOODWORDS.toLowerCase()
const guilds = process.env.GUILDS
let rolemessageIDs = {}

//bot runs this everytime it starts
bot.on("ready", () => {
  console.log(`Hey. I was initialized inside ${bot.guilds.cache.size} servers.`);
  let initialact = Math.round(Math.random())
  if (initialact == 0) bot.user.setActivity("Meleeeee!");
  else bot.user.setActivity("DELTARUNE chap. 2");
  //let infra = bot.channels.cache.get("856675093802123294")
  //infra.send("").then(console.log("i sent the test message.")).catch((e) => console.log(e))
})

//bot runs this everytime a message is posted.
bot.on("messageCreate", (message) => {
  content = message.content
  console.log(content)
  channelId = message.channel.id
  guildId = message.guild.id
  automod.evalReact(message, content, channelId, rolemessageIDs)
  if (guildId == guilds) {
   automod.evalDelete(message, content, channelId, badword, goodword)
  }


})

//bit runs this everytime a reaction is added.
bot.on('messageReactionAdd', async (reaction, user) => {
   automod.reactionRolesAdd(reaction, user, rolemessageIDs)
});

//bot runs this everytime a reaction is removed
bot.on('messageReactionRemove', async (reaction, user) => {
    automod.reactionRolesRemove(reaction, user, rolemessageIDs)
});

//This sets the bot online.
bot.login(token)
