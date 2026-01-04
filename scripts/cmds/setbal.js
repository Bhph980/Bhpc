module.exports = {
  config: {
    name: "set",
    version: "1.0",
    author: "sylus",
    shortDescription: "Set user balance",
    category: "Owner",
    guide: "{pn} <uid> <amount>"
  },

  onStart: async function ({ api, event, args, usersData, role }) {

    // 🔒 Bot admin only
    if (role < 2) {
      return api.sendMessage(
        "[ ❌ ] This command is for bot admins only.",
        event.threadID
      );
    }

    // ❗ Validate input
    if (args.length < 2) {
      return api.sendMessage(
        "[ ❌ ] Usage: /set <uid> <amount>\nExample: /set 123456789 50000000",
        event.threadID
      );
    }

    const targetID = args[0];
    const amount = Number(args[1]);

    if (isNaN(amount) || amount < 0) {
      return api.sendMessage(
        "[ ❌ ] Amount must be a valid number.",
        event.threadID
      );
    }

    // 📥 Get target user data
    const targetData = await usersData.get(targetID);

    if (!targetData) {
      return api.sendMessage(
        "[ ❌ ]User not found in database.",
        event.threadID
      );
    }

    // 💾 Set balance
    await usersData.set(targetID, {
      money: amount
    });

    api.sendMessage(
      `**BALANCE 𝖴𝖯𝖣𝖠𝖳𝖤𝖣**\n━━━━━━━━━━━━━\n` +
      `👤 𝖴𝖨𝖣: ${targetID}\n` +
      `💰 𝖭𝖤𝖶 𝖡𝖠𝖫𝖠𝖭𝖢𝖤: ${amount}`,
      event.threadID
    );
