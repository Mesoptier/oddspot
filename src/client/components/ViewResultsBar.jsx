import styles from './ViewResultsBar.scss';
import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import Button from './Button.jsx';

function ViewResultsBar() {
  return (
    <div className={styles.bar}>
      <div className={styles.barInner}>
        <div className={styles.message}>
          You have completed the questionnaire
        </div>
        <div className={styles.action}>
          <Button element={Link} to="results" kind="primary">
            View results
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ViewResultsBar;
