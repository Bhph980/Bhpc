module.exports = {
  config: {
    name: "vip",
    aliases: ["vipshop", "vipbuy", "vipinfo"],
    version: "3.1",
    author: "sylus",
    shortDescription: "VIP system with item-based passive income",
    category: "ECONOMY",
    guide:
      "{pn} → unlock VIP\n" +
      "{pn} shop → VIP shop\n" +
      "{pn} buy <id> → buy item\n" +
      "{pn} info → VIP info\n" +
      "{pn} give <uid> → give VIP (you pay)"
  },

  /* ================= AUTO EARN (ITEMS ONLY) ================= */
  onLoad: async function ({ usersData }) {
    setInterval(async () => {
      const allUsers = await usersData.getAll();

      for (const user of allUsers) {
        const data = user.data || {};
        let income = 0;

        // ❌ NO VIP BASE INCOME
        if (data.hasLily) income += 10_000_000;
        if (data.hasRose) income += 5_000_000;
        if (data.hasCrown) income += 20_000_000;

        if (income > 0) {
          await usersData.set(user.userID, {
            ...data,
            money: (data.money || 0) + income
          });
        }
      }
    }, 60 * 1000); // every minute
  },

  onStart: async function ({ api, event, args, usersData }) {
    const userID = event.senderID;
    const userData = (await usersData.get(userID)) || {};
    const money = userData.money || 0;
    const isVip = userData.isVip || false;

    const VIP_PRICE = 100_000_000;

    const shopItems = {
      lily: {
        name: "🌸 LILY",
        price: 200_000_000,
        earn: 10_000_000,
        info: "Generates +10M every minute.",
        key: "hasLily"
      },
      rose: {
        name: "🌹 ROSE",
        price: 120_000_000,
        earn: 5_000_000,
        info: "Generates +5M every minute.",
        key: "hasRose"
      },
      crown: {
        name: "👑 GOLDEN CROWN",
        price: 350_000_000,
        earn: 20_000_000,
        info: "Generates +20M every minute.",
        key: "hasCrown"
      }
    };

    /* ================= VIP GIVE (MEMBER CAN USE) ================= */
    if (args[0] === "give") {
      const targetID = args[1];

      if (!targetID)
        return api.sendMessage("❌ Usage: /vip give <uid>", event.threadID);

      if (targetID === userID)
        return api.sendMessage("❌ You cannot give VIP to yourself.", event.threadID);

      const targetData = (await usersData.get(targetID)) || {};

      if (targetData.isVip)
        return api.sendMessage("⚠️ This user already has VIP.", event.threadID);

      if (money < VIP_PRICE)
        return api.sendMessage(`❌ Not enough money.\nNeed: ${VIP_PRICE}`, event.threadID);

      await usersData.set(userID, {
        ...userData,
        money: money - VIP_PRICE
      });

      await usersData.set(targetID, {
        ...targetData,
        isVip: true
      });

      return api.sendMessage(
        `〔🎁〕 VIP GIVE SUCCESSFULLY\n👤 UID: ${targetID}`,
        event.threadID
      );
    }

    /* ================= VIP SHOP ================= */
    if (args[0] === "shop") {
      if (!isVip)
        return api.sendMessage(
          "〔🔒〕 𝗩𝗜𝗣 𝗢𝗡𝗟𝗬 𝗖𝗔𝗡 𝗔𝗖𝗖𝗘𝗦𝗦\nUnlock VIP first using /vip",
          event.threadID
        );

      let msg = "🛒 𝗩𝗜𝗣 𝗦𝗛𝗢𝗣\n━━━━━━━━━━━━\n";
      for (const id in shopItems) {
        const i = shopItems[id];
        msg += `${i.name}\n`;
        msg += `⋊ Price: ${i.price}\n`;
        msg += `⋊ Earn: ${i.earn} / minute\n`;
        msg += `⋊ ${i.info}\n`;
        msg += `⋊ ID: ${id}\n\n`;
      }
      msg += "Use: /vip buy <id>";

      return api.sendMessage(msg, event.threadID);
    }

    /* ================= BUY ITEM ================= */
    if (args[0] === "buy") {
      if (!isVip)
        return api.sendMessage("❌ VIP only command.", event.threadID);

      const item = shopItems[args[1]];
      if (!item)
        return api.sendMessage("❌ Item not found.", event.threadID);

      if (userData[item.key])
        return api.sendMessage(`❌ You already own ${item.name}.`, event.threadID);

      if (money < item.price)
        return api.sendMessage("❌ Not enough money.", event.threadID);

      await usersData.set(userID, {
        ...userData,
        money: money - item.price,
        [item.key]: true
      });

      return api.sendMessage(
        `〔✅〕 PURCHASED ${item.name}\n💸 +${item.earn} / minute`,
        event.threadID
      );
    }

    /* ================= VIP INFO ================= */
    if (args[0] === "info") {
      if (!isVip)
        return api.sendMessage("❌ You are not VIP.", event.threadID);

      let income = 0;
      let msg = "〔⭐〕𝗩𝗜𝗣 𝗜𝗡𝗙𝗢\n━━━━━━━━━━━━\n";

      if (userData.hasLily) {
        msg += "🌸 LILY: +10M / minute\n";
        income += 10_000_000;
      }
      if (userData.hasRose) {
        msg += "🌹 ROSE: +5M / minute\n";
        income += 5_000_000;
      }
      if (userData.hasCrown) {
        msg += "👑 CROWN: +20M / minute\n";
        income += 20_000_000;
      }

      msg += `\n〔💰〕𝗧𝗢𝗧𝗔𝗟 𝗜𝗧𝗘𝗠\n─────────────\n: ${income} / minute`;
      return api.sendMessage(msg, event.threadID);
    }

    /* ================= UNLOCK VIP ================= */
    if (isVip) {
      return api.sendMessage(
        "〔⭐〕𝗩𝗜𝗣 𝗔𝗖𝗧𝗜𝗩𝗘\n────────────\nUse /vip shop or /vip info",
        event.threadID
      );
    }

    if (money < VIP_PRICE) {
      return api.sendMessage(
        `❌ Not enough money.\nNeed: ${VIP_PRICE}`,
        event.threadID
      );
    }

    await usersData.set(userID, {
      ...userData,
      money: money - VIP_PRICE,
      isVip: true
    });

    api.sendMessage(
      "〔🎉〕 𝗩𝗜𝗣 𝗨𝗡𝗟𝗢𝗖𝗞𝗘𝗗!\n─────────────\n🛒 You can now access the VIP shop.",
      event.threadID
    );
  }
};
