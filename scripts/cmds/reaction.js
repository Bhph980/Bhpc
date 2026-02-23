const fs = require("fs");

module.exports.config = {
    name: "reaction",
    cooldowns: 10
};

let symbols = ["🔥","⚡","💎","⭐"];

module.exports.onStart = async function({ api, event }) {

    let symbol = symbols[Math.floor(Math.random()*symbols.length)];

    api.sendMessage(
        `⚡ Reaction Game\n\nReact FAST:\n${symbol}`,
        event.threadID
    );
};
