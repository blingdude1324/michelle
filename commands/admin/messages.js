const { MessageButton, MessageActionRow } = require("discord-buttons");

module.exports = {
    name: "messages",
    description: "Enable or disable server messages from the bot!",
    args: false,
    async execute(Discord, bot, connection, message, args, useprefix) {
        await message.delete();
        if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply("Unfortunately, under JCoNet operation policies i am not allowed to let anyone not ranked with permission ADMINISTRATOR to change any of my settings for servers.").then(msg => msg.delete({timeout: 9000})).catch(err => console.error(err));
        let result = await connection.query(`SELECT welcomeEnabled, announcementEnabled, newfeatureEnabled FROM guildConfig WHERE guildID = "${message.guild.id}"`).catch(err => console.error(err));
        let results = result[0];
        let welcome = await results[0].welcomeEnabled;
        let newfeat = await results[0].newfeatureEnabled;
        let announcement = await results[0].announcementEnabled;
        let welcomeState;
        let newfeatState;
        let announcementState;
    
        // set welcome state
        if (welcome == 1) {
            welcomeState = "ENABLED";
        } else {
            welcomeState = "DISABLED";
        };
    
        // set newfeat state
        if (newfeat == 1) {
            newfeatState = "ENABLED";
        } else {
            newfeatState = "DISABLED";
        };
    
        // set announcement state
        if (announcement == 1) {
            announcementState = "ENABLED";
        } else {
            announcementState = "DISABLED";
        };
    
        let check = message.guild.iconURL();
        let serverIcon;
        if (!check) {
            serverIcon = "https://jconet.co.uk/resources/JCN.png";
        } else {
            serverIcon = check;
        };
    
        let setEmbed = new Discord.MessageEmbed()
        .setAuthor('JCoNet Development', 'https://jconet.co.uk/resources/JCN.png', 'https://jconet.co.uk')
        .setColor('#f59e2c')
        .setTitle(`Set messages for ${message.guild.name}`)
        .setDescription("This is the message to configure the messages we send automatically to your server.")
        .setThumbnail(serverIcon)
        .addFields(
            {name: "Welcome Message", value: `${welcomeState}`, inline: true},
            {name: "System Message", value: `${newfeatState}`, inline: true},
            {name: "Announcement Message", value: `${announcementState}`, inline: true},
        )
        .setFooter("Click the buttons bellow to change the states above or close the config. You have to run the command again for each action you take.");
        
        let ewelcbut = new MessageButton()
        .setStyle('green')
        .setLabel("Enable Welcomes")
        .setID("enablewelc");
    
        let enewfeatbut = new MessageButton()
        .setStyle('green')
        .setLabel("Enable New Features")
        .setID("enablenewfeat");
    
        let eannouncebut = new MessageButton()
        .setStyle('green')
        .setLabel("Enable Announcements")
        .setID("enableann");
    
        let dwelcbut = new MessageButton()
        .setStyle('red')
        .setLabel("Disable Welcomes")
        .setID("disablewelc");
    
        let dnewfeatbut = new MessageButton()
        .setStyle('red')
        .setLabel("Disable New Features")
        .setID("disablenewfeat");
    
        let dannouncebut = new MessageButton()
        .setStyle('red')
        .setLabel("Disable Announcements")
        .setID("disableann");
    
        let cancel = new MessageButton()
        .setStyle('blurple')
        .setLabel("CLOSE CONFIG")
        .setID("admincancel");
    
        let enable = "false";
        let disable = "false";
        let emessages = new MessageActionRow();
        let dmessages = new MessageActionRow();
    
        if (welcome == 0 || newfeat == 0 || announcement == 0) {
            enable = "true";
            if (welcome == 0) {
                emessages.addComponent(ewelcbut);
            };
            
            if (newfeat == 0) {
                emessages.addComponent(enewfeatbut);
            };
            
            if (announcement == 0) {
                emessages.addComponent(eannouncebut);
            };
        };
    
        if (welcome == 1 || newfeat == 1 || announcement == 1) {
            disable = "true";
            if (welcome == 1) {
                dmessages.addComponent(dwelcbut);
            };
            
            if (newfeat == 1) {
                dmessages.addComponent(dnewfeatbut);
            };
            
            if (announcement == 1) {
                dmessages.addComponent(dannouncebut);
            };
        };
    
        let embedcontrol = new MessageActionRow()
        .addComponent(cancel);
    
        if (enable == "true" && disable == "false") {
            message.channel.send({
                embed: setEmbed,
                components:[emessages, embedcontrol]
            }).catch(err => console.error(err));
        } else if ( enable == "false" && disable == "true") {
            message.channel.send({
                embed: setEmbed,
                components:[dmessages, embedcontrol]
            }).catch(err => console.error(err));
        } else if ( enable == "true" && disable == "true") {
            message.channel.send({
                embed: setEmbed,
                components:[emessages, dmessages, embedcontrol]
            }).catch(err => console.error(err));
        } else {
            message.channel.send("I ran into an error please report to JCN Development that you have an issue with command 'messages' via the JCoNet Website").then(msg => msg.delete({timeout: 3000})).catch(err => console.error(err));
        };
    },
};