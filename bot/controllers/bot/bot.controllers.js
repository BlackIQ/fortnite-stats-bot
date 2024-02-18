export const START = async (ctx) => {
  const messages = [
    "Hi, welcome to __Fortnite Stats Bot__ 🎮",
    "",
    "For more information send /help.",
    "",
    "This project is open-source 🐙",
    "- [GitHub](https://github.com/BlackIQ/fortnite-stats-bot)",
  ];

  await ctx.replyWithMarkdown(messages.join("\n"));
};

export const HELP = async (ctx) => {
  const messages = [
    "Fortnite Stats",
    "",
    "/help To see manual",
    "/stats <username> To get stats",
    "",
    "For more information read about or contact with @GNU_Jupiter",
    "",
    "Hi, I am Amirhossein. If you liked this bot, let's play with each other!",
  ];

  await ctx.reply(messages.join("\n"));
};
