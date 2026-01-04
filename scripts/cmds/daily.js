// Simple in-memory storage
const tempUsers = {};

function getUser(userId) {
  if (!tempUsers[userId]) tempUsers[userId] = { coins: 0, daily: 0 };
  return tempUsers[userId];
}

function addCoins(userId, amount) {
  const user = getUser(userId);
  user.coins += amount;
}

function setDaily(userId) {
  const user = getUser(userId);
  user.daily = Date.now();
}

module.exports = {
  config: {
    name: "daily",
    version: "1.0",
    author: "Rai Watanabe",
    role: 0,
    shortDescription: "Claim daily coins",
    category: "economy"
  },

  onStart: async function({ api, event, Users }) {
    try {
      const userId = event.senderID;
      let user;
      
      // Try using Users database first
      if (Users && Users.getData && Users.addCoins && Users.setData) {
        user = await Users.getData(userId);
      } else {
        // Fallback to temp storage
        user = getUser(userId);
      }

      const now = Date.now();
      const lastClaim = user.daily || 0;
      const cooldown = 24 * 60 * 60 * 1000;

      if (now - lastClaim < cooldown) {
        return api.sendMessage(
`╭═══════════════════⭓
│ ❌ DAILY ALREADY CLAIMED
│
│ 💎 Come back later to claim again!
│
│ 👑 Credits: Rai Watanabe
╰═══════════════════⭓`, event.threadID
        );
      }

      const coins = 500;
      
      // Add coins
      if (Users && Users.addCoins && Users.setData) {
        await Users.addCoins(userId, coins);
        await Users.setData(userId, { daily: now });
      } else {
        addCoins(userId, coins);
        setDaily(userId);
      }

      // ULTRA BOX message
      const msg =
`╭═══════════════════⭓
│ ✨ DAILY BONUS ✨
│
│ 🎁 You claimed **${coins} coins** today!
│ 💎 Come back tomorrow for more!
│
│ 👑 Credits: Rai Watanabe
╰═══════════════════⭓`;

      return api.sendMessage(msg, event.threadID);

    } catch (err) {
      console.log(err);
      return api.sendMessage(
        `❌ Something went wrong while claiming daily coins.`,
        event.threadID
      );
    }
  }
};
