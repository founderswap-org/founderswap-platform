'use client';

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type React from "react";
import { useState } from "react";

export const ReactQueryClientProvider = ({
	children,
}: { children: React.ReactNode }) => {
	const [queryClient] = useState(
		() =>
			new QueryClient({
				defaultOptions: {
					queries: {
						staleTime: 60 * 1000, // 1 minute
					},
				},
			}),
	);
	return (
		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
	);
};
