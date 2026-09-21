/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**" },
    ],
  },
  // Lint is run separately (npm run lint); don't fail production builds on lint.
  eslint: { ignoreDuringBuilds: true },
  async redirects() {
    return [
      {
        source: "/products/hot-pepe-powder",
        destination: "/products/hot-peppe-powder",
        permanent: true,
      },
      {
        source: "/products/hot-pepe",
        destination: "/products/hot-peppe-powder",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
