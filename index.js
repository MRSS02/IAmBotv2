require("dotenv").config()
const Discord = require("discord.js")
const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] })
const token = process.env.TOKEN

client.on('messageReactionAdd', async (reaction, user) => {
  if (reaction.partial) { //this whole section just checks if the reaction is partial
        try {
            await reaction.fetch(); //fetches reaction because not every reaction is stored in the cache
        } catch (error) {
            console.error('Fetching message failed: ', error);
            return;
        }
    }
    if (!user.bot) {
        if (reaction.emoji.id == 848749688424628224) { //if the user reacted with the right emoji

            const role = reaction.message.guild.roles.cache.find(r => r.id == 847271805227106305); //finds role you want to assign (you could also user .name instead of .id)

            const { guild } = reaction.message //store the guild of the reaction in variable

            const member = guild.members.cache.find(member => member.id === user.id); //find the member who reacted (because user and member are seperate things)

            if (reaction.message.id == 848697560943296542) {
            member.roles.add(role); console.log("deu bom")//assign selected role to member
            } else console.log("deu ruim")

        }
    }
});

client.login(token)
