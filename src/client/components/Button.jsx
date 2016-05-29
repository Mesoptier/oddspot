import styles from './Button.scss';
import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

const propTypes = {
  kind: PropTypes.string,
  element: PropTypes.element,
};

function buttonClassName(kind) {
  switch (kind) {
    case 'primary': return styles.primaryButton;
    case 'default': return styles.defaultButton;
  }
}

function Button({ element, kind, center, children, ...otherProps }) {
  const Element = element;

  const className = classNames(
    buttonClassName(kind),
    { [styles.center]: center }
  );

  return (
    <Element className={className} {...otherProps}>
      {children}
    </Element>
  );
}

export default Button;
