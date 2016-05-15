import styles from './QuestionList.scss';
import React, { Component, PropTypes } from 'react';
import Question from './Question.jsx';

const propTypes = {
  questions: PropTypes.array,
  currentQuestion: PropTypes.number,
  onChange: PropTypes.func,
};

function itemClassName(active, current) {
  if (current) {
    return styles.currentItem;
  }
  if (!active) {
    return styles.hiddenItem;
  }
  return styles.item;
}

function QuestionList({ questions, currentQuestion, onChange }) {
  return (
    <div className={styles.list}>
      {
        questions.map((question, i) => (
          <div key={i} className={itemClassName(i <= currentQuestion, i == currentQuestion)}>
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
