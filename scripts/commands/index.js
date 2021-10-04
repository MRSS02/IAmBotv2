module.exports = function commands(message, content, guild, channelId, bot) {


  if (content.includes("ban")) {
    if (content.substring(content.indexOf("ban") - 1, content.indexOf("ban")) != "\\" 
    && message.member.permissions.has("BAN_MEMBERS")) {
      let banned = content.substring(content.indexOf("bye") + 3).trim();
      guild.members.ban(banned).then(() => message.channel.send(`I banned ${banned}.`))
      .catch(e => {
        message.channel.send(`I coun't ban ${banned}.`);
        console.log(e);
      })
    }
  }

}