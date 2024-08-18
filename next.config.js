/** @type {import('next').NextConfig} */
const nextConfig = {
    compiler: {
        styledComponents: true,
    },
    // async rewrites() {
    // 	return [
    // 		{
    // 			source: "/api/:path*",
    // 			destination: "/api/:path*",
    // 		},
    // 	];
    // },
    // images: {
    // 	domains: [
    // 		"uploadthing.com",
    // 		"utfs.io",
    // 		"img.clerk.com",
    // 		"subdomain",
    // 		"files.stripe.com",
    // 		"nexusconjure.com",
    // 	],
    // },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "uploadthing.com",
                pathname: "**",
            },
            {
                protocol: "https",
                hostname: "utfs.io",
                pathname: "**",
            },
            {
                protocol: "https",
                hostname: "img.clerk.com",
                pathname: "**",
            },

            {
                protocol: "https",
                hostname: "subdomain",
                pathname: "**",
            },
            {
                protocol: "https",
                hostname: "files.stripe.com",
                pathname: "**",
            },
            {
                protocol: "https",
                hostname: "nexusconjure.com",
                pathname: "**",
            },
            {
                protocol: "https",
                hostname: "files.cdn.printful.com",
                pathname: "**",
            },
            {
                protocol: "https",
                hostname: "firebasestorage.googleapis.com",
                pathname: "**",
            },
        ],
    },
    env: {
        stripe_public_key: process.env.STRIPE_PUBLIC_KEY,
        printful_client_id: process.env.PRINTFUL_CLIENT_ID,
        NEXTAUTH_URL: process.env.NEXTAUTH_URL,
        NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    },
    // experimental: {
    //     serverActions: true,
    // },
    // future: {
    //     webpack5: true,
    // },
    webpack: (config, { isServer }) => {
        config.experiments = config.experiments || {};
        config.experiments.topLevelAwait = true;
        config.module.rules.push({
            test: /\.svg$/i,
            issuer: /\.[jt]sx?$/,
            use: [
                {
                    loader: "@svgr/webpack",
                    options: {
                        typescript: true,
                        ext: "tsx",
                    },
                },
                // {
                //     test: /\.ts$/,
                //     loader: "babel-loader",
                //     exclude: /node_modules/,
                // },
                // {
                //     test: /\.ts$/,
                //     exclude: /node_modules/,
                //     use: ["babel-loader"],
                // },
                // {
                //     test: /\.css$/,
                //     use: ["style-loader", "css-loader"],
                // },
                // {
                //     test: /\.tsx?$/,
                //     loader: "babel-loader",
                //     exclude: /node_modules/,
                //     query: {
                //         presets: ["es2015"],
                //     },
                // },
                // {
                //     loader: "file-loader",
                // },
                // {
                //     loader: "svgo-loader",
                //     options: {
                //         configFile: "./svgo.config.js",
                //     },
                // },
            ],
        });
        // Additional loaders (modified to work with Next.js)
        // config.module.rules.push({
        //     test: /\.(ts|tsx)$/,
        //     exclude: /node_modules/,
        //     use: [
        //         {
        //             loader: "babel-loader",
        //             options: {
        //                 presets: ["next/babel"],
        //             },
        //         },
        //     ],
        // });

        // config.module.rules.push({
        //     test: /\.css$/,
        //     use: ["style-loader", "css-loader"],
        // });
        config.experiments = {
            ...config.experiments,
            asyncWebAssembly: true,
        };

        // Optionally, add a rule for .wasm files
        config.module.rules.push({
            test: /\.wasm$/,
            type: "webassembly/async",
        });

        // If you're using React Native
        // if (!isServer) {
        //     config.resolve.fallback = {
        //         ...config.resolve.fallback,
        //         fs: false,
        //         net: false,
        //         tls: false,
        //         events: require.resolve("events"),
        //     };
        // }

        if (!isServer) {
            config.resolve.fallback = {
                ...config.resolve.fallback,
                fs: false,
                net: false,
                tls: false,
                crypto: false,
                stream: false,
                util: false,
                // crypto: require.resolve("crypto-browserify"),
                // stream: require.resolve("stream-browserify"),
                // util: require.resolve("util/"),
                events: require.resolve("events"),
            };
        }

        // if (!isServer) {
        //     config.resolve.fallback = {
        //         events: require.resolve("events"),
        //     };
        // }
        return config;
    },
    reactStrictMode: false,
    i18n: {
        locales: ["en", "ja"],
        defaultLocale: "en",
        localeDetection: false,
    },
};

module.exports = nextConfig;

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//     images: {
//         remotePatterns: [
//             {
//                 protocol: "https",
//                 hostname: "uploadthing.com",
//                 pathname: "**",
//             },
//             {
//                 protocol: "https",
//                 hostname: "utfs.io",
//                 pathname: "**",
//             },
//             {
//                 protocol: "https",
//                 hostname: "img.clerk.com",
//                 pathname: "**",
//             },
//             {
//                 protocol: "https",
//                 hostname: "subdomain",
//                 pathname: "**",
//             },
//             {
//                 protocol: "https",
//                 hostname: "files.stripe.com",
//                 pathname: "**",
//             },
//             {
//                 protocol: "https",
//                 hostname: "nexusconjure.com",
//                 pathname: "**",
//             },
//         ],
//     },
//     webpack: (config, { isServer }) => {
//         if (!isServer) {
//             config.resolve.fallback = {
//                 events: require.resolve("events"),
//             };
//         }
//         config.experiments = config.experiments || {};
//         config.experiments.topLevelAwait = true;
//         config.module.rules.push({
//             test: /\.svg$/i,
//             issuer: /\.[jt]sx?$/,
//             use: ["@svgr/webpack"],
//         });
//         config.module.rules.push({
//             test: /\.ts$/,
//             loader: "babel-loader",
//             exclude: /node_modules/,
//         });
//         return config;
//     },
//     reactStrictMode: false,
//     i18n: {
//         locales: ["en", "ja"],
//         defaultLocale: "en",
//         localeDetection: false,
//     },
// };

// module.exports = nextConfig;
