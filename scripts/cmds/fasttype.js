const fs = require("fs");
const path = "users.json";

module.exports.config = {
    name: "fasttype",
    cooldowns: 10
};

let phrases = [
    "DRAGON",
    "VICTORY",
    "CHAMPION",
    "GOATBOT"
];

module.exports.onStart = async function({ api, event }) {

    let phrase = phrases[Math.floor(Math.random()*phrases.length)];

    api.sendMessage(
        `⚡ FAST TYPE GAME\n\nType this FAST:\n${phrase}`,
        event.threadID
    );
};
