import React, { FC } from 'react';
import Head from 'next/head';
import clsx from 'clsx';

import { HTMLDivElementProps } from 'typings';
import styles from 'styles/components/common/Layout.module.css';
import Header from './Header';
import Footer from './Footer';

interface Props extends HTMLDivElementProps {
  pageTitle: string;
}

const Layout: FC<Props> = ({ pageTitle, className, children, ...rest }) => (
  <div className={clsx(styles.layout, className)} {...rest}>
    <Head>
      <title>{pageTitle}</title>
      <meta property="og:title" content={pageTitle} />
      <meta name="twitter:image:alt" content={pageTitle} />
      <meta name="twitter:title" content={pageTitle} />
    </Head>

    <Header />
    {children}
    <Footer />
  </div>
);

export default Layout;
