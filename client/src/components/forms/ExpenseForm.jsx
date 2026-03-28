
import React, { useState } from 'react';

const ExpenseForm = ({ onSubmit, initialData = {} }) => {
  const [formData, setFormData] = useState(initialData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="expense-form">
      <div className="form-group">
        <label htmlFor="amount">Amount</label>
        <input 
          type="number" 
          id="amount"
          name="amount"
          value={formData.amount || ''}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="category">Category</label>
        <select 
          id="category"
          name="category"
          value={formData.category || ''}
          onChange={handleChange}
          required
        >
          <option value="">Select Category</option>
          <option value="Travel">Travel</option>
          <option value="Meals">Meals</option>
          <option value="Office Supplies">Office Supplies</option>
          <option value="Equipment">Equipment</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea 
          id="description"
          name="description"
          value={formData.description || ''}
          onChange={handleChange}
        />
      </div>

      <button type="submit" className="btn btn-primary">Submit Expense</button>
    </form>
  );
};

export default ExpenseForm;
