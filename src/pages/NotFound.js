import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/button/Button';
import image from './img/not-found.jpg';
import cl from './NotFound.module.scss';

const NotFound = () => {
  return (
    <div className={cl.notFound}>
      <h1>Page not found!</h1>
      <img src={image} alt="not found" />
      <div>
        <Button>
          <Link to="/">Go home page</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
