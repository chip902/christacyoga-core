"use client";
// app/components/layout/site-layout.tsx
import { Box } from "@chakra-ui/react";
import { NavBar } from "../NavBar";
import PrivacyBanner from "../PrivacyBanner";
import useResponsive from "@/app/hooks/useResponsive";
import ShoppingCartPopout from "../ShoppingCartPopout";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
	const isResponsive = useResponsive();

	return (
		<>
			<NavBar />
			<Box as="main" width="100%">
				{children}
			</Box>
			<PrivacyBanner />
			{isResponsive && (
				<Box position="fixed" bottom={4} right={4} zIndex={10}>
					<ShoppingCartPopout />
				</Box>
			)}
		</>
	);
}
