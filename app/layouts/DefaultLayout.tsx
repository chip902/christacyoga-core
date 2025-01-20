// app/layouts/DefaultLayout.tsx
import { Box, Container } from "@chakra-ui/react";

export const DefaultLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<Container maxW="container.xl" py={8}>
			<Box>{children}</Box>
		</Container>
	);
};
