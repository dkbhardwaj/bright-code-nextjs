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
            value: `
              default-src 'self';
              script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://snap.licdn.com https://googleads.g.doubleclick.net https://www.googleadservices.com https://www.google.com https://www.gstatic.com;
              style-src 'self' 'unsafe-inline' https://unpkg.com;
              img-src 'self' data: https://px.ads.linkedin.com https://px4.ads.linkedin.com https://images.ctfassets.net https://www.google-analytics.com https://www.google.com https://www.google.co.in https://www.googleadservices.com;
              media-src 'self' https://videos.ctfassets.net;
              connect-src 'self' https://www.google.com https://www.googletagmanager.com https://www.google-analytics.com https://*.ctfassets.net https://cdn.contentful.com https://px.ads.linkedin.com https://px4.ads.linkedin.com;
              frame-src 'self' https://www.googletagmanager.com https://td.doubleclick.net https://www.google.com;
            `.replace(/\s{2,}/g, ' ').trim()
          },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' }
        ]
      }
    ];
  },
};

export default nextConfig;