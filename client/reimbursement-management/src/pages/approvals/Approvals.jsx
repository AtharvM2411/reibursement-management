import { useEffect, useState } from "react";
import {
  getPendingApprovals,
  approveExpense,
  rejectExpense,
} from "../../services/approvalService";

export default function Approvals() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await getPendingApprovals();
      setData(res);
    } catch (err) {
      console.error(err);
      alert("Failed to load approvals");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleApprove = async (id) => {
    await approveExpense(id);
    fetchData();
  };

  const handleReject = async (id) => {
    await rejectExpense(id);
    fetchData();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-2xl font-bold mb-6">Pending Approvals</h2>

      {loading ? (
        <p>Loading...</p>
      ) : data.length === 0 ? (
        <p>No pending approvals</p>
      ) : (
        <div className="space-y-4">
          {data.map((item) => (
            <div
              key={item.id}
              className="bg-white p-4 rounded-lg shadow flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">
                  {item.expense?.description}
                </p>
                <p className="text-green-600">
                  ₹ {item.expense?.amount}
                </p>
              </div>

              <div className="space-x-2">
                <button
                  onClick={() => handleApprove(item.id)}
                  className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                >
                  Approve
                </button>

                <button
                  onClick={() => handleReject(item.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}