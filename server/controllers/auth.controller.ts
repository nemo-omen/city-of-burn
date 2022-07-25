import { Context } from '../deps.ts';

const register = async (ctx: Context) => {
  const request = await ctx.request.body().value;

  ctx.response.body = { request };
};

export { register };