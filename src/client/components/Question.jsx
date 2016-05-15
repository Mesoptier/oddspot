import styles from './Question.scss';
import React, { PropTypes } from 'react';
import Choice from './Choice.jsx';

const propTypes = {
  index: PropTypes.number,
  title: PropTypes.string,
  description: PropTypes.string,
  choices: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.number,
  })),
  value: PropTypes.number,
  onChange: PropTypes.func,
};

function Question({ index, title, description, choices, value, onChange }) {
  return (
    <div className={styles.question}>
      <div className={styles.number}>Question {index}</div>
      <div className={styles.title}>{title}</div>
      {description ? (
        <div className={styles.description}>{description}</div>
      ) : null}


      <div className={styles.choiceGrid}>
        {choices.map((choice) => (
          <div key={choice.value} className={styles.choiceItem}>
            <Choice
              label={choice.label}
              value={choice.value}
              active={choice.value === value}
              onClick={() => onChange(choice.value)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

Question.propTypes = propTypes;

export default Question;
