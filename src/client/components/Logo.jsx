import styles from './Logo.scss';
import React from 'react';

function Logo() {
  return (
    <div className={styles.logo}>
      <span className={styles.odd}>Odd</span>
      <span className={styles.spot}>Spot</span>
    </div>
  )
}

export default Logo;
