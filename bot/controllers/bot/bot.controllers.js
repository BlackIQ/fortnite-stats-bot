export const START = async (ctx) => {
  const messages = [
    "Hi, welcome to __Fortnite Stats Bot__ 🎮",
    "",
    "For more information send /help.",
    "",
    "This project is open-source 🐙",
    "- [GitHub](https://github.com/BlackIQ/fortnite-stats-bot)"
  ];

  return await ctx.replyWithMarkdown(messages.join("\n"));
};

export const HELP = async (ctx) => {
  const messages = [
    "Fortnite Stats Manual",
    "",
    "/start - Really?",
    "/help - To see manual",
    "",
    "/stats <username> - Get stats of the user",
    "/favorites - Show your favorite players",
    "",
    "/my - Here you can get your stats after saving",
    "/set <username> - Save your username",
    "",
    "For more information read about or contact with @GNU_Jupiter",
    "If you liked this bot, let's play with each other!",
  ];

  return await ctx.reply(messages.join("\n"));
};
