/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable App Router
  // experimental: {
  //   appDir: true,
  // },

  // Only handle TTF fonts since audio is now in public folder
  webpack: (config) => {
    // Add support for TTF font files only
    config.module.rules.push({
      test: /\.ttf$/,
      type: "asset/resource",
      generator: {
        filename: "static/fonts/[name].[hash][ext]",
      },
    });

    return config;
  },

  // Image optimization
  images: {
    formats: ["image/webp", "image/avif"],
  },

  // Remove console logs in production
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },

  // Redirect /home to / for SEO
  async redirects() {
    return [
      {
        source: "/home",
        destination: "/",
        permanent: true,
      },
    ];
  },

  // Disable x-powered-by header for security
  poweredByHeader: false,

  // Enable compression
  compress: true,
};

export default nextConfig;
