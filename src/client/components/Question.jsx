import styles from './Question.scss';
import React, { PropTypes } from 'react';
import Choice from './Choice.jsx';

const propTypes = {
  index: PropTypes.number,
  question: PropTypes.string,
  description: PropTypes.string,
  choices: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.number,
  })),
  value: PropTypes.number,
  onChange: PropTypes.func,
};

function renderInput(type, { choices, value, inputPlaceholder, onChange, settings }) {
  switch (type) {
    case 'integer':
      return (
        <input
          className={styles.numberInput}
          type="number"
          min={settings.min}
          max={settings.max}
          onKeyDown={(e) => {
            if (e.keyCode === 13 || e.keyCode === 9) {
              e.preventDefault();
              e.target.blur();
            }
          }}
          onBlur={(e) => onChange(e.target.value)}
          autoFocus={true}
          placeholder={inputPlaceholder}
        />
      );

    case 'multiple choice':
      return (
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
      );
  }
}

function Question(props) {
  const { index, totalQuestions, question, type, description } = props;

  return (
    <div className={styles.question}>
      <div className={styles.number}>Vraag {index} uit {totalQuestions}</div>
      <div className={styles.title}>{question}</div>
      {description ? (
        <div className={styles.description}>{description}</div>
      ) : null}

      <div className={styles.inputContainer}>
        {renderInput(type, props)}
      </div>
    </div>
  );
}

Question.propTypes = propTypes;

export default Question;
