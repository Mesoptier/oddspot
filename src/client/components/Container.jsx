import styles from './Container.scss';
import React from 'react';

function Container({ children }) {
  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        {children}
      </div>
    </div>
  );
}

export default Container;
