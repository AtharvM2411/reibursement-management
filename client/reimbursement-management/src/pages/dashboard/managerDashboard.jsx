import { useEffect, useState } from "react";
import {
  getPendingApprovals,
  approveExpense,
  rejectExpense,
} from "../../services/approvalService";

const ManagerDashboard = () => {
  const [data, setData] = useState([]);
  const [stats, setStats] = useState({
    pending: 0,
    approved: 0,
    rejected: 0,
    totalAmount: 0,
  });

  const fetchData = async () => {
    try {
      const res = await getPendingApprovals();
      setData(res);

      const pending = res.filter(a => a.status === "PENDING").length;
      const approved = res.filter(a => a.status === "APPROVED").length;
      const rejected = res.filter(a => a.status === "REJECTED").length;

      const totalAmount = res.reduce(
        (sum, a) => sum + (a.expense?.amount || 0),
        0
      );

      setStats({
        pending,
        approved,
        rejected,
        totalAmount,
      });

    } catch (err) {
      console.error(err);
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

  const getColor = (status) => {
    if (status === "APPROVED") return "bg-green-500";
    if (status === "REJECTED") return "bg-red-500";
    return "bg-yellow-500";
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* Header */}
      <h1 className="text-3xl font-bold mb-6">
        Manager Dashboard
      </h1>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-red-100 p-4 rounded">
          <p>Pending</p>
          <h2>{stats.pending}</h2>
        </div>

        <div className="bg-green-100 p-4 rounded">
          <p>Approved</p>
          <h2>{stats.approved}</h2>
        </div>

        <div className="bg-yellow-100 p-4 rounded">
          <p>Rejected</p>
          <h2>{stats.rejected}</h2>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <p>Total Amount</p>
          <h2>₹ {stats.totalAmount}</h2>
        </div>
      </div>

      {/* Pending Approvals */}
      <div className="bg-white rounded shadow p-4">
        <h2 className="text-xl mb-4">Pending Approvals</h2>

        {data.length === 0 ? (
          <p>No pending approvals</p>
        ) : (
          <div className="space-y-3">
            {data.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center border p-3 rounded"
              >
                <div>
                  <p className="font-semibold">
                    {item.expense?.description}
                  </p>
                  <p>₹ {item.expense?.amount}</p>
                </div>

                <div className="flex gap-2 items-center">

                  <span
                    className={`text-white px-2 py-1 rounded ${getColor(item.status)}`}
                  >
                    {item.status}
                  </span>

                  <button
                    onClick={() => handleApprove(item.id)}
                    className="bg-green-500 text-white px-3 py-1 rounded"
                  >
                    Approve
                  </button>

                  <button
                    onClick={() => handleReject(item.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Reject
                  </button>

                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ManagerDashboard;