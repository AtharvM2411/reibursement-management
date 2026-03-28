
import React from 'react';

const ExpenseTable = ({ expenses, onView, onEdit, onDelete }) => {
  return (
    <div className="table-container">
      <table className="expense-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Amount</th>
            <th>Category</th>
            <th>Description</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses && expenses.map((expense) => (
            <tr key={expense._id}>
              <td>{new Date(expense.createdAt).toLocaleDateString()}</td>
              <td>${expense.amount.toFixed(2)}</td>
              <td>{expense.category}</td>
              <td>{expense.description}</td>
              <td className={`status-${expense.status}`}>{expense.status}</td>
              <td className="actions">
                <button onClick={() => onView(expense._id)}>View</button>
                {expense.status === 'draft' && (
                  <>
                    <button onClick={() => onEdit(expense._id)}>Edit</button>
                    <button onClick={() => onDelete(expense._id)}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseTable;
