const ids = [1133695614, 5347152997];

const admin = async (ctx, next) => {
  const { id } = ctx.message.chat;

  if (ids.includes(id)) next();
  else return await ctx.reply("You are not admin");
};

export default admin;
