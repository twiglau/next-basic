import { z } from "zod";

export const snippetSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(2, "至少2位字符").max(50, "最多50位字符"),
  content: z.string(),
});

export type SnippetType = z.infer<typeof snippetSchema>;
