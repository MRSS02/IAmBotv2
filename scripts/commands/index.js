module.exports = function commands(message, content) {
  console.log(content);
  if (content.includes("bot pls answer"))
   message.reply("i answered");
}