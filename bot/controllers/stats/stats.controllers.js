import { getStat } from "$bot/helper/index.js";

export const STATS = async (ctx) => {
  const { _id: user } = ctx.fortnite.user;

  try {
    let input = "";
    let spliter = "";

    if (ctx?.message?.text) {
      input = ctx?.message?.text;
      spliter = " ";
    } else {
      input = ctx?.callbackQuery?.data;
      spliter = "?";
    }

    const splited = input.split(spliter);

    if (splited.length !== 3) {
      return await ctx.reply("Invalid. Ex: /stats GNU_Amir overall");
    }

    const username = splited[1];
    const type = splited[2];

    const { messages, buttons } = await getStat(username, user, type);

    const buttonsMarkup = {
      reply_markup: {
        inline_keyboard: buttons,
      },
    };

    return await ctx.reply(messages.join("\n"), buttonsMarkup);

    // await ctx.replyWithPhoto(image, {
    //   caption: messages.join("\n"),
    // });
  } catch (error) {
    return await ctx.reply(error.response.data.message);
  }
};

export const MY = async (ctx) => {
  const { fortnite_id, _id } = ctx.fortnite.user;

  if (!fortnite_id) {
    return await ctx.reply(
      "No username is set. To set username use /set command. Ex: /set GNU_Amir"
    );
  }

  let input = "";
  let spliter = "";

  if (ctx?.message?.text) {
    input = ctx?.message?.text;
    spliter = " ";
  } else {
    input = ctx?.callbackQuery?.data;
    spliter = "?";
  }

  const splited = input.split(spliter);

  if (splited.length !== 2) {
    return await ctx.reply("Invalid. Ex: /my overall");
  }

  const type = splited[1];

  try {
    const { messages } = await getStat(fortnite_id, _id, type);

    return await ctx.reply(messages.join("\n"));

    // await ctx.replyWithPhoto(image, {
    //   caption: messages.join("\n"),
    // });
  } catch (error) {
    return await ctx.reply(error.response.data.message);
  }
};
