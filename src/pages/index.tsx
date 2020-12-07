import React, { FC } from 'react';
import Head from 'next/head';

import Logo from '../assets/Logo';

const Home: FC = () => (
  <div>
    <Head>
      <title>TheCountdown</title>
    </Head>

    <main>
      TheCountdown
      <Logo />
    </main>
  </div>
);

export default Home;
