const fs = require("fs");
const path = "users.json";

module.exports.config = {
    name = "guess"
};

module.exports.onStart = async function({ api, event }) {

    let number = Math.floor(Math.random()*10)+1;

    api.sendMessage(
        `🎯 Guess Game\n\nGuess number (1-10)`,
        event.threadID
    );

    // Your bot event handler must check reply messages
};
