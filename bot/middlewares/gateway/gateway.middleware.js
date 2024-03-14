import { API } from "$bot/api/index.js";

const gateway = async (ctx, next) => {
  const { update } = ctx;

  const user = update?.callback_query?.from || update?.message?.from;

  try {
    const { data } = await API.post("gateway", user);

    if (!ctx.fortnite) {
      ctx.fortnite = {};
    }

    ctx.fortnite.user = data.user;

    return next();
  } catch (error) {
    return await ctx.reply(error.message);
  }
};

export default gateway;
