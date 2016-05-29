import styles from './Paragraph.scss';
import React from 'react';
import classNames from 'classnames';

function Paragraph({ justify, children, ...otherProps }) {
  const className = classNames(styles.paragraph, {
    [styles.justify]: justify,
  });

  return (
    <p className={className} {...otherProps}>
      {children}
    </p>
  );
}

export default Paragraph;
