import styles from './ViewResultsBar.scss';
import React, { Component, PropTypes } from 'react';
import Button from './Button.jsx';

const propTypes = {
  onClickNext: PropTypes.func,
}

function ViewResultsBar({ onClickNext }) {
  return (
    <div className={styles.bar}>
      <div className={styles.barInner}>
        <div className={styles.message}>
          You have completed the questionnaire
        </div>
        <div className={styles.action}>
          <Button kind="primary" onClick={onClickNext}>
            View results
          </Button>
        </div>
      </div>
    </div>
  );
}

ViewResultsBar.propTypes = propTypes;

export default ViewResultsBar;
