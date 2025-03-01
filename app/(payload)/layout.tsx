import config from "@payload-config";
import "@payloadcms/next/css";
import type { ServerFunctionClient } from "payload";
import { handleServerFunctions, RootLayout } from "@payloadcms/next/layouts";
import React from "react";
import { importMap } from "./admin/importMap.js";
import "./custom.scss";
import { ChakraProvider } from "@chakra-ui/react";
import { themeConfig } from "@/app/(my-app)/theme.config";
import { NavBar } from "@/components/NavBar";
import { Box } from "@chakra-ui/react";

type Args = {
	children: React.ReactNode;
};

const serverFunction: ServerFunctionClient = async function (args) {
	"use server";
	return handleServerFunctions({
		...args,
		config,
		importMap,
	});
};

const ContentWrapper = ({ children }: { children: React.ReactNode }) => (
	<ChakraProvider theme={themeConfig}>
		<Box className="payload-custom-layout" minH="100vh">
			<NavBar />
			<Box as="main" className="payload-custom-content" pt="60px">
				{children}
			</Box>
		</Box>
	</ChakraProvider>
);

const Layout = ({ children }: Args) => (
	<RootLayout config={config} importMap={importMap} serverFunction={serverFunction}>
		<ContentWrapper>{children}</ContentWrapper>
	</RootLayout>
);

export default Layout;
