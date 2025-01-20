"use client";
// app/providers/root-provider.tsx
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider as NextThemeProvider } from "next-themes";
import { themeConfig } from "../theme.config";

const theme = extendTheme(themeConfig);
const queryClient = new QueryClient();

export function RootProvider({ children }: { children: React.ReactNode }) {
	return (
		<QueryClientProvider client={queryClient}>
			<NextThemeProvider attribute="class">
				<ChakraProvider theme={theme}>{children}</ChakraProvider>
			</NextThemeProvider>
		</QueryClientProvider>
	);
}
