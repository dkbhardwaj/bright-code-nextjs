import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
        <link rel="stylesheet" href="https://unpkg.com/aos@next/dist/aos.css" />
          <script
            type="text/javascript"
            src="https://www.googletagmanager.com/gtag/js?id=UA-254354410-1"
            id="google_gtagjs-js"
            async
          ></script>
          <script
            type="text/javascript"
            id="google_gtagjs-js-after"
            dangerouslySetInnerHTML={{
              __html: `  window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}
          gtag('set', 'linker', {“domains”:[“www.bright-code.io”]} );
          gtag(“js”, new Date());
          gtag(“set”, “developer_id.dZTNiMT”, true);
          gtag(“config”, “UA-254354410-1”, {“anonymize_ip”:true});
          gtag(“config”, “G-0J63B1FNF9");
          `,
            }}
          />
          <script
            type="text/javascript"
            dangerouslySetInnerHTML={{
              __html: ` ( function( w, d, s, l, i ) {
            w[l] = w[l] || [];
            w[l].push( {'gtm.start': new Date().getTime(), event: 'gtm.js'} );
            var f = d.getElementsByTagName( s )[0],
              j = d.createElement( s ), dl = l != 'dataLayer' ? '&l=' + l : '';
            j.async = true;
            j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
            f.parentNode.insertBefore( j, f );
          } )( window, document, 'script', 'dataLayer', 'GTM-KVK3JT9' );
          `,
            }}
          />

          {/* <!-- Google tag (gtag.js) --> */}
          <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=AW-11070673099"
          ></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'AW-11070673099');
          `,
            }}
          />
          {/* <!-- Google tag (gtag.js) --> */}
          <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=G-J5EMG95WSZ"
          ></script>
          <script
            dangerouslySetInnerHTML={{
              __html: ` window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-J5EMG95WSZ');`,
            }}
          />

          {/* <!-- Event snippet for Contact us page conversion page --> */}
          <script
            dangerouslySetInnerHTML={{
              __html: `gtag('event', 'conversion', {'send_to': 'AW-11070673099/hO0bCPPQhpAZEMuh9J4p'});`,
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
