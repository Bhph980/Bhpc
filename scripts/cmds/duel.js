const fs = require("fs");
const path = "users.json";

module.exports.config = {
    name: "duel",
    cooldowns: 5,
    description: "Rank or friendly duel"
};

module.exports.onStart = async function({ api, event, args }) {

    let users = JSON.parse(fs.readFileSync(path));

    let mode = args[0];
    let mention = Object.keys(event.mentions)[0];

    if (!mode || !mention)
        return api.sendMessage(
            "⚔ Use:\n/duel rank @user bet\n/duel friendly @user bet",
            event.threadID
        );

    let challenger = event.senderID;
    let opponent = mention;

    let bet = parseInt(args[2]) || 0;

    if (!users[challenger]) users[challenger] = {
        money: 1000,
        wins: 0,
        losses: 0,
        stars: 0,
        protection: 0
    };

    if (!users[opponent]) users[opponent] = {
        money: 1000,
        wins: 0,
        losses: 0,
        stars: 0,
        protection: 0
    };

    if (users[challenger].money < bet ||
        users[opponent].money < bet)
        return api.sendMessage("❌ Not enough money!", event.threadID);

    // Random duel winner
    let winner = Math.random() > 0.5 ? challenger : opponent;
    let loser = winner === challenger ? opponent : challenger;

    // Money transfer (both modes)
    users[winner].money += bet;
    users[loser].money -= bet;

    users[winner].wins++;
    users[loser].losses++;

    // ⭐ Rank duel mode only affects stars
    if (mode === "rank") {

        if (users[winner].stars === undefined)
            users[winner].stars = 0;

        if (users[loser].stars === undefined)
            users[loser].stars = 0;

        // Star gain/loss logic
        function addStar(user) {
            users[user].stars++;
        }

        function loseStar(user) {

            if (users[user].protection > 0) {
                users[user].protection--;
                return;
            }

            users[user].stars--;

            if (users[user].stars < 0)
                users[user].stars = 0;
        }

        addStar(winner);
        loseStar(loser);
    }

    fs.writeFileSync(path, JSON.stringify(users, null, 2));

    api.sendMessage(
        `⚔ DUEL RESULT (${mode.toUpperCase()})

🏆 Winner: ${winner}
❌ Loser: ${loser}

💰 Bet: ${bet}$

${mode === "rank" ? "⭐ Rank stars updated!" : "🤝 Friendly duel!"}`,
        event.threadID
    );
};
