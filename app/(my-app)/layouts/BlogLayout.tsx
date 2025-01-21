// app/layouts/BlogLayout.tsx
import { Box, Container, Grid, GridItem } from "@chakra-ui/react";

interface LayoutProps {
	children: React.ReactNode;
}

export const BlogLayout: React.FC<LayoutProps> = ({ children }) => {
	return (
		<Box py={8}>
			<Container maxW="container.xl">
				<Grid templateColumns={{ base: "1fr", md: "3fr 1fr" }} gap={8}>
					{/* Main content area */}
					<GridItem>
						<Box bg="white" borderRadius="lg" boxShadow="sm" p={{ base: 4, md: 8 }}>
							{children}
						</Box>
					</GridItem>

					{/* Sidebar */}
					<GridItem display={{ base: "none", md: "block" }}>
						<Stack gap={6}>
							{/* Search Box */}
							<Box bg="white" borderRadius="lg" boxShadow="sm" p={6}>
								{/* Add search component here */}
							</Box>

							{/* Categories */}
							<Box bg="white" borderRadius="lg" boxShadow="sm" p={6}>
								{/* Add categories component here */}
							</Box>

							{/* Recent Posts */}
							<Box bg="white" borderRadius="lg" boxShadow="sm" p={6}>
								{/* Add recent posts component here */}
							</Box>
						</Stack>
					</GridItem>
				</Grid>
			</Container>
		</Box>
	);
};

// Sidebar components can be added later based on your needs
const Stack = Box;
