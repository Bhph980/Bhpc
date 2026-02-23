const fs = require("fs");
const path = __dirname + "/../../users.json";

module.exports.config = {
    name: "balance",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Kazuki",
    description: "Check balance"
};

module.exports.run = async function({ api, event }) {

    let users = JSON.parse(fs.readFileSync(path));
    let userID = event.senderID;

    if (!users[userID]) users[userID] = { money: 0 };

    let balance = users[userID].money;

    let msg = `
╭━━━━━━━━━━━━━━━━━━━━╮
        💎 𝗪𝗔𝗟𝗟𝗘𝗧 𝗜𝗡𝗙𝗢 💎
╰━━━━━━━━━━━━━━━━━━━━╯

👤 Player : ${event.senderID}

💰 Balance :
➤ ${balance}$

━━━━━━━━━━━━━━━━━━━━━━
🎮 /work • 🎁 /daily • 🎰 /slot
━━━━━━━━━━━━━━━━━━━━━━
`;

    api.sendMessage(msg, event.threadID, event.messageID);
};
