import React, { FC } from 'react';

import styles from 'styles/components/common/Footer.module.css';
import Copyright from './Copyright';

const Footer: FC = () => (
  <div className={styles.footer}>
    <Copyright />
  </div>
);

export default Footer;
