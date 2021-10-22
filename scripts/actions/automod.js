require("dotenv").config()

exports.evalDelete = async function evalDelete(message, content, badwords, 
  goodwords) {

  if (message.channel.type !== "dm") categoryId = message.channel?.parent?.id;
   else categoryId = null;
  let allowed = process.env.EXCEPTION_CATHEGORIES.split(",")
  function verify() {
    let isBad = {value: false};
    badwords.forEach((word) => {
      if (isBad.value) return; 
       if (content.toLowerCase().includes(word)) {
         isBad.value = true;
         goodwords.forEach((word) => {
          if (!isBad.value) return;
          if (content.toLowerCase().includes(word)) isBad.value = false;
         })
       }
    })

    return isBad.value;
  }
  if (!allowed.includes(categoryId) && verify())
   message.delete().catch(error =>
     console.log(error));

}
