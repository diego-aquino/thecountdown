import React, { FC } from 'react';
import Link from 'next/link';

import Logo from 'assets/Logo';
import styles from 'styles/components/common/Header.module.css';

const Header: FC = () => (
  <div className={styles.header}>
    <Link href="/">
      <a className={styles.logoContainer}>
        <Logo id="logoIcon" title="TheCountdown" className={styles.logoIcon} />
        <h1 className={styles.logoTitle}>TheCountdown</h1>
      </a>
    </Link>

    <div className={styles.navbar}>
      <Link href="/about">
        <a className={styles.navbarItem}>About</a>
      </Link>
    </div>
  </div>
);

export default Header;
