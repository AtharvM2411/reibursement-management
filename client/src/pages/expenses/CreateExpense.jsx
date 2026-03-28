import React, { useState } from 'react';

const CreateExpense = () => {
  const [formData, setFormData] = useState({
    amount: '',
    category: '',
    description: '',
    receipt: null
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle expense creation
  };

  return (
    <div className="create-expense">
      <h1>Create New Expense</h1>
      <form onSubmit={handleSubmit}>
        {/* Add form fields */}
      </form>
    </div>
  );
};

export default CreateExpense;
