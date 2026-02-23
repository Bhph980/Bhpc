const fs = require("fs");
const path = "users.json";

module.exports.config = {
    name: "coinflip",
    cooldowns: 5
};

module.exports.onStart = async function({ api, event }) {

    let result = Math.random() > 0.5 ? "HEADS" : "TAILS";

    api.sendMessage(
        `🪙 Coin Flip\n\nResult: ${result}`,
        event.threadID,
        event.messageID
    );
};
