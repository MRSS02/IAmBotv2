const { joinVoiceChannel } = require('@discordjs/voice');

module.exports = (message, content, author, guild) => {

    if (!message.member.voice.channel) {
       return message.channel.send(`${author}, enter a voice channel first.`);
    }
    joinVoiceChannel({
        channelId: message.member.voice.channel.id,
        guildId: message.guild.id,
        adapterCreator: message.guild.voiceAdapterCreator
    })

}