module.exports = function commands(message, content) {
  console.log(content); 
  if (content.includes("bot test"))
   message.reply("i answered");
}