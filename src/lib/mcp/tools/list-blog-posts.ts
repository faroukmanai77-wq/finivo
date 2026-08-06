import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { supabaseAnon } from "../supabase";

export default defineTool({
  name: "list_blog_posts",
  title: "List blog posts",
  description: "List published Finivo blog articles with title, slug, excerpt and category.",
  inputSchema: {
    query: z.string().trim().optional().describe("Free-text match on title or excerpt."),
    category: z.string().trim().optional().describe("Article category filter."),
    limit: z.number().int().optional().describe("Max results (default 10, max 50)."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ query, category, limit }) => {
    const supabase = supabaseAnon();
    let q = supabase
      .from("blog_posts")
      .select(
        "title, title_en, slug, excerpt, excerpt_en, category, tags, author, read_time, published_at, is_featured, cover_image_url",
      )
      .eq("is_active", true)
      .order("published_at", { ascending: false })
      .limit(Math.min(Math.max(limit ?? 10, 1), 50));

    if (query) q = q.or(`title.ilike.%${query}%,excerpt.ilike.%${query}%`);
    if (category) q = q.eq("category", category);

    const { data, error } = await q;
    if (error) return { content: [{ type: "text", text: error.message }], isError: true };
    return {
      content: [{ type: "text", text: JSON.stringify(data ?? []) }],
      structuredContent: { posts: data ?? [] },
    };
  },
});