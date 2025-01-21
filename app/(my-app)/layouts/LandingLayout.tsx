// app/layouts/LandingLayout.tsx
import { Box, Container, Stack } from "@chakra-ui/react";
import EnhancedHero from "@/components/EnhancedHero";

interface LayoutProps {
	children: React.ReactNode;
}

export const LandingLayout: React.FC<LayoutProps> = ({ children }) => {
	return (
		<Box>
			{/* Full width hero section */}
			<EnhancedHero />

			{/* Main content with wider max width for landing pages */}
			<Container maxW="container.xl" py={16}>
				<Stack spacing={12}>{children}</Stack>
			</Container>

			{/* Optional: Add sections that should appear on all landing pages */}
			<Box bg="brand.50" py={16}>
				<Container maxW="container.xl">{/* Newsletter signup, testimonials, or other consistent landing page elements */}</Container>
			</Box>
		</Box>
	);
};
