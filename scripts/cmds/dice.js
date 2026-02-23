const fs = require("fs");
const path = "users.json";

module.exports.config = {
    name: "dice",
    cooldowns: 5
};

module.exports.onStart = async function({ api, event }) {

    let users = JSON.parse(fs.readFileSync(path));
    let uid = event.senderID;

    if (!users[uid]) users[uid] = { money: 0 };

    let dice1 = Math.floor(Math.random()*6)+1;
    let dice2 = Math.floor(Math.random()*6)+1;

    let total = dice1 + dice2;

    api.sendMessage(
        `🎲 Dice Roll\n\n${dice1} + ${dice2} = ${total}`,
        event.threadID,
        event.messageID
    );
};
