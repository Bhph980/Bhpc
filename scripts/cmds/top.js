const fs = require("fs");
const path = "users.json";

module.exports.config = {
    name: "top",
    description: "Richest leaderboard"
};

module.exports.onStart = async function({ api, event }) {

    let users = JSON.parse(fs.readFileSync(path));

    let sorted = Object.entries(users)
        .sort((a,b)=>b[1].money-a[1].money)
        .slice(0,5);

    let msg = "👑 RICHEST PLAYERS\n\n";

    for (let i=0;i<sorted.length;i++){

        let uid = sorted[i][0];
        let money = sorted[i][1].money;

        let name = await api.getUserInfo(uid);
        name = name[uid].name;

        msg += `${i+1}. ${name}\n💰 ${money}$\n\n`;
    }

    api.sendMessage(msg, event.threadID, event.messageID);
};
