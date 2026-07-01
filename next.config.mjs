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
};

export default nextConfig;
