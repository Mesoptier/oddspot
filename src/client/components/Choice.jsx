import React, { PropTypes } from 'react';

const propTypes = {
  label: PropTypes.string,
  active: PropTypes.bool,
};

function Choice({ label, active }) {
  return (
    <div>
      {label}
      {active ? '*' : ''}
    </div>
  );
}

Choice.propTypes = propTypes;

export default Choice;
