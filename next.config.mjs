/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.ctfassets.net'], // Add the hostname here
  },
  async redirects() {
    return [
      {
        source: '/whychooseus',
        destination: '/why-choose-us',
        permanent: true,
      },
      {
        source: '/ourclients',
        destination: '/our-clients',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;