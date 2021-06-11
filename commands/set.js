const Discord = require("discord.js");
const { MessageButton, MessageActionRow } = require("discord-buttons");

module.exports.run = async (bot, message, args, connection, useprefix) => {

    await message.delete();
    if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply("Unfortunately, under JCoNet operation policies i am not allowed to let anyone not ranked with permission ADMINISTRATOR to change any of my settings for servers.").then(msg => msg.delete({timeout: 9000})).catch(err => console.log(err));
    let result = await connection.query(`SELECT welcomeChannelID, systemChannelID, announcementChannelID FROM guildConfig WHERE guildID = "${message.guild.id}"`).catch(err => console.log(err));
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

    let setEmbed = new Discord.MessageEmbed()
    .setAuthor('JCoNet Development', 'https://jconet.xyz/resources/JCN.png', 'https://jconet.xyz')
    .setColor('#f59e2c')
    .setTitle(`Set Guild Channels for ${message.guild.name}`)
    .setDescription("This is the message to configure the channels I use to send system messages, announcements and welcome messages")
    .setThumbnail(serverIcon)
    .addFields(
        {name: "How it works", value: "The channel you ran this command in will become the channel you select using the buttons.", inline: false},
        {name: "Current Welcome Channel", value: `${welcome}`, inline: true},
        {name: "Current System Channel", value: `${system}`, inline: true},
        {name: "Current Announcement Channel", value: `${announcement}`, inline: true},
    )
    .setFooter("Select the channel you want to set with the buttons bellow");
    
    let welcbut = new MessageButton()
    .setStyle('blurple')
    .setLabel("Welcome Channel")
    .setID("welcome");

    let sysbut = new MessageButton()
    .setStyle('blurple')
    .setLabel("System Channel")
    .setID("system");

    let announcebut = new MessageButton()
    .setStyle('blurple')
    .setLabel("Announcement Channel")
    .setID("annoucement");

    let cancel = new MessageButton()
    .setStyle('red')
    .setLabel("CANCEL")
    .setID("admincancel");

    let channels = new MessageActionRow()
    .addComponent(welcbut)
    .addComponent(sysbut)
    .addComponent(announcebut);

    let embedcontrol = new MessageActionRow()
    .addComponent(cancel);

    message.channel.send({
        embed: setEmbed,
        components:[channels, embedcontrol]
    }).catch(err => console.log(err));
};

module.exports.help = {
    name: "set"
};