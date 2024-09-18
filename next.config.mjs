// /** @type {import('next').NextConfig} */

// // import  optimizedImages from "next-optimized-images";
// import withPlugins from "next-compose-plugins";
// import withVideos from "next-videos";
// import withImages from "next-images";

// const nextConfig = withPlugins(
//     {
//         compiler: {
//             styledComponents: true,
//         },
//         // async rewrites() {
//         // 	return [
//         // 		{
//         // 			source: "/api/:path*",
//         // 			destination: "/api/:path*",
//         // 		},
//         // 	];
//         // },
//         // images: {
//         // 	domains: [
//         // 		"uploadthing.com",
//         // 		"utfs.io",
//         // 		"img.clerk.com",
//         // 		"subdomain",
//         // 		"files.stripe.com",
//         // 		"nexusconjure.com",
//         // 	],
//         // },
//         images: {
//             remotePatterns: [
//                 {
//                     protocol: "https",
//                     hostname: "uploadthing.com",
//                     pathname: "**",
//                 },
//                 {
//                     protocol: "https",
//                     hostname: "utfs.io",
//                     pathname: "**",
//                 },
//                 {
//                     protocol: "https",
//                     hostname: "img.clerk.com",
//                     pathname: "**",
//                 },

//                 {
//                     protocol: "https",
//                     hostname: "subdomain",
//                     pathname: "**",
//                 },
//                 {
//                     protocol: "https",
//                     hostname: "files.stripe.com",
//                     pathname: "**",
//                 },
//                 {
//                     protocol: "https",
//                     hostname: "nexusconjure.com",
//                     pathname: "**",
//                 },
//                 {
//                     protocol: "https",
//                     hostname: "files.cdn.printful.com",
//                     pathname: "**",
//                 },
//                 {
//                     protocol: "https",
//                     hostname: "firebasestorage.googleapis.com",
//                     pathname: "**",
//                 },
//             ],
//         },
//         env: {
//             stripe_public_key: process.env.STRIPE_PUBLIC_KEY,
//             printful_client_id: process.env.PRINTFUL_CLIENT_ID,
//             NEXTAUTH_URL: process.env.NEXTAUTH_URL,
//             NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
//         },
//         // experimental: {
//         //     serverActions: true,
//         // },
//         // future: {
//         //     webpack5: true,
//         // },
//         webpack: (config, { isServer }) => {
//             config.experiments = config.experiments || {};
//             config.experiments.topLevelAwait = true;
//             config.module.rules.push({
//                 test: /\.svg$/i,
//                 issuer: /\.[jt]sx?$/,
//                 use: [
//                     {
//                         loader: "@svgr/webpack",
//                         options: {
//                             typescript: true,
//                             ext: "tsx",
//                         },
//                     },
//                     // {
//                     //     test: /\.ts$/,
//                     //     loader: "babel-loader",
//                     //     exclude: /node_modules/,
//                     // },
//                     // {
//                     //     test: /\.ts$/,
//                     //     exclude: /node_modules/,
//                     //     use: ["babel-loader"],
//                     // },
//                     // {
//                     //     test: /\.css$/,
//                     //     use: ["style-loader", "css-loader"],
//                     // },
//                     // {
//                     //     test: /\.tsx?$/,
//                     //     loader: "babel-loader",
//                     //     exclude: /node_modules/,
//                     //     query: {
//                     //         presets: ["es2015"],
//                     //     },
//                     // },
//                     // {
//                     //     loader: "file-loader",
//                     // },
//                     // {
//                     //     loader: "svgo-loader",
//                     //     options: {
//                     //         configFile: "./svgo.config.js",
//                     //     },
//                     // },
//                 ],
//             });
//             // Additional loaders (modified to work with Next.js)
//             // config.module.rules.push({
//             //     test: /\.(ts|tsx)$/,
//             //     exclude: /node_modules/,
//             //     use: [
//             //         {
//             //             loader: "babel-loader",
//             //             options: {
//             //                 presets: ["next/babel"],
//             //             },
//             //         },
//             //     ],
//             // });

//             // config.module.rules.push({
//             //     test: /\.css$/,
//             //     use: ["style-loader", "css-loader"],
//             // });
//             config.experiments = {
//                 ...config.experiments,
//                 asyncWebAssembly: true,
//             };

//             // Optionally, add a rule for .wasm files
//             config.module.rules.push({
//                 test: /\.wasm$/,
//                 type: "webassembly/async",
//             });

//             // If you're using React Native
//             // if (!isServer) {
//             //     config.resolve.fallback = {
//             //         ...config.resolve.fallback,
//             //         fs: false,
//             //         net: false,
//             //         tls: false,
//             //         events: require.resolve("events"),
//             //     };
//             // }

//             config.module.rules.push({
//                 test: /\.(ogg|mp3|wav|mpe?g)$/i,
//                 exclude: config.exclude,
//                 use: [
//                     {
//                         loader: require.resolve("url-loader"),
//                         options: {
//                             limit: config.inlineImageLimit,
//                             fallback: require.resolve("file-loader"),
//                             publicPath: `${config.assetPrefix}/_next/static/images/`,
//                             outputPath: `${isServer ? "../" : ""}static/images/`,
//                             name: "[name]-[hash].[ext]",
//                             esModule: config.esModule || false,
//                         },
//                     },
//                 ],
//             });

//             if (!isServer) {
//                 config.resolve.fallback = {
//                     ...config.resolve.fallback,
//                     fs: false,
//                     net: false,
//                     tls: false,
//                     crypto: false,
//                     stream: false,
//                     util: false,
//                     // crypto: require.resolve("crypto-browserify"),
//                     // stream: require.resolve("stream-browserify"),
//                     // util: require.resolve("util/"),
//                     events: require.resolve("events"),
//                 };
//             }

//             // if (!isServer) {
//             //     config.resolve.fallback = {
//             //         events: require.resolve("events"),
//             //     };
//             // }
//             return config;
//         },

//         reactStrictMode: false,
//         i18n: {
//             locales: ["en", "ja"],
//             defaultLocale: "en",
//             localeDetection: false,
//         },
//     },
//     [withVideos],
//     [withImages],
//     {
//         images: {
//             disableStaticImages: true,
//         },
//     }
// );

// module.exports = nextConfig;

// // /** @type {import('next').NextConfig} */
// // const nextConfig = {
// //     images: {
// //         remotePatterns: [
// //             {
// //                 protocol: "https",
// //                 hostname: "uploadthing.com",
// //                 pathname: "**",
// //             },
// //             {
// //                 protocol: "https",
// //                 hostname: "utfs.io",
// //                 pathname: "**",
// //             },
// //             {
// //                 protocol: "https",
// //                 hostname: "img.clerk.com",
// //                 pathname: "**",
// //             },
// //             {
// //                 protocol: "https",
// //                 hostname: "subdomain",
// //                 pathname: "**",
// //             },
// //             {
// //                 protocol: "https",
// //                 hostname: "files.stripe.com",
// //                 pathname: "**",
// //             },
// //             {
// //                 protocol: "https",
// //                 hostname: "nexusconjure.com",
// //                 pathname: "**",
// //             },
// //         ],
// //     },
// //     webpack: (config, { isServer }) => {
// //         if (!isServer) {
// //             config.resolve.fallback = {
// //                 events: require.resolve("events"),
// //             };
// //         }
// //         config.experiments = config.experiments || {};
// //         config.experiments.topLevelAwait = true;
// //         config.module.rules.push({
// //             test: /\.svg$/i,
// //             issuer: /\.[jt]sx?$/,
// //             use: ["@svgr/webpack"],
// //         });
// //         config.module.rules.push({
// //             test: /\.ts$/,
// //             loader: "babel-loader",
// //             exclude: /node_modules/,
// //         });
// //         return config;
// //     },
// //     reactStrictMode: false,
// //     i18n: {
// //         locales: ["en", "ja"],
// //         defaultLocale: "en",
// //         localeDetection: false,
// //     },
// // };

// // module.exports = nextConfig;

import withPlugins from "next-compose-plugins";
import withVideos from "next-videos";
import withImages from "next-images";

const nextConfig = {
    compiler: {
        styledComponents: true,
    },
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
            {
                protocol: "https",
                hostname: "links.papareact.com",
                pathname: "**",
            },
            {
                protocol: "https",
                hostname: "www.facebook.com",
                pathname: "**",
            },
            {
                protocol: "https",
                hostname: "www.instagram.com",
                pathname: "**",
            },
            {
                protocol: "https",
                hostname: "www.linkedin.com",
                pathname: "**",
            },
            {
                protocol: "https",
                hostname: "twitter.com",
                pathname: "**",
            },
            {
                protocol: "https",
                hostname: "logos-world.net",
                pathname: "**",
            },
            {
                protocol: "https",
                hostname: "media.corporate-ir.net",
                pathname: "**",
            },
            {
                protocol: "https",
                hostname: "assets.turbologo.com",
                pathname: "**",
            },
            {
                protocol: "https",
                hostname: "ecstatic-leavitt-a2e426.netlify.app",
                pathname: "**",
            },
            {
                protocol: "https",
                hostname: "nervous-ramanujan-132263.netlify.app",
                pathname: "**",
            },
            {
                protocol: "https",
                hostname: "assetshuluimcom-a.akamaihd.net",
                pathname: "**",
            },
            {
                protocol: "https",
                hostname: "repository-images.githubusercontent.com",
                pathname: "**",
            },
        ],
        disableStaticImages: true,
    },
    env: {
        stripe_public_key: process.env.STRIPE_PUBLIC_KEY,
        printful_client_id: process.env.PRINTFUL_CLIENT_ID,
        NEXTAUTH_URL: process.env.NEXTAUTH_URL,
        NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    },
    webpack: (config, { isServer }) => {
        config.module.rules.push({
            test: /\.svg$/,
            use: [
                {
                    loader: "@svgr/webpack",
                    options: {
                        typescript: true,
                        ext: "tsx",
                    },
                },
            ],
        });

        config.module.rules.push({
            test: /\.(ogg|mp3|wav|mpe?g)$/i,
            exclude: config.exclude,
            use: [
                {
                    loader: "url-loader",
                    options: {
                        limit: config.inlineImageLimit,
                        fallback: "file-loader",
                        publicPath: `${config.assetPrefix}/_next/static/images/`,
                        outputPath: `${isServer ? "../" : ""}static/images/`,
                        name: "[name]-[hash].[ext]",
                        esModule: config.esModule || false,
                    },
                },
            ],
        });

        if (!isServer) {
            config.resolve.fallback = {
                fs: false,
                net: false,
                tls: false,
                events: "events",
            };
        }

        return config;
    },
    reactStrictMode: false,
    i18n: {
        locales: ["en", "ja"],
        defaultLocale: "en",
        localeDetection: false,
    },
};

export default withPlugins([[withVideos], [withImages]], nextConfig);
