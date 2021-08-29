import React, { useState } from 'react';
import './workWithHooks.scss';

const NewApp = () => {
  const [count, setCount] = useState(0);
  const [data, refreshData] = useState([{ name: 'Den', sex: 'male' }]);

  return (
    <div className="hooooks">
      <p>Вы кликнули {count} раз</p>
      <button onClick={() => setCount(count + 1)}>Кликни меня</button>
      {data.map((item) => (
        <div>
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
