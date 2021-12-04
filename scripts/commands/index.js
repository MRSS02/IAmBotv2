const ban = require("./ban.js");
const play = require("./play.js");
const deleteMessages = require("./deleteMessages");

module.exports = (message, content, guild, channel, bot) => {

  let command = content.substring(0, content.includes(" ") ? 
    content.indexOf(" ") : content.length);
  console.log(command); 
  content = content.substring(command.length, content.length);  
  for (let letter of content) {
    if (letter === " ") content = content.replace(letter, "");
    else break; 
  } // cleans empty space at the left of content after removing command
  let author = message.member.nickname ? 
    message.member.nickname : message.author.username; 
  console.log(content)

  switch (command) {
    case "ban":
      ban(message, content, author, guild);  
      break;
    case "play":
      play(message, content, author, guild);
      break;  

    case "delete":
      deleteMessages(message, channel, content, author);
      break;

    default:
      break;
  }


}