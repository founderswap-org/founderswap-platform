import { corsHeaders } from "../_shared/cors.ts";
import { fetchData } from "../utils/fetch.ts";

Deno.serve(async (req) => {

    // Preflight for CORS
    if (req.method === "OPTIONS") {
        return new Response(null, {
            status: 204,
            headers: corsHeaders
        });
    }

    // If not POST, return 405 with CORS
    if (req.method !== "POST") {
        return new Response(JSON.stringify({ error: "Method not allowed" }), {
            status: 405,
            headers: corsHeaders,
        });
    }

    // Let's start POST request
    const cloudflareTurnTokenId = Deno.env.get("CLOUDFLARE_TURN_TOKEN_ID");
    const cloudflareUrl = `https://rtc.live.cloudflare.com/v1/turn/keys/${cloudflareTurnTokenId}/credentials/generate`;
    const apiTokenKey = Deno.env.get("CLOUDFLARE_TURN_API_TOKEN");

    if (!apiTokenKey || !cloudflareTurnTokenId) {
        return new Response(JSON.stringify({ error: "Missing API token or token ID" }), {
            status: 500,
            headers: corsHeaders,
        });
    }

    const data = await fetchData(cloudflareUrl, apiTokenKey, "POST", { ttl: 86400 });


    return new Response(
        JSON.stringify(data),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
});
