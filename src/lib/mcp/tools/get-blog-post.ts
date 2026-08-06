import { defineTool, ToolError } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { supabaseAnon } from "../supabase";

export default defineTool({
  name: "get_blog_post",
  title: "Get blog post",
  description: "Get the full content of one published Finivo blog article by its slug.",
  inputSchema: {
    slug: z.string().trim().min(1).describe("The article slug, from list_blog_posts."),
    language: z.enum(["fr", "en"]).optional().describe("Preferred language (default fr)."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ slug, language }) => {
    const supabase = supabaseAnon();
    const { data, error } = await supabase
      .from("blog_posts")
      .select(
        "title, title_en, slug, excerpt, excerpt_en, content, content_en, category, tags, author, read_time, published_at, cover_image_url",
      )
      .eq("is_active", true)
      .eq("slug", slug)
      .maybeSingle();

    if (error) throw new ToolError(error.message);
    if (!data) throw new ToolError(`No published article found for slug "${slug}".`);

    const en = language === "en";
    const post = {
      ...data,
      title: (en && data.title_en) || data.title,
      excerpt: (en && data.excerpt_en) || data.excerpt,
      content: (en && data.content_en) || data.content,
    };
    return {
      content: [{ type: "text", text: JSON.stringify(post) }],
      structuredContent: { post },
    };
  },
});