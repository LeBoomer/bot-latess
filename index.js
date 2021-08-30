const Discord = require("discord.js");
const Client = new Discord.Client({
    intents: [
        Discord.Intents.FLAGS.GUILDS,
        Discord.Intents.FLAGS.GUILD_MESSAGES,
        Discord.Intents.FLAGS.GUILD_MEMBERS,
    ]
});

const prefix = "£";

Client.on("ready", () => {
    console.log("bot op");
});

// id channel : 881936910048694332

Client.on("guildMemberAdd", member => {
    console.log("un nouveau membre est arrivé !");
    member.guild.channels.cache.get("881936910048694332").send("⚫⚫⚫⚫⚫⚫⚫⚫⚫⚫" + "📌 ARRIVÉ 📌" + "⚫⚫⚫⚫⚫⚫⚫⚫⚫⚫ \n" + "> **Bienvenu(e) à** " + member.displayName + " qui a rejoint la communauté **🪓 LaTess 🪓** " + "**Nous sommes maintenant :** " + member.guild.memberCount + " 🧨\n" + "⚫⚫⚫⚫⚫⚫⚫⚫⚫⚫" + "📌 ARRIVÉ 📌" + "⚫⚫⚫⚫⚫⚫⚫⚫⚫⚫ ");
    member.roles.add("875835526534553610").then(member => {
        console.log("Rôle ajouté avec succès pour : " + member.displayName);
    }).catch(() => {
        console.log("Erreur lors de la distibution du rôle");
    });
});

Client.on("guildMemberRemove", member => {
    console.log("un membre nous a quitté");
    member.guild.channels.cache.get("881936910048694332").send("⚫⚫⚫⚫⚫⚫⚫⚫⚫⚫" + "👋 DÉPART 👋" + "⚫⚫⚫⚫⚫⚫⚫⚫⚫⚫ \n" + "> " + member.displayName + " **nous a quitté...** " + "Nous sommes plus que : " + member.guild.memberCount + " 😪\n" + "⚫⚫⚫⚫⚫⚫⚫⚫⚫⚫" + "👋 DÉPART 👋" + "⚫⚫⚫⚫⚫⚫⚫⚫⚫⚫");
});

Client.on("messageCreate", message => {
    if(message.author.bot) return;

    if(message.member.permissions.has("BAN_MEMBERS")){
        if(message.content.startsWith(prefix + "ban")){
            let mention = message.mentions.members.first();

            if(mention == undefined){
                message.reply("Membre non ou mal mentionné !");
            }
            else {
                if(mention.bannable){
                    mention.ban();
                    message.channel.send(mention.displayName + " A été banni avec succès ! 🛫")
                }
                else {
                    message.reply("⛔ Impossible de bannir ce membre car il dispose des permissions Administrateur ou + ⛔")
                } 
            }
        }
    }
    if(message.member.permissions.has("KICK_MEMBERS")){
        if(message.content.startsWith(prefix + "kick")){
            let mention = message.mentions.members.first();

            if(mention == undefined){
                message.reply("Membre non ou mal mentionné !");
            }
            else {
                if(mention.kickable){
                    mention.kick();
                    message.channel.send(mention.displayName + " A été kick avec succès ! 🛫")
                }
                else {
                    message.reply("⛔ Impossible de kick ce membre car il dispose des permissions Administrateur ou + ⛔")
                } 
            }
        }
    }
    if(message.member.permissions.has("MUTE_MEMBERS")){
        if(message.content.startsWith(prefix + "mute")){
            let mention = message.mentions.members.first();

            if(mention == undefined){
                message.reply("Membre non ou mal mentionné !");
            }
            else {
                mention.roles.add("881059727809847306");
                message.reply(mention.displayName + " A été mute avec succès ! 🔇")
            }
        }
        else if(message.content.startsWith(prefix + "unmute")){
            let mention = message.mentions.members.first();

            if(mention == undefined){
                message.reply("Membre non ou mal mentionné !");
            }
            else {
                mention.roles.remove("881059727809847306");
                message.reply(mention.displayName + " A été unmute avec succès ! 🔇")
            }
        }
        else if(message.content.startsWith(prefix + "tempmute")){
            let mention = message.mentions.members.first();

            if(mention == undefined){
                message.reply("Membre non ou mal mentionné");
            }
            else {
                let args = message.content.split(" ");

                mention.roles.add("881059727809847306");
                setTimeout(function() {
                    mention.roles.remove("881059727809847306")
                    message.channel.send("<@" + mention.id + "> Tu es désormais unmute du serveur !" );
                }, args [2] * 1000);
            }
        }
    }
    if(message.member.permissions.has("MANAGE_MESSAGES")){
        if(message.content.startsWith(prefix + "clear")){
            let args = message.content.split(" ");
            
            if(args[1] == undefined){
                message.reply("🚧 Nombre de message non ou mal défini 🚧");
            }
            else {
                let number = parseInt(args[1]);

                if(isNaN(number)){
                    message.reply("🚧 Nombre de message non ou mal défini 🚧");
                }
                else {
                    message.channel.bulkDelete(number).then(messages => {
                        console.log("Suppression de " + messages.size + " messages réussi ! ✂️");
                    }).catch(err => {
                        console.log("Erreur dans la suppression des messages : " + err);
                    });
                }
            }
        }
    }

    //£help
    if(message.content === prefix + "help"){
        const embed = new Discord.MessageEmbed()
            .setFooter("Afin d'utiliser ce bot sur votre discord, vous êtes prié de contacter son créateur : 🐥>Le Boomer ඞ'#3364")
            .setTimestamp()
            .setImage("https://c.tenor.com/nY0eKCB56mwAAAAM/ziak.gif")
            .addField("__£clear__", "Cette commande permet d'effacer des messages. Pour l'utiliser suffit de faire £clear <le nombre de message que vous voulez supprimer> ")
            .addField("__£kick__", "Cette commande permet de kick / expulser une personne du serveur")
            .addField("__£tempmute__", "Cette commande permet de rendre muet une personne avec une durée déterminée")
            .addField("__£mute__", "Cette commande permet de rendre muet une personne de manière définitive")
            .addField("__£ban__", "Cette commande permet de bannir un membre de mannière définitive")
            .addField("__£help__", "Cette commande permet d'afficher la liste des commandes disponible avec le bot")
            .setThumbnail("https://c.tenor.com/WOFqS9OfD3UAAAAM/ziak-fixette-ziak.gif")
            .setDescription("Ici, vous pourrez voir toutes les commandes disponible avec le bot ⸺⸺⸺⸺⸺⸺")
            .setAuthor("Le Boomer", "https://i.imgur.com/O6Pu3ZD.jpg")
            .setColor("#0099ff")
            .setTitle("Listes des commandes utilisable avec le Bot !");
            
            
        message.channel.send({ embeds: [embed]});
    }
});































































































Client.login("ODgxMDAwMjM3NjcyNTc5MTMy.YSmdaA.4HfYBLh5eZkhgmXxu7v6gczvTVc")