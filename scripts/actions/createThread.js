require("dotenv").config();
const { MessageEmbed } = require('discord.js');

exports.questions = function(message, content, guild, channel, bot) {
   
   if (content.includes("?"))
   guild.members.fetch(message.author.id).then((member) => {
  

        let answerRole = process.env.ANSWER_ROLE;
    
        if (message.author.bot) return;
        message.startThread({
            name: `${content.length > 97 ? content.substring(0, 97) + "..." : content}`,
            autoArchiveDuration: 1440,
            reason: "",
        }).then(() => {
        
            console.log(message.author.username);
            let name = member.nickname ? member.nickname : message.author.username; 
            let notification = new MessageEmbed()
            .setColor("#83c8eb")
            .setAuthor(`${name} tem uma dúvida!`,
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

exports.daily = function(message) {  

    if (!message.embed ) return;
        
        console.log(message.embed);
        let date = new Date().toJSON().slice(0,10).replace(/-/g,'/');
        console.log(date);
        message.startThread({
            name: `Daily ${date}`,
            autoArchiveDuration: 1440,
            reason: "",
        }).catch(e => console.log(e));
            
}

exports.otherChannels = function(message) {

    let content = message.content; 
        
        let title = content.includes("-") ? 
          content.substring(content.indexOf("-") + 1, content.indexOf("\n")) : content; 
        message.startThread({
            name: `${title}`,
            autoArchiveDuration: 1440,
            reason: "",
        }).catch(e => console.log(e)); 

}