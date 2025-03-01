"use client";

import { Box, ChakraProvider } from "@chakra-ui/react";
import { themeConfig } from "./theme.config";
import { NavBar } from "@/components/NavBar";
import SiteLayout from "@/components/layout/site-layout";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function MyAppLayout({ children }: { children: React.ReactNode }) {
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
			<ChakraProvider theme={themeConfig}>
				<SiteLayout>
					<NavBar />
					<Box pt="60px">{children}</Box>
				</SiteLayout>
			</ChakraProvider>
		</QueryClientProvider>
	);
}
