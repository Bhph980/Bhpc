const fs = require("fs");
const path = __dirname + "/users.json";

module.exports.config = {
  name: "slot",
  version: "2.0.0",
  hasPermssion: 0,
  credits: "Kazuki",
  description: "Casino slot betting system",
  commandCategory: "game",
  usages: "/slot [bet]",
  cooldowns: 5
};

module.exports.run = async function({ api, event, args }) {
  const symbols = ["🍒", "🍋", "🍉", "💎", "⭐"];

  let users = JSON.parse(fs.readFileSync(path));
  let userID = event.senderID;

  if (!users[userID]) users[userID] = { money: 1000 };

  let bet = parseInt(args[0]) || 0;

  if (bet < 0) return api.sendMessage("Invalid bet amount!", event.threadID);

  if (users[userID].money < bet)
    return api.sendMessage("❌ Not enough balance!", event.threadID);

  let spin = [
    symbols[Math.floor(Math.random() * symbols.length)],
    symbols[Math.floor(Math.random() * symbols.length)],
    symbols[Math.floor(Math.random() * symbols.length)]
  ];

  let reward = 0;
  let resultText = "❌ You lost your bet.";

  if (spin[0] === spin[1] && spin[1] === spin[2]) {
    reward = bet * 2;
    users[userID].money += reward;
    resultText = `🎉 JACKPOT! You won ${reward}$`;
  } else {
    users[userID].money -= bet;
  }

  fs.writeFileSync(path, JSON.stringify(users, null, 2));

  let message = `
╭━━━━━━━━━━━━━━━━━━╮
        🎰 𝗦𝗟𝗢𝗧 𝗠𝗔𝗖𝗛𝗜𝗡𝗘 🎰
╰━━━━━━━━━━━━━━━━━━╯

        ╔═══〔 🎲 〕═══╗
          ${spin.join(" │ ")}
        ╚══════════════╝

${resultText}

━━━━━━━━━━━━━━━━━━━━
💰 Balance: ${users[userID].money}$
━━━━━━━━━━━━━━━━━━━━
`;

  return api.sendMessage(message, event.threadID, event.messageID);
};
