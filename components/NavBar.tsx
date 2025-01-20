// components/NavBar/NavBar.tsx
import { Box, Container, HStack, Button, Image } from "@chakra-ui/react";
import NextLink from "next/link";

export const NavBar = () => {
	return (
		<Box as="nav" position="fixed" top="0" left="0" right="0" zIndex="1000" bg="white" boxShadow="sm" width="100%" margin="0" padding="0">
			<Container maxW="container.xl" py={4} display="flex" justifyContent="space-between" alignItems="center">
				<NextLink href="/" passHref>
					<Box as="a">
						<Image src="/logo/logo_324x324.jpg" alt="Logo" h="50px" w="auto" objectFit="contain" />
					</Box>
				</NextLink>

				<HStack spacing={8}>
					<NextLink href="/" passHref>
						<Button as="a" variant="ghost">
							Home
						</Button>
					</NextLink>
					<NextLink href="/about" passHref>
						<Button as="a" variant="ghost">
							About
						</Button>
					</NextLink>
					<NextLink href="/classes" passHref>
						<Button as="a" variant="ghost">
							Classes
						</Button>
					</NextLink>
					<NextLink href="/workshops" passHref>
						<Button as="a" variant="ghost">
							Workshops
						</Button>
					</NextLink>
					<NextLink href="/contact" passHref>
						<Button as="a" variant="ghost">
							Contact
						</Button>
					</NextLink>
					<NextLink href="/auth/login" passHref>
						<Button as="a" variant="solid" colorScheme="brand">
							Sign In
						</Button>
					</NextLink>
				</HStack>
			</Container>
		</Box>
	);
};
