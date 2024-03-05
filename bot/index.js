import { Socks5 } from "$bot/connections/index.js";
import { botConfig, appConfig } from "$bot/config/index.js";
import { Bot, Stats, User } from "$bot/controllers/index.js";

import { gateway } from "$bot/middlewares/index.js";

import { Telegraf } from "telegraf";

const bot = new Telegraf(botConfig.token, {
  telegram: {
    agent: !appConfig.published && Socks5,
  },
});

// Middlewares
bot.use(gateway);

// Bot
bot.start(Bot.START);
bot.help(Bot.HELP);

// Stats
bot.command("stats", Stats.STATS);

// User
bot.command("set", User.SET);
bot.command("my", Stats.MY);

// Favorites
bot.command("favorites", (ctx) => ctx.reply("Your Favorites"));

export default bot;
