import React, { FC } from 'react';
import Link from 'next/link';

import styles from 'styles/components/common/Copyright.module.css';
import { InlineLink } from '.';

const Copyright: FC = () => (
  <div className={styles.copyright}>
    2020 &copy; TheCountdown by&nbsp;
    <Link href="/about" passHref>
      <InlineLink>Diego Aquino</InlineLink>
    </Link>
  </div>
);

export default Copyright;
