import React, { useState } from 'react';
import './workWithHooks.scss';

const NewApp = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="hooooks">
      <p>Вы кликнули {count} раз</p>
      <button onClick={() => setCount(count + 1)}>Кликни меня</button>
    </div>
  );
};

export default NewApp;
