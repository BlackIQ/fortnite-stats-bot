import { API } from "$bot/api/index.js";

export const LIST = async (ctx) => {
  const { _id } = ctx.fortnite.user;

  try {
    const { data: response } = await API.get(`favorites`, {
      params: { user: _id },
    });

    const buttons = [];
    const messages = ["List of users"];

    response.favorites.forEach((favorite, index) => {
      if (index % 2 === 0) {
        buttons.push([]);
      }

      buttons[buttons.length - 1].push({
        text: favorite.fortnite_id,
        callback_data: `stats?${favorite.fortnite_id}`,
      });
    });

    const buttonsMarkup = {
      reply_markup: {
        inline_keyboard: buttons,
      },
    };

    const message = messages.join("\n");

    return await ctx.reply(message, buttonsMarkup);
  } catch (error) {
    return await ctx.reply(error.message);
  }
};

export const ADD = async (ctx) => {
  const { _id: user } = ctx.fortnite.user;

  try {
    const id = ctx.callbackQuery.data.split("?")[1];

    await API.post(`favorites`, { user, fortnite_id: id });

    return await ctx.reply(`${id} added to favorites.`);
  } catch (error) {
    return await ctx.reply(error.message);
  }
};

export const REMOVE = async (ctx) => {
  try {
    const id = ctx.callbackQuery.data.split("?")[1];

    const { data: response } = await API.delete(`favorites/${id}`);

    return await ctx.reply(
      `${response.favorite.fortnite_id} removed from favorites.`
    );
  } catch (error) {
    return await ctx.reply(error.message);
  }
};
