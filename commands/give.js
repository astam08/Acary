const db = require("quick.db");

exports.run = async (bot, message, args) => {
    let prefix = 'a!';

    if(!message.mentions.members.first()) {
        message.channel.send({embed: {
            title: "Ups!",
            color: 0xcc0000,
            description: `Usage: ${prefix}give [@User] [Amount]`
        }});
        return;
    }

    if(!message.author.id === "320887609536806922"){
        message.channel.send({embed: {
            title: "Ups!",
            color: 0xcc0000,
            description: `You cant this.`
        }});
    }

    let targetMember = message.mentions.members.first();
    let amount = parseInt(args.join(' ').replace(targetMember, ''));

    if(isNaN(amount)){
        message.channel.send({embed: {
            title: "Ups!",
            color: 0xcc0000,
            description: `Usage: ${prefix}give [@User] [Amount]`
        }});
    }

    let targetBalance = await db.get(`userBalance_${targetMember.id}`);

    if(targetBalance === null) targetBalance = 0;

    if(message.author.id === "320887609536806922"){
        db.add(`userBalance_${targetMember.id}`, amount);
        message.channel.send({embed: {
            title: "Giving Money!",
            color: 0x0099cc,
            description: `I give ${targetMember.user.tag} **$${amount}**.`
        }});
    }

};