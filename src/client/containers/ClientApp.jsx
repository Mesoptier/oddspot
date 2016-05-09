import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { setCurrentQuestion } from '../reducers/questions';
import QuestionList from '../components/QuestionList.jsx';

const mapStateToProps = ({ questions }) => ({
  questions: questions.questions,
  currentQuestion: questions.currentQuestion,
});

const mapDispatchToProps = {
  setCurrentQuestion,
};

const propTypes = {
  questions: PropTypes.array,
  currentQuestion: PropTypes.number,
};

class ClientApp extends Component {

  render() {
    const { questions, currentQuestion } = this.props;

    return (
      <QuestionList questions={questions} currentQuestion={currentQuestion} />
    );
  }

}

ClientApp.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(ClientApp);
