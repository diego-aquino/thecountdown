import React, { FC } from 'react';

import { Layout } from 'components/common';
import { MainCountdown } from 'components/countdown';
import styles from 'styles/pages/Home.module.css';

const Home: FC = () => (
  <Layout className={styles.layout} pageTitle="TheCountdown">
    <main className={styles.main}>
      <MainCountdown />
    </main>
  </Layout>
);

export default Home;
