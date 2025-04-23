export async function fetchData(endpoint: string, apiKey: string, method = "POST", body: object | null = null) {
    try {

        const response = await fetch(endpoint, {
            method,
            headers: {
                "Authorization": `Bearer ${apiKey}`,
                "Content-Type": "application/json",

            },
            body: body ? JSON.stringify(body) : null,
        });

        if (!response.ok) {
            return { error: "Failed to fetch data", status: response.status };
        }

        return await response.json();
    } catch (error) {
        return { error: error.message };
    }
}
