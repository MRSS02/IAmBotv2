
//hardcoded content meant to only work in a specific predetermined server
exports.reactionRolesAdd = async function reactionRolesAdd(reaction, user) {
    if (reaction.partial) {
      try {
          await reaction.fetch();
      } catch (error) {
          console.error('Fetching message failed: ', error);
          return;
      }
    }
    if (!user.bot) {
      const clubbers = reaction.message.guild.roles.cache.find(
        r => r.id === "847271805227106305");
      const noxp = reaction.message.guild.roles.cache.find(
        r => r.id == "848927759446442045");
      const qotd = reaction.message.guild.roles.cache.find(
        r => r.id == "875819529299710033");
      const { guild } = reaction.message
      const member = guild.members.cache.find(member => member.id === user.id);
  
      if (reaction.message.id == "848697560943296542"
      && reaction.emoji.id == "848749688424628224")
      member.roles.add(clubbers); //add role clubers if ids match
      else if (reaction.message.id == 848934354100813845
      && reaction.emoji.id == 848925909858910259)
      member.roles.add(noxp); //add role noexp if ids match
      else if (reaction.message.id == 876219294189510696
      && reaction.emoji.id == 875897926919028747)
      member.roles.add(qotd); //add role qotd if ids match
    }
  }
  
  //hardcoded content meant to only work in a specific predetermined server
  exports.reactionRolesRemove = async function reactionRolesRemove(reaction, user) {
  
    if (reaction.partial) {
      try {
          await reaction.fetch();
      } catch (error) {
          console.error('Fetching message failed: ', error);
          return;
      }
    }
    if (!user.bot) {
      const noxp = reaction.message.guild.roles.cache.find(
        r => r.id == 848927759446442045);
      const qotd = reaction.message.guild.roles.cache.find(
        r => r.id == 875819529299710033);
  
      const { guild } = reaction.message;
  
      const member = guild.members.cache.find(member => member.id === user.id);
  
      if (reaction.message.id == 848934354100813845
      && reaction.emoji.id == 848925909858910259)
      member.roles.remove(noxp); //remove role noexp if ids match
      else if (reaction.message.id == 876219294189510696
      && reaction.emoji.id == 875897926919028747)
      member.roles.remove(qotd); //add role qotd if ids match
  
    }
  }
  