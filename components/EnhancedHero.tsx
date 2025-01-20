// components/EnhancedHero.tsx
"use client";
import React, { useEffect } from "react";
import { Box, Container, Heading, Text, useDisclosure, SlideFade } from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

const EnhancedHero = () => {
	const { isOpen, onOpen } = useDisclosure();

	useEffect(() => {
		onOpen();
	}, [onOpen]);

	return (
		<Box position="relative" height="100vh" width="100%" overflow="hidden">
			<MotionBox
				position="absolute"
				top={0}
				left={0}
				right={0}
				bottom={0}
				initial={{ scale: 1.2 }}
				animate={{
					scale: 1,
					transition: { duration: 15, ease: "easeOut" },
				}}>
				<Box
					as="img"
					src="/practice_hero.jpeg"
					alt="Yoga Logo"
					width="100%"
					height="100%"
					objectFit="cover"
					opacity={0.85}
					filter="brightness(0.8)"
				/>
			</MotionBox>

			<Container
				maxW="container.xl"
				height="100%"
				position="relative"
				display="flex"
				flexDirection="column"
				justifyContent="center"
				alignItems="center"
				textAlign="center">
				<SlideFade in={isOpen} offsetY="20px">
					<Heading as="h1" fontSize={{ base: "4xl", md: "6xl", lg: "7xl" }} color="white" textShadow="2px 2px 4px rgba(0,0,0,0.3)" mb={6}>
						Christa C Yoga
					</Heading>
				</SlideFade>

				<SlideFade in={isOpen} offsetY="20px" delay={0.2}>
					<Text fontSize={{ base: "lg", md: "xl", lg: "2xl" }} color="white" textShadow="1px 1px 2px rgba(0,0,0,0.3)" maxW="2xl">
						Begin your journey to wellness through mindful movement and meditation
					</Text>
				</SlideFade>
			</Container>
		</Box>
	);
};

export default EnhancedHero;
