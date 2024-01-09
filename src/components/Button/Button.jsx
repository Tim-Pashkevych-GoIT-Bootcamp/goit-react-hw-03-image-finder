import React from 'react';
import css from './Button.module.css';

const Button = ({ type, children, className = 'primary', ...allyProps }) => {
  return (
    <button className={css[className]} type={type} {...allyProps}>
      {children}
    </button>
  );
};

export default Button;
