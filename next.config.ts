/** @type {import('next').NextConfig} */
const nextConfig = {
	webpack: (config, { isServer }) => {
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
	rewrites: async () => {
		return [
			{
				source: "/admin",
				destination: "/api/payload/admin",
			},
			{
				source: "/admin/:path*",
				destination: "/api/payload/admin/:path*",
			},
		];
	},
};

export default nextConfig;
