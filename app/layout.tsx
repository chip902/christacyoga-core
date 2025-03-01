import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import { GoogleTagManager } from "@next/third-parties/google";
import "./globals.css";

const outfit = Outfit({
	subsets: ["latin"],
	display: "swap",
	variable: "--font-outfit",
});

export const metadata: Metadata = {
	title: "Christa C Yoga",
	description: "Find your inner peace through mindful movement",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={outfit.variable}>
				{children}
				<GoogleTagManager gtmId="GTM-XXXXX" />
			</body>
		</html>
	);
}
