import { Socks5 } from "$bot/connections/index.js";
import { botConfig, appConfig } from "$bot/config/index.js";
import { Bot, Stats, User, Favorite, Report } from "$bot/controllers/index.js";

import { gateway } from "$bot/middlewares/index.js";

import { Telegraf } from "telegraf";

// Set up bot instance
const bot = new Telegraf(botConfig.token, {
  telegram: {
    agent: !appConfig.published && Socks5, // Use agent if needed
  },
});

// Middlewares
bot.use(gateway); // Everything pass throw here

// Bot
bot.start(Bot.START); // Let's start
bot.help(Bot.HELP); // Get help

// Stats
bot.command("stats", Stats.STATS); // Get stat via command
bot.action(/^stats?(.+)/, Stats.STATS); // Get stat via action

// User
bot.command("set", User.SET); // Set username
bot.command("my", Stats.MY); // Get user stat

// Favorites
bot.command("favorites", Favorite.LIST); // List of them
bot.action(/^add?(.+)/, Favorite.ADD); // Add one
bot.action(/^remove?(.+)/, Favorite.REMOVE); // Remove one

// Log
bot.command("log", Report.BASIC); // basic log

export default bot;
