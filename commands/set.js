const Discord = require("discord.js");

module.exports.run = async (bot, message, args, connection, disbut, useprefix) => {

    await message.delete();

    let result = await connection.query(`SELECT welcomeChannelID, announcementChannelID, systemChannelID FROM guildConfig WHERE guildID = "${message.guild.id}"`).catch(err => console.log(err));
    let results = result[0];
    let welcome = await message.guild.channels.cache.get(results[0].welcomeChannelID);
    let system = await message.guild.channels.cache.get(results[0].systemChannelID);
    let announcement = await message.guild.channels.cache.get(results[0].announcementChannelID);
    let check = message.guild.iconURL();
    let serverIcon;
    if (!check) {
        serverIcon = "https://jconet.xyz/resources/JCN.png";
    } else {
        serverIcon = check;
    };

    const setEmbed = new Discord.MessageEmbed()
    .setAuthor('JCoNet Development', 'https://jconet.xyz/resources/JCN.png', 'https://jconet.xyz')
    .setColor('#f59e2c')
    .setTitle(`Set Guild Channels for ${message.guild.name}`)
    .setDescription("This is the message to configure the channels I use to send system messages, announcements and welcome messages")
    .setThumbnail(serverIcon)
    .addFields(
        {name: "How it works", value: "The channel you ran this command in will become the channel you select using the buttons.", inline: false},
        {name: "Current Welcome Channel", value: `${welcome}`, inline: true},
        {name: "Current System Channel", value: `${system}`, inline: true},
        {name: "Current Announcement Channel", valuie: `${announcement}`, inline: true},
    )
    .setFooter("Select the channel you want to set with the buttons bellow");
    
    const welcbut = new disbut()
    .setStyle("blurple")
    .setLabel("Welcome Channel")
    .setID("welcome");

    const sysbut = new disbut()
    .setStyle("blurple")
    .setLabel("System Channel")
    .setID("System");

    const announcebut = new disbut()
    .setStyle("blurple")
    .setLabel("Announcement Channel")
    .setID("wannoucement");

    message.channel.send({
        buttons:[welcbut, sysbut, announcebut],
        embed: setEmbed
    });
};

module.exports.help = {
    name: "set"
};