import styles from './ClientApp.scss';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { setPage } from '../reducers/router';
import ViewResultsBar from '../components/ViewResultsBar.jsx';
import QuestionList from './QuestionList.jsx';
import Results from './Results.jsx';

const mapStateToProps = ({ router, questionnaire }) => ({
  currentPage: router.currentPage,
  completed: questionnaire.completed,
});

const mapDispatchToProps = {
  openResults: () => setPage('results'),
};

const propTypes = {
  currentPage: PropTypes.string,
  completed: PropTypes.bool,

  openResults: PropTypes.func,
};

class ClientApp extends Component {

  render() {
    const { currentPage, completed } = this.props;

    switch (currentPage) {
      case 'questions':
        return (
          <div>
            <div className={styles.questionList}>
              <QuestionList />
            </div>
            {completed ? (
              <div className={styles.bottomBar}>
                <ViewResultsBar onClickNext={this.props.openResults} />
              </div>
            ) : null}
          </div>
        );

      case 'results':
        return (
          <div>
            <Results />
          </div>
        );

      default:
        return null;
    }
  }

}

ClientApp.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(ClientApp);
