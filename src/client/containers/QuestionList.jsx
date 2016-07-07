import styles from './QuestionList.scss';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Element as ScrollElement, scroller, animateScroll } from 'react-scroll';
import { setCurrentQuestion, answerQuestion } from '../reducers/questionnaire';
import Question from '../components/Question.jsx';

const mapStateToProps = ({ questionnaire }) => ({
  questions: questionnaire.questions,
  totalQuestions: questionnaire.totalQuestions,
  currentQuestion: questionnaire.currentQuestion,
  answers: questionnaire.answers,
  completed: questionnaire.completed,
});

const mapDispatchToProps = {
  setCurrentQuestion,
  answerQuestion,
};

const propTypes = {
  questions: PropTypes.array,
  totalQuestions: PropTypes.number,
  currentQuestion: PropTypes.number,
  answers: PropTypes.array,
  completed: PropTypes.bool,
  answerQuestion: PropTypes.func,
};

class QuestionList extends Component {

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentQuestion !== this.props.currentQuestion) {
      scroller.scrollTo(`question-${nextProps.currentQuestion}`, {
        duration: 600,
        delay: 200,
        smooth: true,
      });
    }
    if (nextProps.completed !== this.props.completed) {
      animateScroll.scrollToBottom();
    }
  }

  itemClassName(i) {
    const { currentQuestion, questions } = this.props;

    if (i == currentQuestion) {
      return styles.currentItem;
    }

    if (i > currentQuestion) {
      return styles.hiddenItem;
    }

    if (questions[i].type === 'message') {
      return styles.helpItem;
    }

    return styles.item;
  }

  render() {
    const { questions, totalQuestions, currentQuestion, answers, answerQuestion } = this.props;

    const items = questions.map((item, i) => {
      if (item.type === 'message') {
        return (<div className={styles.help}>{item.description}</div>);
      } else {
        return (<Question
          {...item}
          value={answers[item.questionIndex]}
          index={item.questionIndex}
          totalQuestions={totalQuestions}
          onChange={(value) => answerQuestion({ question: i, value })}
        />);
      }
    })

    return (
      <div className={styles.list}>
        {
          items.map((item, i) => (
            <ScrollElement key={i} name={`question-${i}`} className={this.itemClassName(i)}>
              <div className={styles.itemInner}>
                {i <= currentQuestion ? item : null}
              </div>
            </ScrollElement>
          ))
        }
      </div>
    );
  }

}

QuestionList.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(QuestionList);
