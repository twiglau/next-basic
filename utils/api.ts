import { createTRPCReact } from "@trpc/react-query";
import { RootRouter } from "@/server/trpc-middlewares/router";
import { httpBatchLink } from "@trpc/client";

const trpcClientReact = createTRPCReact<RootRouter>({});

const trpcPureClient = trpcClientReact.createClient({
  links: [httpBatchLink({ url: "/api/trpc" })],
});

export { trpcClientReact, trpcPureClient };
export type { RootRouter };
