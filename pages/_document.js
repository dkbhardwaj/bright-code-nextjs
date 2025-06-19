import Document, { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link
            rel="stylesheet"
            href="https://unpkg.com/aos@next/dist/aos.css"
          />
          <Script
            type="text/javascript"
            src="https://www.googletagmanager.com/gtag/js?id=UA-254354410-1"
            id="google_gtagjs-js"
            defer
          ></Script>
          <Script
            type="text/javascript"
            strategy="afterInteractive"
            id="google_gtagjs-js-after"
            dangerouslySetInnerHTML={{
              __html: `  window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}
          gtag('set', 'linker', {"domains":["www.bright-code.io"]} );
          gtag("js", new Date());
          gtag("set", "developer_id.dZTNiMT", true);
          gtag("config", "UA-254354410-1", {"anonymize_ip":true});
          gtag("config", "G-P1LQ3NF157");
          `,
            }}
          />
          <Script
            type="text/javascript"
              strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: ` ( function( w, d, s, l, i ) {
            w[l] = w[l] || [];
            w[l].push( {'gtm.start': new Date().getTime(), event: 'gtm.js'} );
            var f = d.getElementsByTagName( s )[0],
              j = d.createElement( s ), dl = l != 'dataLayer' ? '&l=' + l : '';
            j.async = true;
            j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
            f.parentNode.insertBefore( j, f );
          } )( window, document, 'script', 'dataLayer', 'GTM-MB63HJ5D' );
          `,
            }}
          />

          {/* <!-- Google tag (gtag.js) --> */}
          <Script
            defer
            strategy="afterInteractive"
            src="https://www.googletagmanager.com/gtag/js?id=AW-16650844425"
          ></Script>
          <Script
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'AW-16650844425');
          `,
            }}
          />

          {/* <!-- Event snippet for Contact us page conversion page --> */}
          <Script
            dangerouslySetInnerHTML={{
              __html: `gtag('event', 'conversion', {'send_to': 'AW-11070673099/hO0bCPPQhpAZEMuh9J4p'});`,
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
          <Script type="text/javascript" id="linkedin-insight-init" strategy="afterInteractive" dangerouslySetInnerHTML={{
            __html: `_linkedin_partner_id = "7372028";
            window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
            window._linkedin_data_partner_ids.push(_linkedin_partner_id);`
          }} />
          <Script type="text/javascript" id="linkedin-insight-loader" strategy="afterInteractive" dangerouslySetInnerHTML={{
                    __html: `(function(l) {
                  if (!l){window.lintrk = function(a,b){window.lintrk.q.push([a,b])};
                  window.lintrk.q=[]}
                  var s = document.getElementsByTagName("script")[0];
                  var b = document.createElement("script");
                  b.type = "text/javascript";b.async = true;
                  b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
                  s.parentNode.insertBefore(b, s);})(window.lintrk);`
                  }} />
          <noscript>
            <img height="1" width="1" style={{display: 'none'}} alt="" src="https://px.ads.linkedin.com/collect/?pid=7372028&fmt=gif" />
          </noscript>
        </body>
      </Html>
    );
  }
}

export default MyDocument;
