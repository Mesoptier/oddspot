import styles from './Button.scss';
import React, { Component, PropTypes } from 'react';

const propTypes = {
  kind: PropTypes.string,
  onClick: PropTypes.func,
  element: PropTypes.element,
};

function buttonClassName(kind) {
  switch (kind) {
    case 'primary': return styles.primaryButton;
    case 'default': return styles.defaultButton;
  }
}

function Button({ kind, onClick, children, element, ...otherProps }) {
  const Element = element;

  return (
    <Element className={buttonClassName(kind)} onClick={onClick} {...otherProps}>
      {children}
    </Element>
  );
}

export default Button;
