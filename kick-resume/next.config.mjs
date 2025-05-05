/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["fakestoreapi.com"],
      },
      api: {
        bodyParser: false,
      },
};

export default nextConfig;
