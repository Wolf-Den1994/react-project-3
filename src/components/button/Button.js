import React from 'react';
import cl from './Button.module.scss';

const Button = ({ children, ...props }) => {
  return <button {...props} className={cl.myButton}>{children}</button>;
};

export default Button;
