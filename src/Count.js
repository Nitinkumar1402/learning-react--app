import React, { useState, useEffect } from 'react';
import './App.css';
import Update from './Update';

const Count = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() =>{
    fetchData();
  }, [<Update></Update>]);

  const fetchData = async () => {
    try {
      const response = await fetch('https://resize-full-stack-task.onrender.com/api/count');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const responseData = await response.json();
      setData(responseData);
    } catch (error) {
      setError(error);
    }
  };

  return (
    <div className="count_container">
      <div className="add-count-section">
        <h3>Add Count: {data && data.addCount}</h3>
      </div>
      <div className="update-count-section">
        <h3>Update Count: {data && data.updateCount}</h3>
      </div>
      {error && <p>Error: {error.message}</p>}
    </div>
  );
};

export default Count;




