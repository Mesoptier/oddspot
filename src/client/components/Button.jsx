import styles from './Button.scss';
import React, { Component, PropTypes } from 'react';

const propTypes = {
  kind: PropTypes.string,
  onClick: PropTypes.func,
};

function buttonClassName(kind) {
  switch (kind) {
    case 'primary': return styles.primaryButton;
    case 'default': return styles.defaultButton;
  }
}

function Button({ kind, onClick, children }) {
  return (
    <div className={buttonClassName(kind)} onClick={onClick}>
      {children}
    </div>
  );
}

export default Button;
