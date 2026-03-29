import { useEffect, useState } from "react";
import { getMyExpenses } from "../../services/expenseService";

export default function Expenses() {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const res = await getMyExpenses();
    setData(res);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-2xl font-bold mb-6">My Expenses</h2>

      {data.length === 0 ? (
        <p>No expenses yet</p>
      ) : (
        <div className="space-y-3">
          {data.map((exp) => (
            <div
              key={exp.id}
              className="bg-white p-4 rounded shadow flex justify-between"
            >
              <div>
                <p className="font-semibold">{exp.description}</p>
                <p>₹ {exp.amount}</p>
              </div>

              <div
                className={`px-3 py-1 rounded text-white ${
                  exp.status === "APPROVED"
                    ? "bg-green-500"
                    : exp.status === "REJECTED"
                    ? "bg-red-500"
                    : "bg-yellow-500"
                }`}
              >
                {exp.status}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}