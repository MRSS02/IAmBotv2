module.exports = (message, channel, quantity, author) => {

    quantity++;
    if (quantity > 1 && quantity == Math.floor(quantity) && message.member.permissions.has("MANAGE_MESSAGES")) {

        async function deleteMessages() {
          try {
            let fetched = await channel.messages.fetch({limit: quantity});
            console.log(fetched);
            await message.channel.bulkDelete(fetched);
            if (quantity == 2)
            message.channel.send(`1 message was deleted.`); 
            else message.channel.send(`${quantity - 1} messages were deleted.`); 
          } 
          catch (e) {
             console.log(e);
             message.channel.send(`Something went wrong.`); 
          }
        }
        deleteMessages();
          
    } else {  
      message.channel.send(`${author}, you don't have permission to delete messages.`); 
    }
}