// app/admin/[...segments]/page.tsx
"use client";

import { useEffect } from "react";
import { Box, Spinner, Center } from "@chakra-ui/react";
import React from "react";

export default function AdminPage() {
	useEffect(() => {
		window.location.href = "/api/admin";
	}, []);

	return (
		<Center h="100vh">
			<Box textAlign="center">
				<Spinner size="xl" mb={4} />
				<Box>Loading admin panel...</Box>
			</Box>
		</Center>
	);
}
