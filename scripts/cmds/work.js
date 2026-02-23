const fs = require("fs");
const path = __dirname + "/../../users.json";

module.exports.config = { name: "work" };

module.exports.run = async function({ api, event }) {

    let jobs = ["Programmer","Farmer","Gamer","Student","Streamer"];

    let users = JSON.parse(fs.readFileSync(path));
    let uid = event.senderID;

    if (!users[uid]) users[uid] = { money: 0 };

    let reward = Math.floor(Math.random()*400)+100;

    users[uid].money += reward;

    fs.writeFileSync(path, JSON.stringify(users, null, 2));

    let msg = `
╭━━━━━━━━━━━━━━━━━━━━╮
        👷 𝗪𝗢𝗥𝗞 𝗥𝗘𝗪𝗔𝗥𝗗 👷
╰━━━━━━━━━━━━━━━━━━━━╯

💵 Earned:
➤ ${reward}$

⏳ Cooldown: 10 Minutes
`;

    api.sendMessage(msg, event.threadID, event.messageID);
};
