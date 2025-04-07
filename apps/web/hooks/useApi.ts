
import { createClient } from "@/utils/supabase/client";
import { useState } from "react";

type iceServers = {
    urls: string[]
    username: string
    credential: string
}
type CredentialsData = {
    iceServers: iceServers
}

type FetchStatus = { isLoading: boolean, error: string | null }

export type PayloadType = {
    sessionId: string;
    trackData: {
        sessionDescription: {
            sdp?: string;
            type: string;
        };
        tracks: {
            location: string;
            mid: string | null;
            trackName: string;
        }[];
    };
}

type FetchOptions = {
    options: {
        body: string
    }
}

const useApi = () => {

    const [fetchStatus, setFetchStatus] = useState<FetchStatus>({
        isLoading: false,
        error: null
    })

    const supabaseClient = createClient()


    const fetchCreateCallSession = async () => {

        setFetchStatus({
            isLoading: true,
            error: null
        })

        try {
            return await supabaseClient.functions.invoke<string>("cloudflare-session-create");
        } catch (err: any) {
            setFetchStatus({
                error: err,
                isLoading: false
            })
            console.error("Error fetching TURN credentials:", err);
            throw err;
        } finally {
            setFetchStatus({
                ...fetchStatus,
                isLoading: false
            })
        }
    };

    const fetchTurnCredentials = async () => {

        setFetchStatus({
            isLoading: true,
            error: null
        })

        try {
            return await supabaseClient.functions.invoke<CredentialsData>("cloudflare-turn");
        } catch (err: any) {
            setFetchStatus({
                error: err,
                isLoading: false
            })
            console.error("Error fetching TURN credentials:", err);
            throw err;
        } finally {
            setFetchStatus({
                ...fetchStatus,
                isLoading: false
            })
        }
    };

    const fetchAddTrack = async ({ options }: FetchOptions) => {

        console.log('fetchAddTrack options', options)

        setFetchStatus({
            isLoading: true,
            error: null
        })

        try {
            return await supabaseClient.functions.invoke("cloudflare-add-track", options);
        } catch (err: any) {
            setFetchStatus({
                error: err,
                isLoading: false
            })
            console.error("Error fetching TURN credentials:", err);
            throw err;
        } finally {
            setFetchStatus({
                ...fetchStatus,
                isLoading: false
            })
        }
    };

    const fetchGetSessionInfo = async ({ options }: FetchOptions) => {

        setFetchStatus({
            isLoading: true,
            error: null
        })

        try {
            return await supabaseClient.functions.invoke("cloudflare-session-info", options);
        } catch (err: any) {
            setFetchStatus({
                error: err,
                isLoading: false
            })
            console.error("Error fetching TURN credentials:", err);
            throw err;
        } finally {
            setFetchStatus({
                ...fetchStatus,
                isLoading: false
            })
        }
    };

    const fetchRenegotiate = async ({ options }: FetchOptions) => {

        setFetchStatus({
            isLoading: true,
            error: null
        })

        try {
            return await supabaseClient.functions.invoke("cloudflare-renegotiate", options);
        } catch (err: any) {
            setFetchStatus({
                error: err,
                isLoading: false
            })
            console.error("Error fetching TURN credentials:", err);
            throw err;
        } finally {
            setFetchStatus({
                ...fetchStatus,
                isLoading: false
            })
        }
    };



    return { fetchCreateCallSession, fetchTurnCredentials, fetchAddTrack, fetchGetSessionInfo, fetchRenegotiate, isLoading: fetchStatus.isLoading, error: fetchStatus.error };
};

export default useApi;
