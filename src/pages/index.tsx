import React, { FC } from 'react';

import { Layout } from 'components/common';
import { MainCountdown } from 'components/countdown';
import styles from 'styles/components/pages/Home.module.css';

const Home: FC = () => (
  <Layout pageTitle="TheCountdown">
    <main className={styles.main}>
      <MainCountdown />
    </main>
  </Layout>
);

export default Home;
