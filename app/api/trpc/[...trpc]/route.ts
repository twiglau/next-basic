import { NextRequest } from "next/server";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { rootRouter } from "@/server/trpc-middlewares/router";

const handler = (request: NextRequest) => {
  return fetchRequestHandler({
    endpoint: "/api/trpc",
    req: request,
    router: rootRouter,
  });
};

export { handler as GET, handler as POST };
