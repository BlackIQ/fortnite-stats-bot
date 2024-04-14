import { API } from "$bot/api/index.js";

export const BASIC = async (ctx) => {
  const { _id: user } = ctx.fortnite.user;

  try {
    const { data: response } = await API.get(`reports/basic`, {
      params: { user },
    });

    const baseData = [
      "Basic log",
      "",
      `All users: ${response.countAllUsers}`,
      `Users with username: ${response.countVerifiedUsers}`,
    ];

    const topSearchsMessages = ["Top searchs:"];

    await Promise.all(
      response.topSearchedUsernames.map((topSearch) =>
        topSearchsMessages.push(`${topSearch._id} - ${topSearch.count} Times`)
      )
    );

    const userGroth = ["User groth:"];

    await Promise.all(
      response.userRegistrationsByDate.map((userRegistration) =>
        userGroth.push(
          `${userRegistration.date} - ${userRegistration.count} User(s)`
        )
      )
    );

    const messages = [...baseData, "", ...topSearchsMessages, "", ...userGroth];

    const message = messages.join("\n");

    return await ctx.reply(message);
  } catch (error) {
    return await ctx.reply(error.response.data.message);
  }
};
