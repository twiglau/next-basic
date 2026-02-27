import { snippetSchema } from "@/prisma/validate-schema";
import { router, withSnippetProcedure } from "../trpc-middlewares/trpc";
import { prisma } from "../db";
import { z } from "zod";

export const snippetRouter = router({
  create: withSnippetProcedure
    .input(snippetSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        const { title, content } = input;
        const result = await prisma.snippets.create({
          data: {
            title: ctx.snippet.name + " " + title,
            content,
          },
        });
        return result;
      } catch (error) {
        console.error("[ERROR] snippet.create failed:", error);
        throw error;
      }
    }),
  detail: withSnippetProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      try {
        const result = await prisma.snippets.findUnique({
          where: {
            id: Number(input.id),
          },
        });
        return result;
      } catch (error) {
        console.error("[ERROR] snippet.detail failed:", error);
        throw error;
      }
    }),
  lists: withSnippetProcedure.query(async ({ ctx }) => {
    try {
      const result = await prisma.snippets.findMany({});
      return result;
    } catch (error) {
      console.error("[ERROR] snippet.lists failed:", error);
      throw error;
    }
  }),
  delete: withSnippetProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 10000));
        const result = await prisma.snippets.delete({
          where: {
            id: Number(input.id),
          },
        });
        return result;
      } catch (error) {
        console.error("[ERROR] snippet.delete failed:", error);
        throw error;
      }
    }),
  update: withSnippetProcedure
    .input(snippetSchema)
    .mutation(async ({ input }) => {
      try {
        const { title, content, id } = input;
        const result = await prisma.snippets.update({
          where: {
            id: Number(id),
          },
          data: {
            title,
            content,
          },
        });
        return result;
      } catch (error) {
        console.error("[ERROR] snippet.update failed:", error);
        throw error;
      }
    }),
});
