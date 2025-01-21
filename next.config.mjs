// next.config.mjs
/** @type {import('next').NextConfig} */

import { withPayload } from '@payloadcms/next/withPayload'

const nextConfig = {
	webpack: (config) => {
		config.module = {
			...config.module,
			exprContextCritical: false,
			noParse: [/@swc[\\\/]core-darwin-arm64/],
		};
		return config;
	},
	experimental: {
		reactCompiler: false,
		swcPlugins: [],
	},

};

export default withPayload(nextConfig);