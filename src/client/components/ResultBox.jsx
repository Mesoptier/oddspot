import styles from './ResultBox.scss';
import React, { PropTypes } from 'react';

const propTypes = {
  score: PropTypes.number,
  name: PropTypes.string,
  description: PropTypes.string,
};

function headingClassName(level) {
  if (level === 'normal') return styles.primaryHeading;
  if (level === 'warning') return styles.warningHeading;
  return styles.dangerHeading; // level === 'danger'
}

function ResultBox({ score, level, name, description }) {
  return (
    <div className={styles.box}>
      <div className={headingClassName(level)}>
        <div className={styles.name}>{name}</div>
        <div className={styles.score}>{Math.round(score * 100)}%</div>
      </div>
      <div className={styles.description}>
        <p dangerouslySetInnerHTML={{ __html: description }} />
      </div>
    </div>
  );
}

ResultBox.propTypes = propTypes;

export default ResultBox;
