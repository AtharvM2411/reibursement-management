import React, { useState } from 'react';

const Signup = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  });

  const handleSignup = (e) => {
    e.preventDefault();
    // Handle signup logic
  };

  return (
    <div className="signup-container">
      <form onSubmit={handleSignup}>
        <input 
          type="text" 
          placeholder="Full Name" 
        />
        <input 
          type="email" 
          placeholder="Email" 
        />
        <input 
          type="password" 
          placeholder="Password" 
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
