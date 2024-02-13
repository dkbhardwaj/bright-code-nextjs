// // pages/googleAdsConversion.tsx

// import { useEffect } from 'react';

// const GoogleAdsConversion = () => {
//   useEffect(() => {
//     const gtagScript = `<script type=‘text/javascript’ src=‘https://www.googletagmanager.com/gtag/js?id=UA-254354410-1’ id=‘google_gtagjs-js’ async></script>
//     <script type=‘text/javascript’ id=‘google_gtagjs-js-after’>
//     window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}
//     gtag(‘set’, ‘linker’, {“domains”:[“www.bright-code.io”]} );
//     gtag(“js”, new Date());
//     gtag(“set”, “developer_id.dZTNiMT”, true);
//     gtag(“config”, “UA-254354410-1”, {“anonymize_ip”:true});
//     gtag(“config”, “G-0J63B1FNF9");
//     </script>`;
//     const gtagManagerScript = `<script type=“text/javascript”>
//     ( function( w, d, s, l, i ) {
//       w[l] = w[l] || [];
//       w[l].push( {‘gtm.start’: new Date().getTime(), event: ‘gtm.js’} );
//       var f = d.getElementsByTagName( s )[0],
//         j = d.createElement( s ), dl = l != ‘dataLayer’ ? ‘&l=’ + l : ‘’;
//       j.async = true;
//       j.src = ‘https://www.googletagmanager.com/gtm.js?id=’ + i + dl;
//       f.parentNode.insertBefore( j, f );
//     } )( window, document, ‘script’, ‘dataLayer’, ‘GTM-KVK3JT9’ );
    
//   </script>`;
//     const googleTagScript = `<!-- Google tag (gtag.js) -->
//   <script async src="https://www.googletagmanager.com/gtag/js?id=AW-11070673099"></script>
//   <script>
//     window.dataLayer = window.dataLayer || [];
//     function gtag(){dataLayer.push(arguments);}
//     gtag('js', new Date());
//     gtag('config', 'AW-11070673099');
//   </script>`;

//     document.head.appendChild(gtagScript);
//     document.head.appendChild(gtagManagerScript);
//     document.head.appendChild(googleTagScript);

//     return () => {
//       // Cleanup script tags on component unmount
//       document.head.removeChild(gtagScript);
//       document.head.removeChild(gtagManagerScript);
//       document.head.removeChild(script3);
//     };
//   }, []);

//   return null;
// };

// export default GoogleAdsConversion;
