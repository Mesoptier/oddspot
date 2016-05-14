import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { setCurrentQuestion, setValue as setQuestionValue } from '../reducers/questions';
import QuestionList from '../components/QuestionList.jsx';

const mapStateToProps = ({ questions }) => ({
  questions: questions.questions,
  currentQuestion: questions.currentQuestion,
});

const mapDispatchToProps = {
  setCurrentQuestion,
  setQuestionValue,
};

const propTypes = {
  questions: PropTypes.array,
  currentQuestion: PropTypes.number,

  setQuestionValue: PropTypes.func,
};

class ClientApp extends Component {

  render() {
    const { questions, currentQuestion, setQuestionValue } = this.props;

    return (
      <QuestionList 
        questions={questions}
        onChange={setQuestionValue}
      />
    );
  }

}

ClientApp.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(ClientApp);
