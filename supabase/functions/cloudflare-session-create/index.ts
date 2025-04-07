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

    const apiToken = Deno.env.get("CLOUDFLARE_CALLS_API_TOKEN");
    const appId = Deno.env.get("CLOUDFLARE_CALLS_APP_ID");

    if (!apiToken || !appId) {
        return new Response(JSON.stringify({ error: "Missing API token or App ID" }), {
            status: 500,
            headers: corsHeaders,
        });
    }
    const data = await fetchData(`https://rtc.live.cloudflare.com/apps/${appId}/sessions/new`, apiToken);

    return new Response(JSON.stringify(data), {
        status: data.error ? 500 : 200,
        headers: corsHeaders,
    });
});
