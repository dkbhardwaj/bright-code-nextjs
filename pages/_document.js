import Document, { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <title>New update</title>
        </Head>
        <body>
          <Main />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
