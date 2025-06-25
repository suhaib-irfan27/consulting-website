const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      "@app": path.resolve(__dirname, "src/app"),
    };
    return config;
  },
};

module.exports = nextConfig;




// const path = require("path");

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   webpack: (config) => {
//     config.resolve.alias = {
//       ...(config.resolve.alias || {}),
//       "@app": path.resolve(__dirname, "src/app"),
//     };
//     return config;
//   },
// };

// module.exports = nextConfig;
