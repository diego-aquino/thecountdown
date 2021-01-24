import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';

const siteInfo = {
  name: 'TheCountdown',
  siteURL: 'https://thecountdown.vercel.app',
  description:
    'Wondering how much time is left for an event? Counting down to Christmas, New Year, a birthday, a release... any date? Create the countdown now!',
  wideMetaImageURL: '/meta/thecountdown-wide.png',
  squareMetaImageURL: '/meta/thecountdown-square.png',
};

class GlobalDocument extends Document {
  render(): JSX.Element {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="utf-8" />

          <meta name="description" content={siteInfo.description} />

          <meta property="og:type" content="website" />
          <meta property="og:url" content={siteInfo.siteURL} />
          <meta property="og:site_name" content={siteInfo.name} />
          <meta property="og:description" content={siteInfo.description} />
          <meta name="og:image" content={siteInfo.wideMetaImageURL} />
          <meta name="og:image:type" content="image/png" />
          <meta name="og:image:width" content="1200" />
          <meta name="og:image:height" content="628" />
          <meta name="og:image" content={siteInfo.squareMetaImageURL} />
          <meta name="og:image:type" content="image/png" />
          <meta name="og:image:width" content="400" />
          <meta name="og:image:height" content="400" />

          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:description" content={siteInfo.description} />
          <meta name="twitter:site" content={siteInfo.siteURL} />
          <meta name="twitter:image:src" content={siteInfo.wideMetaImageURL} />

          <link rel="icon" href="/favicon.ico" />

          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700;900&display=swap"
            rel="stylesheet"
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
