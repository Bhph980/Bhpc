const fs = require("fs");
const path = "users.json";

module.exports.config = {
    name: "quizrank",
    cooldowns: 10
};

let questions = [
    { q: "What is 2+2?", a: "4" },
    { q: "Capital of Philippines?", a: "manila" },
    { q: "Sun rises in?", a: "east" }
];

module.exports.onStart = async function({ api, event }) {

    let users = JSON.parse(fs.readFileSync(path));
    let uid = event.senderID;

    if (!users[uid]) users[uid] = { wins: 0, losses: 0 };

    let data = questions[Math.floor(Math.random()*questions.length)];

    api.sendMessage(
        `🧠 QUIZ BATTLE\n\nQuestion:\n${data.q}\n\nReply with answer!`,
        event.threadID
    );

    // Simple answer listener (Goatbot depends on your handler system)
};
