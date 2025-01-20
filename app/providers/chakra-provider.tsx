"use client";
// app/providers/chakra-provider.tsx
import { ChakraProvider as ChakraUI, extendTheme } from "@chakra-ui/react";
import { themeConfig } from "../theme.config";
import { SessionProvider } from "next-auth/react";

const theme = extendTheme(themeConfig);

export function ChakraProvider({ children }: { children: React.ReactNode }) {
	return (
		<SessionProvider>
			<ChakraUI theme={theme}>{children}</ChakraUI>
		</SessionProvider>
	);
}
