import styles from './QuestionList.scss';
import React, { Component, PropTypes } from 'react';
import { Element as ScrollElement, scroller } from 'react-scroll';
import Question from './Question.jsx';

const propTypes = {
  questions: PropTypes.array,
  currentQuestion: PropTypes.number,
  onChange: PropTypes.func,
};

class QuestionList extends Component {

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentQuestion !== this.props.currentQuestion) {
      console.log('scroll to', nextProps.currentQuestion);
      scroller.scrollTo(`question-${nextProps.currentQuestion}`, {
        duration: 600,
        delay: 200,
        smooth: true,
      });
    }
  }

  itemClassName(i) {
    const { currentQuestion } = this.props;

    if (i == currentQuestion) {
      return styles.currentItem;
    }

    if (i > currentQuestion) {
      return styles.hiddenItem;
    }

    return styles.item;
  }

  render() {
    const { questions, onChange } = this.props;

    return (
      <div className={styles.list}>
        {
          questions.map((question, i) => (
            <ScrollElement key={i} name={`question-${i}`} className={this.itemClassName(i)}>
              <Question
                {...question}
                index={i + 1}
                onChange={(value) => onChange({ question: i, value })}
              />
            </ScrollElement>
          ))
        }
      </div>
    );
  }

}

QuestionList.propTypes = propTypes;

export default QuestionList;
