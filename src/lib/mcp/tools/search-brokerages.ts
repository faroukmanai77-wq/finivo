import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { supabaseAnon } from "../supabase";

export default defineTool({
  name: "search_brokerages",
  title: "Search brokerage platforms",
  description: "Search Finivo's comparison of Canadian brokerage and investing platforms.",
  inputSchema: {
    query: z.string().trim().optional().describe("Free-text match on platform name."),
    level: z.string().trim().optional().describe("Investor level, e.g. debutant, intermediaire, avance."),
    has_crypto: z.boolean().optional().describe("Only platforms offering crypto trading."),
    has_options: z.boolean().optional().describe("Only platforms offering options trading."),
    limit: z.number().int().optional().describe("Max results (default 10, max 50)."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ query, level, has_crypto, has_options, limit }) => {
    const supabase = supabaseAnon();
    let q = supabase
      .from("brokerage_platforms")
      .select(
        "name, slug, type, transaction_fee_stocks, transaction_fee_etf, monthly_fee, accounts, markets_access, has_options, has_crypto, has_mobile_app, regulation, level, products, strengths, weaknesses, rating, ideal_for, affiliate_link",
      )
      .eq("is_active", true)
      .order("rating", { ascending: false })
      .limit(Math.min(Math.max(limit ?? 10, 1), 50));

    if (query) q = q.ilike("name", `%${query}%`);
    if (level) q = q.eq("level", level);
    if (typeof has_crypto === "boolean") q = q.eq("has_crypto", has_crypto);
    if (typeof has_options === "boolean") q = q.eq("has_options", has_options);

    const { data, error } = await q;
    if (error) return { content: [{ type: "text", text: error.message }], isError: true };
    return {
      content: [{ type: "text", text: JSON.stringify(data ?? []) }],
      structuredContent: { platforms: data ?? [] },
    };
  },
});