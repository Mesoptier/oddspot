import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { setCurrentQuestion, answerQuestion } from '../reducers/questionnaire';
import QuestionList from '../components/QuestionList.jsx';

const mapStateToProps = ({ questionnaire }) => ({
  questions: questionnaire.questions,
  currentQuestion: questionnaire.currentQuestion,
});

const mapDispatchToProps = {
  setCurrentQuestion,
  answerQuestion,
};

const propTypes = {
  questions: PropTypes.array,
  currentQuestion: PropTypes.number,

  answerQuestion: PropTypes.func,
};

class ClientApp extends Component {

  render() {
    const { questions, currentQuestion, answerQuestion } = this.props;

    return (
      <QuestionList
        questions={questions}
        currentQuestion={currentQuestion}
        onChange={answerQuestion}
      />
    );
  }

}

ClientApp.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(ClientApp);
