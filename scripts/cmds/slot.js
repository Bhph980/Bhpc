module.exports = {
  name: "slot",
  aliases: ["slots"],
  version: "2.1",
  author: "arch",
  description: "Slot Machine to earn a money",
  category: "game",
  cooldown: 8,

  onStart: async function ({ api, event, usersData }) {
    const icons = ["🎰", "🍇", "🍒", "🍋", "⭐", "💎"];
    const spin = () => icons[Math.floor(Math.random() * icons.length)];

    // get user data
    let winCount = await usersData.get(event.senderID, "slotWinCount") || 0;
    let loseCount = await usersData.get(event.senderID, "slotLoseCount") || 0;

    const loading =
`🎰 𝗦𝗟𝗢𝗧 𝗠𝗔𝗖𝗛𝗜𝗡𝗘
━━━━━━━━━━━━━━━━━━
[ 🎰 | 🎰 | 🎰 ]
━━━━━━━━━━━━━━━━━━
Spinning... 🎲`;

    api.sendMessage(loading, event.threadID, async (err, info) => {
      if (err) return;

      setTimeout(async () => {
        let s1, s2, s3;
        let reward = 0;
        let resultText = "❌ 𝗬𝗢𝗨 𝗟𝗢𝗦𝗧!";

        // 🎯 FORCE LOGIC
        if (winCount < 3) {
          // FORCE WIN (minor)
          s1 = "🎰";
          s2 = "🎰";
          s3 = spin();
          reward = 100;
          resultText = "🎗 𝗠𝗜𝗡𝗢𝗥 𝗪𝗜𝗡!";
          winCount++;
          await usersData.set(event.senderID, { slotWinCount: winCount });

          // after 3 wins → activate lose mode
          if (winCount === 3) {
            await usersData.set(event.senderID, { slotLoseCount: 2 });
          }

        } else if (loseCount > 0) {
          // FORCE LOSE
          s1 = spin();
          s2 = spin();
          s3 = spin();
          while (s1 === s2 || s2 === s3 || s1 === s3) {
            s1 = spin();
            s2 = spin();
            s3 = spin();
          }

          loseCount--;
          await usersData.set(event.senderID, { slotLoseCount: loseCount });

        } else {
          // RESET CYCLE (normal random)
          s1 = spin();
          s2 = spin();
          s3 = spin();
          winCount = 0;
          await usersData.set(event.senderID, { slotWinCount: 0 });
        }

        // add money
        if (reward > 0) {
          const money = await usersData.get(event.senderID, "money") || 0;
          await usersData.set(event.senderID, { money: money + reward });
        }

        const finalMsg =
`🎰 𝗦𝗟𝗢𝗧 𝗠𝗔𝗖𝗛𝗜𝗡𝗘
━━━━━━━━━━━━━━━━━━
[ ${s1} | ${s2} | ${s3} ]
━━━━━━━━━━━━━━━━━━
${resultText}
You won : $${reward}`;

        api.editMessage(finalMsg, info.messageID);
      }, 1500);
    });
  }
};
