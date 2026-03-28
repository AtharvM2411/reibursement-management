import React, { useEffect, useState } from 'react';

const Rules = () => {
  const [rules, setRules] = useState([]);

  useEffect(() => {
    // Fetch approval rules
  }, []);

  return (
    <div className="rules-settings">
      <h1>Approval Rules</h1>
      <table>
        <thead>
          <tr>
            <th>Rule Name</th>
            <th>Condition</th>
            <th>Action</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* Add rule rows */}
        </tbody>
      </table>
    </div>
  );
};

export default Rules;
