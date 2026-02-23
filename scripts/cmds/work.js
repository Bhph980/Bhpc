const fs = require("fs");
const path = "users.json";

module.exports.config = {
    name: "work"
};

module.exports.onStart = async function({ api, event }) {

    let jobs = ["Programmer","Farmer","Gamer","Student"];

    let users = JSON.parse(fs.readFileSync(path));
    let uid = event.senderID;

    if (!users[uid]) users[uid] = { money: 0 };

    let reward = Math.floor(Math.random()*400)+100;
    let job = jobs[Math.floor(Math.random()*jobs.length)];

    users[uid].money += reward;

    fs.writeFileSync(path, JSON.stringify(users,null,2));

    api.sendMessage(
        `👷 Job: ${job}\n💵 Earned: ${reward}$`,
        event.threadID
    );
};
