import React, { FC } from 'react';
import Head from 'next/head';

import styles from 'styles/components/common/Layout.module.css';
import Header from './Header';
import Footer from './Footer';

interface Props {
  pageTitle: string;
}

const Layout: FC<Props> = ({ pageTitle, children }) => (
  <div className={styles.layout}>
    <Head>
      <title>{pageTitle}</title>
    </Head>

    <Header />
    {children}
    <Footer />
  </div>
);

export default Layout;
