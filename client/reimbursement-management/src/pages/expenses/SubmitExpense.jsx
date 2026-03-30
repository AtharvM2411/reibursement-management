import { useState } from "react";
import { createExpense } from "../../services/expenseService";
import { useNavigate } from "react-router-dom";

export default function SubmitExpense() {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [currency, setCurrency] = useState("INR");

  const [file, setFile] = useState(null);        
  const [preview, setPreview] = useState(null);  

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // handle file + preview
  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    setFile(selected);

    if (selected) {
      setPreview(URL.createObjectURL(selected));
    }
  };

  const handleSubmit = async () => {
    if (!amount || !description) {
      alert("Fill all fields");
      return;
    }

    try {
      setLoading(true);

      // 🔥 IMPORTANT: use FormData
      const formData = new FormData();
      formData.append("amount", Number(amount));
      formData.append("currency", currency); 
      formData.append("description", description);

      if (file) {
        formData.append("receipt", file); // send image
      }

      await createExpense(formData);

      alert("Expense submitted successfully");
      navigate("/employee");

    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.message || "Error submitting expense");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900">
      <div className="bg-slate-800 p-6 rounded-xl shadow w-96">
        <h2 className="text-xl font-bold mb-4 text-white">
          Submit Expense
        </h2>

        {/* Amount */}
        <input
          className="w-full p-2 mb-3 rounded bg-slate-700 text-white"
          placeholder="Amount"
          onChange={(e) => setAmount(e.target.value)}
        />

        {/* Currency */}
        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          className="w-full p-2 mb-3 rounded bg-slate-700 text-white"
        >
          <option value="INR">INR ₹</option>
          <option value="USD">USD $</option>
          <option value="EUR">EUR €</option>
        </select>

        {/* Description */}
        <input
          className="w-full p-2 mb-3 rounded bg-slate-700 text-white"
          placeholder="Description"
          onChange={(e) => setDescription(e.target.value)}
        />

        {/* File Upload */}
        <input
          type="file"
          onChange={handleFileChange}
          className="mb-3 text-white"
        />

        {/* Preview */}
        {preview && (
          <img
            src={preview}
            alt="preview"
            className="w-32 h-32 object-cover rounded mb-3"
          />
        )}

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`w-full text-white p-2 rounded ${
            loading
              ? "bg-gray-500"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </div>
    </div>
  );
}