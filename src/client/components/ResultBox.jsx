import styles from './ResultBox.scss';
import React, { PropTypes } from 'react';

const propTypes = {
  score: PropTypes.number,
  name: PropTypes.string,
  description: PropTypes.string,
};

function headingClassName(score) {
  if (score < 0.4) return styles.primaryHeading;
  if (score < 0.8) return styles.warningHeading;
  return styles.dangerHeading;
}

function ResultBox({ score, name, description }) {
  return (
    <div className={styles.box}>
      <div className={headingClassName(score)}>
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
