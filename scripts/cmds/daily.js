const fs = require("fs");
const path = __dirname + "/../../users.json";

module.exports.config = {
    name: "daily",
    cooldowns: 86400
};

module.exports.run = async function({ api, event }) {
    let users = JSON.parse(fs.readFileSync(path));
    let userID = event.senderID;

    if (!users[userID]) users[userID] = { money: 0 };

    users[userID].money += 500;

    fs.writeFileSync(path, JSON.stringify(users, null, 2));

    let msg = `
╭━━━━━━━━━━━━━━━━━━━━╮
        🎁 𝗗𝗔𝗜𝗟𝗬 𝗟𝗢𝗢𝗧 🎁
╰━━━━━━━━━━━━━━━━━━━━╯

✨ Daily reward claimed!

💰 Received:
➤ 500$

⏳ Next claim after 24 hours
`;

    api.sendMessage(msg, event.threadID, event.messageID);
};
