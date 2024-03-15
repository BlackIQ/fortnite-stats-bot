import { API } from "$bot/api/index.js";

export const getStat = async (username, user) => {
  const { data: response } = await API.get("stats", {
    params: {
      name: username,
      user,
    },
  });

  const data = response;

  const { battlePass, image, account, stats, favorite } = data;
  const { all, keyboardMouse, gamepad, touch } = stats;

  // const messages = ["🖱 PC", "🎮 Gamepad", "📱 Touch"];

  const minutesPlayed = all.overall.minutesPlayed;
  const hoursPlayed = Math.floor(minutesPlayed / 60);
  const remainingMinutes = minutesPlayed % 60;

  const buttons = [];

  const btnText = favorite ? "Remove" : "Add";
  const btnCall = favorite ? "remove" : "add";
  const btnExt = favorite ? favorite._id : username;

  buttons.push([
    {
      text: btnText,
      callback_data: `${btnCall}?${btnExt}`,
    },
  ]);

  const messages = [
    // `🆔 ID: ${account.id}`,
    `👤 Name: ${account.name}`,
    "",
    `⭐️ Battle pass: ${battlePass.level}`,
    `📈 Score: ${all.overall.score}`,
    `👊 Total mathes: ${all.overall.matches}`,
    `🏆 Wins: ${all.overall.wins}`,
    `🥈 Top 10: ${all.overall.top10}`,
    `🥉 Top 10: ${all.overall.top25}`,
    `🔪 Kills: ${all.overall.kills}`,
    `☠️ Deaths: ${all.overall.deaths}`,
    `🧑‍🚀 K/D: ${all.overall.kd}`,
    `⏳ Time played: ${hoursPlayed} hours and ${remainingMinutes} minutes`,
    "",
    "Subscribe to @telegram",
  ];

  return { messages, buttons };
};
