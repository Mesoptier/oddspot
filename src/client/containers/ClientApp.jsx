import styles from './ClientApp.scss';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { setCurrentQuestion, answerQuestion } from '../reducers/questionnaire';
import { setPage } from '../reducers/router';
import ViewResultsBar from '../components/ViewResultsBar.jsx';
import QuestionList from '../components/QuestionList.jsx';

const mapStateToProps = ({ router, questionnaire }) => ({
  currentPage: router.currentPage,

  questions: questionnaire.questions,
  currentQuestion: questionnaire.currentQuestion,
  completed: questionnaire.completed,
});

const mapDispatchToProps = {
  setCurrentQuestion,
  answerQuestion,
  openResults: () => setPage('results'),
};

const propTypes = {
  currentPage: PropTypes.string,

  questions: PropTypes.array,
  currentQuestion: PropTypes.number,
  completed: PropTypes.bool,

  answerQuestion: PropTypes.func,
  openResults: PropTypes.func,
};

class ClientApp extends Component {

  render() {
    const { currentPage } = this.props;
    let content;

    switch (currentPage) {
      case 'questions':
        const { questions, currentQuestion, completed } = this.props;
        content = (
          <div>
            <div className={styles.list}>
              <QuestionList
                questions={questions}
                currentQuestion={currentQuestion}
                completed={completed}
                onChange={this.props.answerQuestion}
              />
            </div>
            {completed ? (
              <div className={styles.bottomBar}>
                <ViewResultsBar onClickNext={this.props.openResults} />
              </div>
            ) : null}
          </div>
        );
        break;

      case 'results':
        const { results } = this.props;
        content = (
          <div>Results</div>
        );
        break;

      default:
        content = null;
        break;
    }

    return content;
  }

}

ClientApp.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(ClientApp);
