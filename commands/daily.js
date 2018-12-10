const db = require("quick.db");
const ms = require("parse-ms");

exports.run = async (Bot, message, args) => {

    let coolDown = 8.64e+7;
    let amount = 250;

    let lastDaily = await db.get(`lastDaily_${message.author.id}`);

    if(lastDaily !== null && coolDown - (Date.now() - lastDaily) > 0) {
        let timeObj  = ms(coolDown - (Date.now() - lastDaily));

        message.channel.send({embed: {
            title: "Ups!",
            color: 0xcc0000,
            description: `Make this in **${timeObj.hours}h and ${timeObj.minutes}m**`
        }});
    } else {
        message.channel.send({embed: {
            title: "Ups!",
            description: `Successfully, give you **$${amount}**. `
        }});

        db.set(`lastDaily_${message.author.id}`, Date.now());
        db.add(`userBalance_${message.author.id}`, 250);
    }

};