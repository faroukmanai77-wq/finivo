import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { articleId, content, excerpt, tags } = await req.json();
    
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // Translate content
    const contentResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          {
            role: "system",
            content: `You are a professional translator. Translate the following French blog article content to English. 
            
Rules:
- Keep ALL markdown formatting exactly as is (##, ###, -, *, **, etc.)
- Keep ALL emojis exactly as they appear
- Keep Canadian financial terms accurate (RRSP, TFSA, FHSA, etc.)
- Translate naturally for a Canadian English audience
- Do NOT add any introduction or explanation, just provide the translated content directly`
          },
          {
            role: "user",
            content: content
          }
        ],
      }),
    });

    if (!contentResponse.ok) {
      const errorText = await contentResponse.text();
      console.error("AI gateway error:", contentResponse.status, errorText);
      throw new Error(`AI translation failed: ${contentResponse.status}`);
    }

    const contentData = await contentResponse.json();
    const translatedContent = contentData.choices?.[0]?.message?.content;

    // Translate excerpt
    const excerptResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          {
            role: "system",
            content: "Translate this French excerpt to English. Keep it concise and natural for Canadian readers. Provide only the translation, no explanations."
          },
          {
            role: "user",
            content: excerpt
          }
        ],
      }),
    });

    const excerptData = await excerptResponse.json();
    const translatedExcerpt = excerptData.choices?.[0]?.message?.content;

    // Translate tags
    const tagsResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          {
            role: "system",
            content: "Translate these French tags to English. Return only the translated tags as a JSON array. Use Canadian financial terminology (RRSP instead of 401k, TFSA, FHSA, etc.)."
          },
          {
            role: "user",
            content: JSON.stringify(tags)
          }
        ],
      }),
    });

    const tagsData = await tagsResponse.json();
    let translatedTags: string[] = [];
    try {
      const tagsContent = tagsData.choices?.[0]?.message?.content || "[]";
      // Extract JSON array from response
      const jsonMatch = tagsContent.match(/\[.*\]/s);
      if (jsonMatch) {
        translatedTags = JSON.parse(jsonMatch[0]);
      }
    } catch (e) {
      console.error("Failed to parse tags:", e);
      translatedTags = tags; // Fallback to original
    }

    // Update database
    const { error: updateError } = await supabase
      .from("blog_posts")
      .update({
        content_en: translatedContent,
        excerpt_en: translatedExcerpt,
        tags_en: translatedTags,
      })
      .eq("id", articleId);

    if (updateError) {
      throw updateError;
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        articleId,
        preview: translatedContent?.substring(0, 200) + "..."
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Translation error:", error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : "Translation failed" 
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
