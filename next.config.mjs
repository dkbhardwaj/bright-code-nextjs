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
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Allow usage of chrome-aws-lambda in the server-side bundle
      config.externals = [...config.externals, 'chrome-aws-lambda'];
    }
    return config;
  },
};

export default nextConfig;