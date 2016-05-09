import React, { Component, PropTypes } from 'react';
import Question from './Question.jsx';

const propTypes = {
  questions: PropTypes.array,
  currentQuestion: PropTypes.number,
};

class QuestionList extends Component {

  render() {
    const { questions, currentQuestion } = this.props;

    return (
      <div>
        {
          questions.map((question, i) => (
            <Question key={i} {...question} index={i + 1} active={currentQuestion === i} />
          ))
        }
      </div>
    );
  }

}

QuestionList.propTypes = propTypes;

export default QuestionList;
