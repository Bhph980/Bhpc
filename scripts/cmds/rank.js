const fs = require("fs");
const path = "users.json";

module.exports.config = {
    name: "rank",
    version: "2.0.0",
    hasPermssion: 0,
    credits: "Kazuki",
    description: "Show competitive rank profile"
};

module.exports.onStart = async function({ api, event }) {

    let users = JSON.parse(fs.readFileSync(path));
    let uid = event.senderID;

    if (!users[uid]) users[uid] = {
        money: 0,
        wins: 0,
        losses: 0,
        stars: 0,
        division: "Warrior III",
        protection: 0
    };

    let data = users[uid];

    let winrate = data.wins + data.losses > 0
        ? Math.floor((data.wins / (data.wins + data.losses)) * 100)
        : 0;

    let msg = `
🏆 RANK PROFILE

🏅 Rank : ${data.division}
⭐ Stars : ${"⭐".repeat(data.stars)}
🛡 Protection : ${data.protection}/3

📊 Wins : ${data.wins}
📉 Losses : ${data.losses}
📈 Winrate : ${winrate}%
`;

    api.sendMessage(msg, event.threadID, event.messageID);
};
