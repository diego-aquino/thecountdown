import React, { FC } from 'react';
import { AppProps } from 'next/app';

import 'services/firebase';

import 'styles/external/DateTimePicker.css';
import 'styles/external/Clock.css';
import 'styles/external/Calendar.css';

import '../styles/global.css';

const App: FC<AppProps> = ({ Component, pageProps }) => (
  <Component {...pageProps} />
);

export default App;
