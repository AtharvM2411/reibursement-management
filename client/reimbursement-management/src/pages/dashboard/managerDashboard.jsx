import { useEffect, useState } from "react";
import {
  getPendingApprovals,
  approveExpense,
  rejectExpense,
} from "../../services/approvalService";
import Navbar from "../../components/Navbar";
const ManagerDashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user || user.role !== "MANAGER") {
    return <p className="p-6 text-red-500">Access Denied</p>;
  }

  const [data, setData] = useState([]);

  const fetchData = async () => {
    const res = await getPendingApprovals();
    setData(res);
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
    <div className="min-h-screen bg-gray-50">

  <Navbar />

  <div className="p-6">

      {/* Header */}
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Manager Dashboard
      </h1>

      {/* Card */}
      <div className="bg-white rounded-xl shadow overflow-hidden">

        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold text-gray-700">
            Pending Approvals
          </h2>
        </div>

        <div className="divide-y">
          {data.length === 0 ? (
            <p className="p-4 text-gray-500">No pending approvals</p>
          ) : (
            data.map(item => (
              <div
                key={item.id}
                className="flex justify-between items-center p-4 hover:bg-gray-50"
              >
                <div>
                  <p className="font-medium text-gray-800">
                    {item.expense?.description}
                  </p>
                  <p className="text-sm text-gray-500">
                    ₹ {item.expense?.amount}
                  </p>
                </div>

                <div className="flex gap-2">

                  <button
                    onClick={() => handleApprove(item.id)}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded-lg text-sm"
                  >
                    Approve
                  </button>

                  <button
                    onClick={() => handleReject(item.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-lg text-sm"
                  >
                    Reject
                  </button>

                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
    </div>
  );
};

export default ManagerDashboard;