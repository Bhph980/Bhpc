module.exports = {
  config: {
    name: "daily",
    version: "1.1",
    author: "Rai Watanabe",
    category: "economy",
    description: "Claim daily reward",
    cooldown: 86400
  },

  onStart: async ({ message, event, usersData }) => {
    const uid = event.senderID;
    if (!uid) return;

    const reward = 500;
    const current = await usersData.get(uid, "data.money") || 0;
    const total = current + reward;

    await usersData.set(uid, total, "data.money");

    return message.reply(
`╔══════════════════════════════════════════════╗
║ 🎁💎  D A I L Y   R E W A R D   💎🎁           ║
╠══════════════════════════════════════════════╣
║ 🗓️ Claim Status  : ✅ SUCCESS               ║
║ ⏳ Cooldown      : 24 Hours                 ║
║                                              ║
║ 💎 Reward Earned : +${reward} 🪙 Coins      ║
║ 💰 Wallet Now    : ${total} 🪙 Coins        ║
║                                              ║
║ 🔥 Keep grinding for more rewards!          ║
╠══════════════════════════════════════════════╣
║ ✨ Tip: Don’t miss tomorrow’s claim 🤑      ║
╚══════════════════════════════════════════════╝`
    );
  }
};
