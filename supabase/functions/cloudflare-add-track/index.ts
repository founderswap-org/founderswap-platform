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

    const { sessionId, trackData } = await req.json();
    const apiToken = Deno.env.get("CLOUDFLARE_CALLS_API_TOKEN");
    const appId = Deno.env.get("CLOUDFLARE_CALLS_APP_ID");

    console.log('TRACK DATA: ', trackData)

    if (!apiToken || !appId || !sessionId || !trackData) {
        return new Response(JSON.stringify({ error: "Missing required fields" }), {
            status: 400,
            headers: corsHeaders
        });
    }


    const cleanedString = trackData.replace(/\n/g, "").replace(/\r/g, ""); // Remove newline
    const parsedJson = JSON.parse(cleanedString);
    console.log(parsedJson);


    const data = await fetchData(`https://api.cloudflare.com/client/v4/apps/${appId}/sessions/${sessionId}/tracks/new`, apiToken, "POST", parsedJson);

    console.log('GOT DATA: ', data)
    console.error('ERROR', data.error)

    return new Response(JSON.stringify(data), {
        status: data.error ? 500 : 200,
        headers: corsHeaders
    });
});
