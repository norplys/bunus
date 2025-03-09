/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "dfajgfxotwkoqwaofirt.supabase.co",
      },
    ],
    domains: ["res.cloudinary.com", "dfajgfxotwkoqwaofirt.supabase.co"],
  },
};

module.exports = nextConfig;
