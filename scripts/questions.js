require("dotenv").config();
const { MessageEmbed } = require('discord.js');

exports.dm = function(message, content, guild, channel, bot) {
   
   if (content.includes("?"))
   guild.members.fetch(message.author.id).then((member) => {
  

        let answerRole = process.env.ANSWER_ROLE;
    
        if (message.author.bot) return;
        message.startThread({
            name: `${content.length > 97 ? content.substring(0, 97) + "..." : content}`,
            autoArchiveDuration: 1440,
            reason: "",
        }).then((thread) => {

            console.log(thread);
            let notification = new MessageEmbed()
            .setColor("#83c8eb")
            .setAuthor(`${member.nickname} tem uma dúvida!`,
            message.author.displayAvatarURL(), 
            message.url)
            .addField(`Em ${guild.name}`, `<#${channel.id}>`, true)
            .addField(`\u200b`, `\u200b`, true)
            .addField("\u200b", 
            `${content.length > 450 ? content.substring(0, 450) + "..." : content}`,
             false)
            .addField("\u200b", `[Ir para a mensagem!](${message.url})`, false)
            guild.roles.fetch(answerRole).then((role) => {
                
                for (let [key] of role?.members.entries()) {
                    bot.users.fetch(key).then((user) => {
                        if (message.author.id === user.id) return;
                        user.send({embeds:[notification]});
                    }).catch(e => console.log(e))
                }
            }).catch(e => console.log(e));  
            
            
        }).catch(e => console.log(e));
            
    }).catch(e => console.log(e));
   
}