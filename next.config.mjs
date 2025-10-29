/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["images.ctfassets.net"], // Add the hostname here
  },
  async redirects() {
    return [
      {
        source: "/whychooseus",
        destination: "/why-choose-us",
        permanent: true,
      },
      { source: "/ourclients", destination: "/our-clients", permanent: true },
      { source: "/homepage", destination: "/", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: `
              default-src 'self';
              script-src 'self' 'unsafe-inline' 'unsafe-eval'
                https://www.gstatic.com
                https://www.googleapis.com
                https://www.googletagmanager.com
                https://www.google-analytics.com
                https://googleads.g.doubleclick.net
                https://snap.licdn.com
                https://bright-code-tools-default-rtdb.asia-southeast1.firebasedatabase.app;
              script-src-elem 'self' 'unsafe-inline' 'unsafe-eval'
                https://www.gstatic.com
                https://www.googleapis.com
                https://www.googletagmanager.com
                https://www.google-analytics.com
                https://googleads.g.doubleclick.net
                https://snap.licdn.com
                https://bright-code-tools-default-rtdb.asia-southeast1.firebasedatabase.app;

              script-src-attr 'self' 'unsafe-inline' 'unsafe-eval';
              style-src 'self' 'unsafe-inline' https://unpkg.com;
              img-src 'self' data:
                https://px.ads.linkedin.com
                https://px4.ads.linkedin.com
                https://images.ctfassets.net
                https://www.google-analytics.com
                https://www.google.com
                https://www.google.co.in
                https://www.googleadservices.com
                https://googleads.g.doubleclick.net;
              media-src 'self' https://videos.ctfassets.net;  
              connect-src 'self'
                https://google.com
                https://www.google.com
                https://*.google.com
                https://www.googletagmanager.com
                https://www.google-analytics.com
                https://*.ctfassets.net
                https://cdn.contentful.com
                https://px.ads.linkedin.com
                https://px4.ads.linkedin.com
                https://*.google-analytics.com
                https://*.google.co.in
                https://*.googleadservices.com
                wss://*.firebasedatabase.app
                https://*.firebasedatabase.app;
              frame-src 'self'
                https://www.googletagmanager.com
                https://td.doubleclick.net
                https://www.google.com;
            `
              .replace(/\s+/g, " ")
              .trim(),
          },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
