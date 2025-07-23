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
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://snap.licdn.com; style-src 'self' 'unsafe-inline' https://unpkg.com; img-src 'self' data: https://px.ads.linkedin.com; connect-src 'self'; frame-src 'self';"
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          }
        ]
      }
    ];
  },
};

export default nextConfig;