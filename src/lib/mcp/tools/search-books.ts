import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { supabaseAnon } from "../supabase";

export default defineTool({
  name: "search_books",
  title: "Search finance books",
  description: "Search Finivo's curated library of personal finance and investing books.",
  inputSchema: {
    query: z.string().trim().optional().describe("Free-text match on title or author."),
    category: z.string().trim().optional().describe("Book category filter."),
    level: z.string().trim().optional().describe("Reader level, e.g. beginner, intermediate, advanced."),
    language: z.string().trim().optional().describe("Book language code, e.g. FR or EN."),
    limit: z.number().int().optional().describe("Max results (default 10, max 50)."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ query, category, level, language, limit }) => {
    const supabase = supabaseAnon();
    let q = supabase
      .from("books")
      .select(
        "title, author, slug, category, sub_categories, level, language, short_description, why_read_this_book, reader_profile, themes, quote, rating, affiliate_link, cover_image_url",
      )
      .eq("is_active", true)
      .limit(Math.min(Math.max(limit ?? 10, 1), 50));

    if (query) q = q.or(`title.ilike.%${query}%,author.ilike.%${query}%`);
    if (category) q = q.eq("category", category);
    if (level) q = q.eq("level", level);
    if (language) q = q.eq("language", language);

    const { data, error } = await q;
    if (error) return { content: [{ type: "text", text: error.message }], isError: true };
    return {
      content: [{ type: "text", text: JSON.stringify(data ?? []) }],
      structuredContent: { books: data ?? [] },
    };
  },
});