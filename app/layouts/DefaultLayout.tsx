// app/layouts/DefaultLayout.tsx
import { Box, Container } from "@chakra-ui/react";

interface LayoutProps {
	children: React.ReactNode;
}

export const DefaultLayout: React.FC<LayoutProps> = ({ children }) => {
	return (
		<Container maxW="container.xl" py={8}>
			<Box>{children}</Box>
		</Container>
	);
};
