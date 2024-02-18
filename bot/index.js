import { Socks5 } from "$bot/connections/index.js";
import { botConfig, appConfig } from "$bot/config/index.js";
import { Bot, Stats } from "$bot/controllers/index.js";

import { Telegraf } from "telegraf";

const bot = new Telegraf(botConfig.token, {
  telegram: {
    agent: !appConfig.published && Socks5,
  },
});

// Bot
bot.start(Bot.START);
bot.help(Bot.HELP);

// Stats
bot.command("stats", Stats.STATS);

export default bot;
