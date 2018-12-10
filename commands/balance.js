const db = require("quick.db");
exports.run = async (Bot, message, args) => {

    let user = message.mentions.users.first() || message.author;
    let balance = await db.get(`userBalance_${user.id}`);
    if(balance === null) balance = 0;


    message.channel.send({embed: {
        title: `${user.tag} Balance`,
        color: 0x66cc00,
        description: `**$${balance}**`
    }});
};