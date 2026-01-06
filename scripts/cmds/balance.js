module.exports = {
  config: {
    name: "balance",
    aliases: ["bal", "wallet"],
    version: "1.1",
    author: "Rai Watanabe",
    category: "economy",
    description: "Check wallet balance"
  },

  onStart: async ({ message, event, usersData }) => {
    const uid = event.senderID;
    if (!uid) return;

    const money = await usersData.get(uid, "data.money") || 0;

    return message.reply(
`╔══════════════════════════════════════════════╗
║ 💰✨  E C O N O M Y   P R O F I L E  ✨💰     ║
╠══════════════════════════════════════════════╣
║ 👤 User        : ${event.senderID}           ║
║ 🆔 UID         : ${uid}                      ║
║                                              ║
║ 💵 Wallet      : ${money} 🪙 Coins           ║
║ 🏦 Bank        : 0 🪙 Coins                  ║
║                                              ║
║ 📊 Total Worth : ${money} 🪙 Coins           ║
╠══════════════════════════════════════════════╣
║ 🧭 Commands    : /daily • /work • /bank     ║
╚══════════════════════════════════════════════╝`
    );
  }
};
