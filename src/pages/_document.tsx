import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';

class GlobalDocument extends Document {
  render(): JSX.Element {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="utf-8" />

          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700;900&display=swap"
            rel="stylesheet"
          />
          <link rel="icon" href="/favicon.ico" />

          <meta
            name="google-site-verification"
            content="tY6Tt0X1inh4u36gOc99yz-HH5w36zXDG95kEy8-2Fc"
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

export default GlobalDocument;
