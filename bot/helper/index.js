import { API } from "$bot/api/index.js";

const getTime = (minute) => {
  const hoursPlayed = Math.floor(minute / 60);
  const remainingMinutes = minute % 60;

  return { hoursPlayed, remainingMinutes };
};

export const getStat = async (username, user, type) => {
  const { data: response } = await API.get("stats", {
    params: {
      name: username,
      user,
    },
  });

  const data = response;

  const { battlePass, account, stats, favorite } = data;
  // const { all, keyboardMouse, gamepad, touch } = stats;

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
    `🆔 ID: ${account.id}`,
    `👤 Name: ${account.name}`,
    `⭐️ Battle pass: ${battlePass.level}`,
    `📈 Progress: ${battlePass.progress}`,
    "",
  ];

  const capitalizeFirstLetter = (string) => {
    if (!string) return string;

    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const levels = ["keyboardMouse", "gamepad", "touch"];
  const depps = ["solo", "duo", "squad", "trio", "ltm"];

  // const levels = ["all", "keyboardMouse", "gamepad", "touch"];
  // const depps = ["overall", "solo", "due", "squal", "trio", "ltm"];

  if (type === "overall") {
    await Promise.all(
      levels.map(async (level) => {
        if (stats[level]) {
          await Promise.all(
            depps.map(async (deep) => {
              if (stats[level][deep]) {
                const selected = stats[level][deep];

                const { hoursPlayed, remainingMinutes } = getTime(
                  selected.minutesPlayed
                );

                const levelTitle = capitalizeFirstLetter(level);
                const deepTitle = capitalizeFirstLetter(deep);

                messages.push(
                  `🌐 ${levelTitle} / ${deepTitle} 🌐`,
                  `📈 Score: ${selected.score}`,
                  `👊 Total matches: ${selected.matches}`,
                  `🏆 Wins: ${selected.wins}`,
                  // `🥈 Top 5: ${selected.top5}`,
                  // `🥈 Top 10: ${selected.top10}`,
                  // `🥉 Top 12: ${selected.top12}`,
                  // `🥉 Top 25: ${selected.top25}`,
                  `🔪 Kills: ${selected.kills}`,
                  `☠️ Deaths: ${selected.deaths}`,
                  `🧑‍🚀 K/D: ${selected.kd}`,
                  `⏳ Time played: ${hoursPlayed} hours and ${remainingMinutes} minutes`,
                  ""
                );
              }
            })
          );
        }
      })
    );
  } else {
    if (depps.includes(type)) {
      await Promise.all(
        levels.map(async (level) => {
          if (stats[level]) {
            if (stats[level][type]) {
              const selected = stats[level][type];

              const { hoursPlayed, remainingMinutes } = getTime(
                selected.minutesPlayed
              );

              const levelTitle = capitalizeFirstLetter(level);
              const deepTitle = capitalizeFirstLetter(type);

              messages.push(
                `🌐 ${levelTitle} / ${deepTitle} 🌐`,
                `📈 Score: ${selected.score}`,
                `👊 Total matches: ${selected.matches}`,
                `🏆 Wins: ${selected.wins}`,
                // `🥈 Top 5: ${selected.top5}`,
                // `🥈 Top 10: ${selected.top10}`,
                // `🥉 Top 12: ${selected.top12}`,
                // `🥉 Top 25: ${selected.top25}`,
                `🔪 Kills: ${selected.kills}`,
                `☠️ Deaths: ${selected.deaths}`,
                `🧑‍🚀 K/D: ${selected.kd}`,
                `⏳ Time played: ${hoursPlayed} hours and ${remainingMinutes} minutes`,
                ""
              );
            }
          }
        })
      );
    } else {
      messages.push(
        "Invalid type. Type must be solo, duo, squal, trio or ltm",
        ""
      );
    }
  }

  messages.push("Subscribe to @telegram");

  return { messages, buttons };
};
