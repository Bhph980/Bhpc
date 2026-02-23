const fs = require("fs");
const path = "users.json";

module.exports.config = {
    name: "daily",
    cooldowns: 86400
};

module.exports.onStart = async function({ api, event }) {

    let users = JSON.parse(fs.readFileSync(path));
    let uid = event.senderID;

    if (!users[uid]) users[uid] = { money: 0, daily: 0 };

    let now = Date.now();

    if (now - (users[uid].daily || 0) < 86400000)
        return api.sendMessage("❌ Daily already claimed!", event.threadID);

    users[uid].money += 500;
    users[uid].daily = now;

    fs.writeFileSync(path, JSON.stringify(users,null,2));

    api.sendMessage("🎁 You received 500$", event.threadID);
};
