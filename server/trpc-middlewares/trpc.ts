import { initTRPC } from "@trpc/server";

const t = initTRPC.create();
const { router, procedure } = t;

const loggedMiddleware = t.middleware(async ({ next, ctx }) => {
  const start = Date.now();
  const result = await next();
  const duration = Date.now() - start;

  console.log(`[DEBUG] api time: ${duration}ms`);
  return result;
});
