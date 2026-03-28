import React, { useEffect, useState } from 'react';

const ExpenseList = () => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    // Fetch expenses
  }, []);

  return (
    <div className="expense-list">
      <h1>My Expenses</h1>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Amount</th>
            <th>Category</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* Add expense rows */}
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseList;
