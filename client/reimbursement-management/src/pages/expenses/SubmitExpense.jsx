import { useState } from "react";
import { createExpense } from "../../services/expenseService";
import { useNavigate } from "react-router-dom";

export default function SubmitExpense() {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!amount || !description) {
      alert("Fill all fields");
      return;
    }

    try {
      await createExpense({
        amount: Number(amount),
        currency: "INR",
        description,
      });

      alert("Expense submitted");
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Error submitting expense");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-xl shadow w-96">
        <h2 className="text-xl font-bold mb-4">Submit Expense</h2>

        <input
          className="w-full p-2 mb-3 border rounded"
          placeholder="Amount"
          onChange={(e) => setAmount(e.target.value)}
        />

        <input
          className="w-full p-2 mb-3 border rounded"
          placeholder="Description"
          onChange={(e) => setDescription(e.target.value)}
        />

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded"
        >
          Submit
        </button>
      </div>
    </div>
  );
}