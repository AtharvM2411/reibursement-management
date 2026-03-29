import { useState } from "react";
import { createExpense } from "../../services/expenseService";
import { useNavigate } from "react-router-dom";

export default function SubmitExpense() {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!amount || !description) {
      alert("Fill all fields");
      return;
    }

    try {
      setLoading(true); // 🔥 prevent multiple clicks

      await createExpense({
        amount: Number(amount),
        currency: "INR",
        description,
      });

      // ✅ SUCCESS
      alert("Expense submitted successfully");

      navigate("/employee"); // 🔥 redirect to dashboard

    } catch (err) {
      console.error(err);
      alert(
        err?.response?.data?.message || "Error submitting expense"
      );
    } finally {
      setLoading(false);
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
          disabled={loading}
          className={`w-full text-white p-2 rounded ${
            loading
              ? "bg-gray-400"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </div>
    </div>
  );
}