
// Follow this setup guide: https://supabase.com/docs/guides/functions/quickstart

import { serve } from "https://deno.land/std@0.177.0/http/server.ts";

interface ChatRequest {
  message: string;
}

serve(async (req) => {
  try {
    // Extract the message from request body
    const { message } = await req.json() as ChatRequest;
    
    if (!message) {
      return new Response(
        JSON.stringify({ error: "Message is required" }),
        { headers: { "Content-Type": "application/json" }, status: 400 }
      );
    }

    // Get API key from environment variables
    const apiKey = Deno.env.get("TOGETHER_API_KEY");
    
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: "API key not configured" }),
        { headers: { "Content-Type": "application/json" }, status: 500 }
      );
    }

    console.log("Calling Together API with message:", message);

    // Call Together AI API
    const response = await fetch("https://api.together.xyz/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "Qwen/Qwen3-235B-A22B-fp8-tput",
        messages: [
          { 
            role: "system", 
            content: "You are a helpful German language tutor named Hein. Respond to users with helpful information about German language, grammar, vocabulary, and conversation. If appropriate, include translations and explanations."
          },
          { role: "user", content: message }
        ]
      })
    });

    const data = await response.json();
    
    if (!response.ok) {
      console.error("API Error:", data);
      return new Response(
        JSON.stringify({ error: "Failed to get response from AI service", details: data }),
        { headers: { "Content-Type": "application/json" }, status: response.status }
      );
    }
    
    console.log("Successfully received response from Together API");
    
    return new Response(
      JSON.stringify({ 
        reply: data.choices[0].message.content
      }),
      { headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" } }
    );
  } catch (error) {
    console.error("Error:", error.message);
    
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { "Content-Type": "application/json" }, status: 500 }
    );
  }
});
