import React, { PropTypes } from 'react';
import Choice from './Choice.jsx';

function Question({ index, title, description, choices, value, active }) {
  return (
    <div>
      <h2>Question {index} {active ? '*' : ''}</h2>
      <h1>{title}</h1>
      <p>{description}</p>

      <div>
        {choices.map((choice, i) => <Choice key={i} label={choice.label} active={i === value} />)}
      </div>
    </div>
  );
}

Question.propTypes = {
  index: PropTypes.number,
  title: PropTypes.string,
  description: PropTypes.string,
  choices: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
  })),
  value: PropTypes.number,
  active: PropTypes.bool,
};

export default Question;
