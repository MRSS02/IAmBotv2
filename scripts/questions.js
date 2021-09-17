require("dotenv").config();

exports.dm = function(message, content, bot) {

   message.guild.members.fetch(message.author.id).then((member) => {
  
    let answerRole = process.env.ANSWER_ROLE;
    let prefix = content.substring(0, 8).toLowerCase();
    let notification = `${member.nickname} ${prefix === "question" ? 
    "has a question!" : "tem uma dúvida!"} \n\n${content}`
    
    if (prefix === "pergunta" || prefix === "question" || prefix === "duvida")
      message.guild.roles.fetch(answerRole).then((role) => {
        console.log(role.members);
        for (let [key] of role.members.entries()) {
            console.log(key);
            bot.users.fetch(key).then((user) => {
                console.log(user);
                user.send(notification);
            }).catch(e => console.log(e))
        }
      })
        
   })
   
}