module.exports = {
  config: {
    name: "help",
    aliases: ["h", "cmd"],
    version: "4.6",
    author: "Rai, Watanabe",
    role: 0,
    shortDescription: "Show commands paginated",
    category: "system",
    guide: "{pn} or {pn} <page>"
  },

  onStart: async function ({ api, event, args, commandName }) {
    const { commands } = global.GoatBot;
    const prefix = global.GoatBot.config.prefix;

    const commandsArray = [...commands.values()];
    const pageSize = 30; // commands per page
    let page = parseInt(args[0]) || 1;
    const totalPages = Math.ceil(commandsArray.length / pageSize);

    if (page < 1) page = 1;
    if (page > totalPages) page = totalPages;

    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const pageCommands = commandsArray.slice(start, end);

    // Build message
    let msg = "╭─────────────⭓\n";

    pageCommands.forEach((cmd, index) => {
      const number = start + index + 1;
      const desc = cmd.config.shortDescription
        ? `: ${cmd.config.shortDescription}`
        : "";
      msg += `│ ${number} . ${cmd.config.name}${desc}\n`;
    });

    msg +=
      "├─────⭔\n" +
      `│ Page [ ${page}/${totalPages} ]\n` +
      `│ Currently, the bot has ${commandsArray.length} commands\n` +
      `│ » Type ${prefix}${commandName} <page> to view other pages\n` +
      `│ » Type ${prefix}${commandName} <command> for details\n` +
      "├────────⭔\n" +
      "│ [ BHPH BOT ]\n" +
      "│ Credits: Rai, Watanabe\n" +
      "╰─────────────⭓";

    api.sendMessage(msg, event.threadID);
  }
};
