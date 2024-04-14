import { API } from "$bot/api/index.js";

export const SET = async (ctx) => {
  const { _id } = ctx.fortnite.user;

  try {
    const input = ctx.message.text;

    const splited = input.split(" ");

    if (splited.length !== 2) {
      return await ctx.reply("Invalid. Ex: /set GNU_Amir");
    }

    const username = splited[1];

    await API.patch(`users/${_id}`, {
      fortnite_id: username,
    });

    const messages = [`Username updated to ${username}`];

    return await ctx.reply(messages.join("\n"));
  } catch (error) {
    return await ctx.reply(error.response.data.message);
  }
};
