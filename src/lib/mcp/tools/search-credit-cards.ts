import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { supabaseAnon } from "../supabase";

export default defineTool({
  name: "search_credit_cards",
  title: "Search credit cards",
  description:
    "Search Finivo's Canadian credit card comparison data by name, issuer, category, annual fee or rewards.",
  inputSchema: {
    query: z.string().trim().optional().describe("Free-text match on card name or issuer."),
    category: z.string().trim().optional().describe("Category filter, e.g. cashback, voyage, etudiant."),
    max_annual_fee: z.number().optional().describe("Only cards with an annual fee at or below this amount."),
    limit: z.number().int().optional().describe("Max number of cards to return (default 10, max 50)."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ query, category, max_annual_fee, limit }) => {
    const supabase = supabaseAnon();
    let q = supabase
      .from("credit_cards")
      .select(
        "name, issuer, slug, annual_fee, first_year_free, interest_rate, rewards_rate, rewards_type, welcome_bonus, min_income, categories, features, rating, affiliate_link",
      )
      .eq("is_active", true)
      .order("rating", { ascending: false })
      .limit(Math.min(Math.max(limit ?? 10, 1), 50));

    if (query) q = q.or(`name.ilike.%${query}%,issuer.ilike.%${query}%`);
    if (category) q = q.contains("categories", [category]);
    if (typeof max_annual_fee === "number") q = q.lte("annual_fee", max_annual_fee);

    const { data, error } = await q;
    if (error) return { content: [{ type: "text", text: error.message }], isError: true };
    return {
      content: [{ type: "text", text: JSON.stringify(data ?? []) }],
      structuredContent: { cards: data ?? [] },
    };
  },
});