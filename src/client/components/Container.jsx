import styles from './Container.scss';
import React from 'react';

function Container({ children, center = false }) {
  return (
    <div className={center ? styles.centeredContainer : styles.container}>
      <div className={styles.inner}>
        {children}
      </div>
    </div>
  );
}

export default Container;
