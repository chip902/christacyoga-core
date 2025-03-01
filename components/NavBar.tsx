"use client";

import { Box, Container, Link as ChakraLink, Flex, IconButton, useDisclosure } from "@chakra-ui/react";
import NextLink from "next/link";
import ShoppingCartPopout from "./ShoppingCartPopout";

export const NavBar = () => {
	const { isOpen, onToggle } = useDisclosure();

	return (
		<Box as="nav" position="fixed" top="0" left="0" right="0" zIndex="1000" bg="white" boxShadow="sm">
			<Container maxW="container.xl" py={4}>
				<Flex justify="space-between" align="center">
					{/* Logo/Home link */}
					<NextLink href="/" passHref legacyBehavior>
						<ChakraLink _hover={{ textDecoration: "none" }} display="flex" alignItems="center">
							{/* Add your logo image or text here */}
							<Box>Logo</Box>
						</ChakraLink>
					</NextLink>

					{/* Navigation Links */}
					<Flex gap={8} display={{ base: "none", md: "flex" }}>
						<NextLink href="/about" passHref legacyBehavior>
							<ChakraLink>About</ChakraLink>
						</NextLink>
						<NextLink href="/classes" passHref legacyBehavior>
							<ChakraLink>Classes</ChakraLink>
						</NextLink>
						<NextLink href="/contact" passHref legacyBehavior>
							<ChakraLink>Contact</ChakraLink>
						</NextLink>
					</Flex>

					{/* Cart */}
					<Box>
						<ShoppingCartPopout />
					</Box>
				</Flex>
			</Container>
		</Box>
	);
};
