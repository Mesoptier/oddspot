import styles from './ResultBox.scss';
import React, { PropTypes } from 'react';

const propTypes = {
  score: PropTypes.number,
  name: PropTypes.string,
  description: PropTypes.string,
};

function ResultBox({ score, name, description }) {
  return (
    <div className={styles.box}>
      <div className={styles.heading}>
        <div className={styles.name}>{name}</div>
        <div className={styles.score}>{Math.round(score * 100)}%</div>
      </div>
      <div className={styles.description}>
        {description}
      </div>
    </div>
  );
}

ResultBox.propTypes = propTypes;

export default ResultBox;
