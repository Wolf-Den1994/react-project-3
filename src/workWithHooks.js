import React, { useState, useEffect } from 'react';
import './workWithHooks.scss';

const NewApp = () => {
  const [count, setCount] = useState(0);
  const [data, refreshData] = useState([{ name: 'Den', sex: 'male' }]);

  const updateChar = () => {
    console.log(Math.random());
  }

  useEffect(() => {
    updateChar();
    let timerId = setInterval(updateChar, 5000);
    return () => {
      clearInterval(timerId);
    }
  });

  return (
    <div className="hooooks">
      <p>Вы кликнули {count} раз</p>
      <button onClick={() => setCount(count + 1)}>Кликни меня</button>
      {data.map((item, index) => (
        <div key={Date.now + index}>
          Name: {item.name}, sex: {item.sex}
        </div>
      ))}
      <button
        onClick={() =>
          refreshData((data) => [...data, { name: 'Jhon', sex: 'male' }])
        }
      >
        Добавить данные
      </button>
    </div>
  );
};

export default NewApp;
