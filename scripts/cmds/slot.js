const fs = require("fs");
const path = __dirname + "/../../users.json";

module.exports.config = {
    name: "slot",
    cooldowns: 5
};

module.exports.run = async function({ api, event, args }) {

    let symbols = ["🍒","🍋","🍉","💎","⭐"];

    let users = JSON.parse(fs.readFileSync(path));
    let uid = event.senderID;

    if (!users[uid]) users[uid] = { money: 1000 };

    let bet = parseInt(args[0]) || 0;

    if (users[uid].money < bet)
        return api.sendMessage("❌ Not enough balance!", event.threadID);

    let spin = [
        symbols[Math.floor(Math.random()*symbols.length)],
        symbols[Math.floor(Math.random()*symbols.length)],
        symbols[Math.floor(Math.random()*symbols.length)]
    ];

    let reward = 0;
    let result = "❌ You lost your bet.";

    if (spin[0] === spin[1] && spin[1] === spin[2]) {
        reward = bet * 2;
        users[uid].money += reward;
        result = `🎉 JACKPOT! +${reward}$`;
    } else {
        users[uid].money -= bet;
    }

    fs.writeFileSync(path, JSON.stringify(users, null, 2));

    let msg = `
╭━━━━━━━━━━━━━━━━━━━━╮
        🎰 𝗖𝗔𝗦𝗜𝗡𝗢 𝗦𝗟𝗢𝗧 🎰
╰━━━━━━━━━━━━━━━━━━━━╯

🎲 ${spin.join(" │ ")}

${result}

💰 Balance:
➤ ${users[uid].money}$
`;

    api.sendMessage(msg, event.threadID, event.messageID);
};
