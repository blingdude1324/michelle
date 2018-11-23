const Discord = require("discord.js");
const stats = require("../package.json");

module.exports.run = async (bot, message, args) => {
  let bicon = bot.user.displayAvatarURL;
  let statsembed = new Discord.RichEmbed()
    .setTitle("Bot Statistics")
    .setDescription(stats.description)
    .setColor("#33fede")
    .setThumbnail(bicon)
    .addField("Name", bot.user.username)
    .addField("Created on", bot.user.createdAt)
    .addField("Current version", stats.version)
    .addField("Other Statisatics", "Other things about the bot")
    .addField("Guild count", `${bot.guilds.size}`)
    .addField("Contributions", "Information on the support (financially) for this project")
    .addField("Total contributions", "£20")
    .addField("Top contribution", "JCoDog - £20")
    .setFooter(`Lead developer: ${stats.author}`);
  message.channel.send(statsembed);
}

module.exports.help = {
  name: "stats"
}
