require("dotenv").config()
const Discord = require("discord.js")
const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] })
const token = process.env.TOKEN
const badword = process.env.BADWORDS.toLowerCase()
const goodword = process.env.GOODWORDS.toLowerCase()

client.on("message", (message) => {
  content = message.content
  channelId = message.channel.id
  if (message.channel.type !== "dm") categoryId = message.channel.parent.id
   else categoryId = null
  if(content.includes("no xp role") && channelId == 848929953641791555)
   message.react("<:noXP:848925909858910259>")
  if (content.toLowerCase().includes(badword)
  && !content.toLowerCase().includes(goodword) &&
  categoryId != 847264659455082527)
   message.delete().catch(error =>
     console.log(error))


})

client.on('messageReactionAdd', async (reaction, user) => {
    if (reaction.partial) {
      try {
          await reaction.fetch();
      } catch (error) {
          console.error('Fetching message failed: ', error);
          return;
      }
    }
    if (!user.bot) {
      const clubbers = reaction.message.guild.roles.cache.find(r => r.id == 847271805227106305);
      const noxp = reaction.message.guild.roles.cache.find(r => r.id == 848927759446442045);

      const { guild } = reaction.message

      const member = guild.members.cache.find(member => member.id === user.id);

      if (reaction.message.id == 848697560943296542
      && reaction.emoji.id == 848749688424628224)
      member.roles.add(clubbers); //add role clubers if ids match
      else if (reaction.message.id == 848934354100813845
      && reaction.emoji.id == 848925909858910259)
      member.roles.add(noxp) //add role noexp if ids match
    }
});

client.on('messageReactionRemove', async (reaction, user) => {
    if (reaction.partial) {
      try {
          await reaction.fetch();
      } catch (error) {
          console.error('Fetching message failed: ', error);
          return;
      }
    }
    if (!user.bot) {
      const noxp = reaction.message.guild.roles.cache.find(r => r.id == 848927759446442045);

      const { guild } = reaction.message

      const member = guild.members.cache.find(member => member.id === user.id);

      if (reaction.message.id == 848934354100813845
      && reaction.emoji.id == 848925909858910259)
      member.roles.remove(noxp) //remove role noexp if ids match
    }
});

client.login(token)
