export interface ApiFetchOptions extends RequestInit {
    url: string; // API endpoint URL
    setLoading?: (loading: boolean) => void;
    setError?: (error: string | null) => void;
}

/**
 * Utility function for making API calls with centralized error and loading management.
 * 
 * @param options - An object containing the URL and fetch request options, including setLoading and setError.
 * @returns The parsed JSON response as a generic type T.
 */
export async function apiFetch<T>(options: ApiFetchOptions): Promise<T> {
    const { url, setLoading, setError, ...fetchOptions } = options;

    if (setLoading) setLoading(true); // Set loading state to true
    if (setError) setError(null); // Reset any previous errors

    try {
        const response = await fetch(url, fetchOptions);

        // Check if the HTTP response is valid
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Parse and return the JSON response
        return (await response.json()) as T;
    } catch (err: any) {
        if (setError) setError(err.message || "Unknown error"); // Set the error message
        throw err; // Propagate the error for higher-level handling
    } finally {
        if (setLoading) setLoading(false); // Set loading state to false after request completion
    }
}
