import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Listebooks() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/all') 
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div>
      <h1>List books</h1>
      <ul>
        {data.map(item => (
          <li key={item.id}>
            {item.title}
            {item.author}
            {item.publisher}
            {item.category}
            {item.year}
            </li>
        ))}
      </ul>
    </div>
  );
}

export default Listebooks;
