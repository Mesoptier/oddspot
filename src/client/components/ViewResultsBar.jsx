import styles from './ViewResultsBar.scss';
import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import Button from './Button.jsx';
import IconArrowRight from 'react-icons/lib/io/chevron-right';

function ViewResultsBar() {
  return (
    <div className={styles.bar}>
      <div className={styles.barInner}>
        <div className={styles.message}>
          U heeft alle vragen beantwoord.
          Scroll terug als u uw antwoorden wil aanpassen.
        </div>
        <div className={styles.action}>
          <Button
            element={Link}
            to="results"
            kind="on-primary"
            label="Bekijk resultaten"
            icon={<IconArrowRight />}
          />
        </div>
      </div>
    </div>
  );
}

export default ViewResultsBar;
