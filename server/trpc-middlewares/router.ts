import { router } from "./trpc";
import { snippetRouter } from "../routes/snippet-router";

const rootRouter = router({
  snippet: snippetRouter,
});

export { rootRouter };
export type RootRouter = typeof rootRouter;
