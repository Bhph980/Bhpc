module.exports = {
  config: {
    name: "slot",
    aliases: ["slots"],
    version: "1.0",
    author: "Rai Watanabe",
    role: 0,
    shortDescription: "Play the ultra flashy slot machine",
    category: "gambling",
    guide: "{pn} <bet>"
  },

  onStart: async function ({ api, event, args }) {
    const prefix = global.GoatBot.config.prefix;
    const bet = parseInt(args[0]);

    // Validate bet
    if (!bet || bet <= 0)
      return api.sendMessage(
        `❌ Please enter a valid bet amount.\nUsage: ${prefix}slot <bet>`,
        event.threadID
      );

    // Slot symbols
    const symbols = ["🍒","🍋","🍉","🍇","⭐","💎"];
    const spin = [
      symbols[Math.floor(Math.random() * symbols.length)],
      symbols[Math.floor(Math.random() * symbols.length)],
      symbols[Math.floor(Math.random() * symbols.length)]
    ];

    // Determine result
    let resultText = "";
    let winnings = 0;

    if (spin[0] === spin[1] && spin[1] === spin[2]) {
      winnings = bet * 5;
      resultText = `💥 JACKPOT! You won ${winnings} coins! 💥`;
    } else if (spin[0] === spin[1] || spin[1] === spin[2] || spin[0] === spin[2]) {
      winnings = bet * 2;
      resultText = `✨ Nice! You won ${winnings} coins! ✨`;
    } else {
      winnings = 0;
      resultText = `😢 Better luck next time! You lost ${bet} coins.`;
    }

    // Build message in ULTRA DESIGN
    const msg =
`╭═══════════════════⭓
│ 🎰 𝗕𝗛𝗣𝗛 ULTRA SLOT 🎰
│
│ ${spin.join(" │ ")}
│
│ ${resultText}
│
│ 👑 Credits: Rai Watanabe
╰═══════════════════⭓`;

    api.sendMessage(msg, event.threadID);
  }
};  }
};
