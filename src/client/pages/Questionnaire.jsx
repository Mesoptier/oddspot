import styles from './Questionnaire.scss';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import QuestionList from '../containers/QuestionList.jsx';
import ViewResultsBar from '../components/ViewResultsBar.jsx';

const mapStateToProps = ({ questionnaire }) => ({
  completed: questionnaire.completed,
});

const propTypes = {
  completed: PropTypes.bool,
};

function Questionnaire({ completed }) {
  return (
    <div>
      <div className={styles.questionList}>
        <QuestionList />
      </div>
      {completed ? (
        <div className={styles.bottomBar}>
          <ViewResultsBar />
        </div>
      ) : null}
    </div>
  );
}

export default connect(mapStateToProps)(Questionnaire);
