// app/(my-app)/providers/root-provider.tsx
"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { QueryClientProvider } from "@tanstack/react-query";
import { QueryClient } from "@tanstack/query-core";
import { ThemeProvider } from "next-themes";
import { extendTheme } from "@chakra-ui/react";
import { themeConfig } from "../theme.config";
import { useState } from "react";

const theme = extendTheme(themeConfig);

export function RootProvider({ children }: { children: React.ReactNode }) {
	// Create a new QueryClient instance for each session
	const [queryClient] = useState(
		() =>
			new QueryClient({
				defaultOptions: {
					queries: {
						staleTime: 60 * 1000, // 1 minute
					},
				},
			})
	);

	return (
		<QueryClientProvider client={queryClient}>
			<ThemeProvider defaultTheme="system" attribute="class">
				<ChakraProvider theme={theme}>{children}</ChakraProvider>
			</ThemeProvider>
		</QueryClientProvider>
	);
}
