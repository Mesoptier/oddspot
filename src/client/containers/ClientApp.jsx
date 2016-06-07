import styles from './ClientApp.scss';
import React, { Component } from 'react';

function ClientApp({ children }) {
  return (
    <div className={styles.root}>{children}</div>
  );
}

export default ClientApp;
