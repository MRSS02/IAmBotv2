require("dotenv").config()
const Discord = require("discord.js")
const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] })
const token = process.env.TOKEN

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
        if (reaction.emoji.id == 848749688424628224) {

            const role = reaction.message.guild.roles.cache.find(r => r.id == 847271805227106305);

            const { guild } = reaction.message

            const member = guild.members.cache.find(member => member.id === user.id);

            if (reaction.message.id == 848697560943296542) {
            member.roles.add(role); console.log("deu bom")
            } else console.log("deu ruim")

        }
    }
});

client.login(token)
