// app/theme.config.ts
import { type ThemeConfig } from "@chakra-ui/react";

export const config: ThemeConfig = {
	initialColorMode: "light",
	useSystemColorMode: false,
};

export const colors = {
	brand: {
		50: "#f7f7f2",
		100: "#e8e6d9",
		200: "#d4d1bf",
		300: "#bfbba3",
		400: "#aaa588",
		500: "#958f6d",
		600: "#777257",
		700: "#595542",
		800: "#3b382c",
		900: "#1e1c16",
	},
	sage: {
		50: "#f2f5f3",
		100: "#dce3de",
		200: "#c5d1c8",
		300: "#adbeb2",
		400: "#96ac9c",
		500: "#7f9a86",
		600: "#657b6b",
		700: "#4c5c50",
		800: "#323e36",
		900: "#191f1b",
	},
};

export const themeConfig = {
	config,
	colors,
	fonts: {
		heading: "var(--font-outfit)",
		body: "var(--font-outfit)",
	},
	components: {
		Button: {
			baseStyle: {
				borderRadius: "full",
			},
			variants: {
				solid: {
					bg: "brand.500",
					color: "white",
					_hover: {
						bg: "brand.600",
					},
				},
				outline: {
					borderColor: "brand.500",
					color: "brand.500",
					_hover: {
						bg: "brand.50",
					},
				},
			},
		},
		Heading: {
			baseStyle: {
				color: "brand.700",
				letterSpacing: "1.2rem",
			},
		},
	},
	styles: {
		global: {
			body: {
				bg: "white",
				color: "brand.800",
				fontFamily: "var(--font-outfit)",
			},
		},
	},
};
