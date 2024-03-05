import { API } from "$bot/api/index.js";

const gateway = async (ctx, next) => {
  const { from: user } = ctx.update.message;

  try {
    const { data } = await API.post("gateway", user);

    if (!ctx.fortnite) {
      ctx.fortnite = {};
    }

    ctx.fortnite.user = data.user;

    next();
  } catch (error) {
    await ctx.reply(error.response.data.message);

    next();
  }
};

export default gateway;
