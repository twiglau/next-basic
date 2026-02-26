import { rootRouter } from "@/server/trpc-middlewares/router";
import { createCallerFactory } from "@trpc/server/unstable-core-do-not-import";

const trpcServerCaller = createCallerFactory()(rootRouter);

export { trpcServerCaller };
