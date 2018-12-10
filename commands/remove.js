const db = require("quick.db");

exports.run = async (bot, message, args) => {

    let prefix = 'a!';

    if(!message.mentions.members.first()) {
        message.channel.send({embed: {
            title: "Ups!",
            color: 0xcc0000,
            description: `Usage: ${prefix}remove [@User] [Amount]`
        }});
        return;
    }

    if(!message.author.id === "263022860551847936"){
        message.channel.send({embed: {
            title: "Ups!",
            color: 0xcc0000,
            description: `You havent enough permissions`
        }});
    }

    let targetMember = message.mentions.members.first();
    let amount = parseInt(args.join(' ').replace(targetMember, ''));

    if(isNaN(amount)){
        message.channel.send({embed: {
            title: "Ups!",
            color: 0xcc0000,
            description: `Usage: ${prefix}remove [@User] [Amount]`
        }});
    }

    let targetBalance = await db.get(`userBalance_${targetMember.id}`);

    if(targetBalance === null) targetBalance = 0;

    if(message.author.id === "263022860551847936"){
        db.subtract(`userBalance_${targetMember.id}`, amount);
        message.channel.send({embed: {
            title: "Removing money!",
            color: 0x0099cc,
            description: `I subtracted **$${amount}** from ${targetMember.user.tag} .`
        }});
        return;
    }
};
