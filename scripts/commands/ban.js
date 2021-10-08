module.exports = (message, content, author, guild) => {
    
    if (message.member.permissions.has("BAN_MEMBERS")) {
      if (content === "") return message.channel.send("Insert a member to ban.")
      let banned = content.trim();
      console.log(content + " | " + banned)
      guild.members.ban(banned).then(() => message.channel.send(`I banned ${banned}.`))
      .catch(e => {
        message.channel.send(`I couldn't ban ${banned}.`);
        console.log(e);
      })
    } else {  
      message.channel.send(`${auhtor}, you don't have permission to ban members.`); 
    }
}