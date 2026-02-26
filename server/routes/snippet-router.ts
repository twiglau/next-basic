import { SnippetSchema } from "@/prisma/validate-schema";
import { router, withSnippetProcedure } from "../trpc-middlewares/trpc";
import { prisma } from "../db";

export const snippetRouter = router({
  create: withSnippetProcedure
    .input(SnippetSchema)
    .mutation(async ({ ctx, input }) => {
      const { title, content } = input;
      const result = await prisma.snippets.create({
        data: {
          title: ctx.snippet.name + " " + title,
          content,
        },
      });
      return result;
    }),
});
