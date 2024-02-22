import { API } from "$bot/api/index.js";

export const STATS = async (ctx) => {
  try {
    const input = ctx.message.text;

    const splited = input.split(" ");

    if (splited.length !== 2) {
      return await ctx.reply("Invalid. Ex: /stats GNU_Amir");
    }

    const username = splited[1];

    const { data: response } = await API.get("stats/br/v2", {
      params: {
        name: username,
        // image: "all",
      },
    });

    const data = response.data;

    const { battlePass, image, account, stats } = data;
    const { all, keyboardMouse, gamepad, touch } = stats;

    // const messages = ["🖱 PC", "🎮 Gamepad", "📱 Touch"];

    const minutesPlayed = all.overall.minutesPlayed;
    const hoursPlayed = Math.floor(minutesPlayed / 60);
    const remainingMinutes = minutesPlayed % 60;

    const messages = [
      // `🆔 ID: ${account.id}`,
      `👤 Name: ${account.name}`,
      "",
      `⭐️ Battle pass: ${battlePass.level}`,
      `📈 Score: ${all.overall.score}`,
      `👊 Total mathes: ${all.overall.matches}`,
      `🏆 Wins: ${all.overall.wins}`,
      `🔟 Top 10: ${all.overall.top10}`,
      `🔪 Kills: ${all.overall.kills}`,
      `☠️ Deaths: ${all.overall.deaths}`,
      `🧑‍🚀 K/D: ${all.overall.kd}`,
      `⏳ Time played: ${hoursPlayed} hours and ${remainingMinutes} minutes`,
      "",
      "Subscribe to @telegram",
    ];

    await ctx.reply(messages.join("\n"));

    // await ctx.replyWithPhoto(image, {
    //   caption: messages.join("\n"),
    // });
  } catch (error) {
    await ctx.reply(error.message);
  }
};
