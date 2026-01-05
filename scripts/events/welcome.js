module.exports = {
  config: {
    name: "welcome",
    eventType: ["log:subscribe"]
  },

  onStart: async ({ api, event, threadsData }) => {
    const threadID = event.threadID;
    const welcome = await threadsData.get(threadID, "data.welcomeMessage");
    if (!welcome) return;

    const threadInfo = await api.getThreadInfo(threadID);

    for (const user of event.logMessageData.addedParticipants) {
      let msg = welcome
        .replace(/{name}/g, user.fullName)
        .replace(/{uid}/g, user.userFbId)
        .replace(/{group}/g, threadInfo.threadName || "this group");

      api.sendMessage(msg, threadID);
    }
  }
};
