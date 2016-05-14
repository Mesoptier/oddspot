import styles from './Choice.scss';
import React, { PropTypes } from 'react';

const propTypes = {
  label: PropTypes.string,
  active: PropTypes.bool,
};

function Choice({ label, value, active, onClick }) {
  return (
    <div className={active ? styles.activeChoice : styles.choice} onClick={onClick}>
      <div className={active ? styles.activeRadio : styles.radio}></div>
      <div className={styles.label}>{label}</div>
    </div>
  );
}

Choice.propTypes = propTypes;

export default Choice;
