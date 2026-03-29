import React, { useState } from "react";

export default function SubmitExpense() {
  const [form, setForm] = useState({
    amount: "",
    currency: "USD",
    category: "",
    description: "",
    date: "",
    receipt: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleFileChange = (e) => {
    setForm({ ...form, receipt: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Expense:", form);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Submit Expense</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-2xl p-6 space-y-6"
      >
        {/* Amount */}
        <div>
          <label className="block text-sm font-medium mb-1">Amount</label>
          <input
            type="number"
            name="amount"
            value={form.amount}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
            placeholder="Enter amount"
            required
          />
        </div>

        {/* Currency */}
        <div>
          <label className="block text-sm font-medium mb-1">Currency</label>
          <select
            name="currency"
            value={form.currency}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
          >
            <option value="USD">USD</option>
            <option value="INR">INR</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
          </select>
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium mb-1">Category</label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
            required
          >
            <option value="">Select Category</option>
            <option value="Travel">Travel</option>
            <option value="Food">Food</option>
            <option value="Accommodation">Accommodation</option>
            <option value="Office Supplies">Office Supplies</option>
          </select>
        </div>

        {/* Date */}
        <div>
          <label className="block text-sm font-medium mb-1">Date</label>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
            rows="4"
            placeholder="Enter description"
          />
        </div>

        {/* Receipt Upload */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Upload Receipt
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full"
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Submit Expense
          </button>
        </div>
      </form>
    </div>
  );
}
