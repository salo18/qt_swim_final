/** @type {import('next').NextConfig} */
const nextConfig = {
  // experimental: {
  //   appDir: true,
  // },
  reactStrictMode: true,
}

// const nextConfig = {
//   webpack: (config, { isServer }) => {
//     if (!isServer) {
//       config.resolve.fallback = {
//         fs: false,
//         path: false,

//       }
//     }
//     return config
//   }
// }


// const nodeExternals = require('webpack-node-externals');

// module.exports = {
//   ...nextConfig,
//   webpack: (config, { isServer }) => {
//     if (!isServer) {
//       config.externals = [nodeExternals()];
//     }

//     return config;
//   },
// };

module.exports = nextConfig



