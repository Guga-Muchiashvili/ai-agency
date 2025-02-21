import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "i.pinimg.com",
      "media.discordapp.net",
      "www.google.com",
      "via.placeholder.com",
      "",
      "imagekit.io",
      "web.telegram.org",
      "gratisography.com",
    ],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.txt$/,
      use: "raw-loader",
    });
    return config;
  },
};

export default nextConfig;
