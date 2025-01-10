// src/pages/Updates.js
import React, { useState } from 'react';
import './Updates.css';

function Updates() {
  const [updates, setUpdates] = useState([
    { id: 1, message: 'The training session is postponed to 5 PM today.' },
    { id: 2, message: 'New training schedules will be shared next week.' },
  ]);

  const addUpdate = () => {
    const newUpdate = prompt('Enter new update:');
    if (newUpdate) {
      setUpdates([...updates, { id: updates.length + 1, message: newUpdate }]);
    }
  };

  return (
    <div className="updates-container">
      <h1>Updates</h1>
      <button onClick={addUpdate} className="add-update-btn">Add Update</button>
      <ul className="updates-list">
        {updates.map((update) => (
          <li key={update.id} className="update-item">
            <p>{update.message}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Updates;
