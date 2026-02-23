const fs = require("fs");
const path = "users.json";

module.exports.config = {
    name: "slot",
    cooldowns: 5
};

module.exports.onStart = async function({ api, event, args }) {

    let users = JSON.parse(fs.readFileSync(path));
    let uid = event.senderID;

    if (!users[uid]) users[uid] = { money: 1000 };

    let bet = parseInt(args[0]) || 0;

    if (users[uid].money < bet)
        return api.sendMessage("❌ Not enough balance!", event.threadID);

    let symbols = ["🍒","🍋","🍉","💎","⭐"];

    let spin = [
        symbols[Math.floor(Math.random()*symbols.length)],
        symbols[Math.floor(Math.random()*symbols.length)],
        symbols[Math.floor(Math.random()*symbols.length)]
    ];

    let win = spin[0] === spin[1] && spin[1] === spin[2];

    users[uid].money += bet > 0 ? (win ? bet*2 : -bet) : 0;

    fs.writeFileSync(path, JSON.stringify(users,null,2));

    api.sendMessage(
        `🎰 ${spin.join(" | ")}\n${win ? "🎉 JACKPOT!" : "❌ You lost!"}`,
        event.threadID,
        event.messageID
    );
};
