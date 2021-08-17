import React from 'react';
import gif from './error.gif'
import img from './error.jpg'

const ErrorMessage = () => {
  return (
    <>
      <img src={gif || img}  alt='error'/>
      <span>Something goes wrong</span>
    </>
  );
};

export default ErrorMessage;
