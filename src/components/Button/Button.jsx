import React from 'react';
import css from './Button.module.css';

export const Button = ({
  type,
  children,
  className = 'primary',
  ...otherProps
}) => {
  return (
    <button className={css[className]} type={type} {...otherProps}>
      {children}
    </button>
  );
};
