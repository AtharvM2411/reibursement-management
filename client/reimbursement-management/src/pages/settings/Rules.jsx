import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import api from "../../services/api";

export default function Rules() {
  const [rules, setRules] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRules = async () => {
    try {
      const res = await api.get("/rules"); // 🔥 backend endpoint
      setRules(res.data);
    } catch (err) {
      console.error("Error fetching rules:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRules();
  }, []);

  return (
    <div className="min-h-screen bg-slate-900">
      <Navbar />

      <div className="p-6">
        <h2 className="text-3xl font-bold text-white mb-6">
          ⚙️ Approval Rules
        </h2>

        {loading ? (
          <p className="text-gray-400">Loading rules...</p>
        ) : rules.length === 0 ? (
          <p className="text-gray-400">No rules found</p>
        ) : (
          <div className="grid gap-4">
            {rules.map((rule) => (
              <div
                key={rule.id}
                className="bg-slate-800 p-5 rounded-lg shadow hover:bg-slate-700 transition"
              >
                <p className="text-white font-semibold">
                  Rule Type:{" "}
                  <span className="text-blue-400">{rule.type}</span>
                </p>

                <p className="text-gray-300 mt-2">
                  Condition:{" "}
                  {rule.type === "PERCENTAGE"
                    ? `${rule.value}% approval required`
                    : rule.type === "SPECIFIC_APPROVER"
                    ? `${rule.approver?.name || "Approver"} approval required`
                    : "Custom rule"}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}