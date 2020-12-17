import React, { FC } from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';

import 'services/firebase';

import 'styles/external/DateTimePicker.css';
import 'styles/external/Clock.css';
import 'styles/external/Calendar.css';

import '../styles/global.css';

const App: FC<AppProps> = ({ Component, pageProps }) => (
  <>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>
    <Component {...pageProps} />
  </>
);

export default App;
