/** @type {import('next').NextConfig} */
const nextConfig = {
    transpilePackages: ['framer-motion'],
    images: {
        domains: ["fakestoreapi.com","lh3.googleusercontent.com","avatars.githubusercontent.com"],
      },
};

export default nextConfig;
