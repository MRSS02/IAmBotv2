module.exports = function commands(message, content, guild, channelId, bot) {
  console.log(content); 
  if (content.includes("bot test"))
   message.reply("i answered");
}