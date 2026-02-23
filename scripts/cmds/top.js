const fs = require("fs");
const path = __dirname + "/../../users.json";

module.exports.config = {
    name: "top",
    version: "2.0.0",
    hasPermssion: 0,
    description: "Top richest players with names"
};

module.exports.run = async function({ api, event }) {

    let users = JSON.parse(fs.readFileSync(path));

    let sorted = Object.entries(users)
        .sort((a, b) => b[1].money - a[1].money)
        .slice(0, 5);

    let msg = `
╭━━━━━━━━━━━━━━━━━━━━━━━━╮
        👑 𝗥𝗜𝗖𝗛𝗘𝗦𝗧 𝗣𝗟𝗔𝗬𝗘𝗥𝗦 👑
╰━━━━━━━━━━━━━━━━━━━━━━━━╯
`;

    for (let i = 0; i < sorted.length; i++) {
        let uid = sorted[i][0];
        let money = sorted[i][1].money;

        let name = await api.getUserInfo(uid);
        name = name[uid].name;

        let medal =
            i == 0 ? "🥇" :
            i == 1 ? "🥈" :
            i == 2 ? "🥉" :
            "🏅";

        msg += `
${medal} 𝗥𝗔𝗡𝗞 ${i + 1}
👤 ${name}
💰 ${money}$

`;
    }

    msg += `
━━━━━━━━━━━━━━━━━━━━━━━━━━
💎 Grind • Gamble • Dominate
━━━━━━━━━━━━━━━━━━━━━━━━━━
`;

    api.sendMessage(msg, event.threadID, event.messageID);
};
