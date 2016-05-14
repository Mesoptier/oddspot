import styles from './QuestionList.scss';
import React, { Component, PropTypes } from 'react';
import Question from './Question.jsx';

const propTypes = {
  questions: PropTypes.array,
  onChange: PropTypes.func,
};

function QuestionList({ questions, onChange }) {
  return (
    <div className={styles.list}>
      {
        questions.map((question, i) => (
          <div key={i} className={styles.item}>
            <Question
              {...question}
              index={i + 1}
              onChange={(value) => onChange({ question: i, value })}
            />
          </div>
        ))
      }
    </div>
  );
}

QuestionList.propTypes = propTypes;

export default QuestionList;
