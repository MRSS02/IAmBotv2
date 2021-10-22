const automod = require("./actions/automod");
const createThread = require("./actions/createThread");
const commands = require("./commands");
const badwords = process.env.BADWORDS?.toLowerCase().split(",");
const goodwords = process.env.GOODWORDS?.toLowerCase().split(",");
const bannedGuilds = process.env.BANNED_GUILDS?.split(",");
const prefix = "m!";

module.exports = function messageCreate(message, bot) {
    content = message?.content;
    channel = message?.channel;
    guild = message?.guild;
    if (!bannedGuilds.includes(guild?.id)) 
    automod.evalDelete(message, content, badwords, goodwords);

    let questionChannels = process.env.QUESTION_CHANNELS?.split(",")
    if (questionChannels.includes(channel?.id)) 
        createThread.questions(message, content, guild, channel, bot);

    let dailyMessenger = process.env.DAILY_MESSENGER;
    let dailyCategory = process.env.DAILY_CATEGORY;
    let threadChannels = process.env.THREAD_CHANNELS?.split(",")
   
    
    if (channel?.parent?.id == dailyCategory && message.author?.id == dailyMessenger)
        createThread.daily(message)


    if (threadChannels.includes(channel?.id)) 
        createThread.otherChannels(message)    

    if (content.substring(0, prefix.length) === prefix) {
        content = content.substring(prefix.length, content.length); 
        for (let letter of content) {
        if (letter === " ") content = content.replace(letter, "");
        else break; 
        } // cleans empty space at the left of content after removing prefix
        commands(message, content, guild, channel, bot);
  }
}