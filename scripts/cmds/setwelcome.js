module.exports = {
  config: {
    name: "setwelcome",
    version: "1.0",
    author: "Rai Watanabe",
    role: 1,
    category: "group",
    description: "Set welcome message for the group"
  },

  onStart: async ({ message, event, args, threadsData }) => {
    const content = args.join(" ");
    if (!content)
      return message.reply(
        "❌ Usage:\n/setwelcome <message>\n\nExample:\n/setwelcome Welcome {name} to {group} 🎉"
      );

    await threadsData.set(event.threadID, content, "data.welcomeMessage");

    return message.reply(
`✅ Welcome message saved!

📝 Message:
${content}`
    );
  }
};
