import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMyExpenses } from "../../services/expenseService";
import { getPendingApprovals } from "../../services/approvalService";
import Navbar from "../../components/Navbar";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    totalExpenses: 0,
    approved: 0,
    rejected: 0,
    pending: 0,
    totalAmount: 0,
  });

  const [recent, setRecent] = useState([]);

  const fetchData = async () => {
    try {
      const expenses = await getMyExpenses();
      await getPendingApprovals();

      const approved = expenses.filter(e => e.status === "APPROVED").length;
      const rejected = expenses.filter(e => e.status === "REJECTED").length;
      const pending = expenses.filter(e => e.status === "PENDING").length;

      const totalAmount = expenses.reduce(
        (sum, e) => sum + (e.amount || 0),
        0
      );

      setStats({
        totalExpenses: expenses.length,
        approved,
        rejected,
        pending,
        totalAmount,
      });

      setRecent(expenses.slice(0, 5));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-slate-900">
      <Navbar />

      <div className="p-6">
        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            🔐 Admin Dashboard
          </h1>
          <p className="text-gray-400">
            System overview & control panel
          </p>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          
          <div className="bg-blue-600 p-6 rounded-lg text-white shadow">
            <p>Total Expenses</p>
            <h2 className="text-3xl font-bold">{stats.totalExpenses}</h2>
          </div>

          <div className="bg-green-600 p-6 rounded-lg text-white shadow">
            <p>Approved</p>
            <h2 className="text-3xl font-bold">{stats.approved}</h2>
          </div>

          <div className="bg-yellow-500 p-6 rounded-lg text-white shadow">
            <p>Pending</p>
            <h2 className="text-3xl font-bold">{stats.pending}</h2>
          </div>

          <div className="bg-red-600 p-6 rounded-lg text-white shadow">
            <p>Rejected</p>
            <h2 className="text-3xl font-bold">{stats.rejected}</h2>
          </div>

          <div className="bg-purple-600 p-6 rounded-lg text-white shadow">
            <p>Total Amount</p>
            <h2 className="text-3xl font-bold">₹ {stats.totalAmount}</h2>
          </div>

        </div>

        {/* ACTION BUTTONS */}
        <div className="flex gap-4 mb-8 flex-wrap">
          <button
            onClick={() => navigate("/settings/users")}
            className="bg-blue-600 px-6 py-2 rounded text-white hover:bg-blue-700"
          >
            Manage Users
          </button>

          <button
            onClick={() => navigate("/reports")}
            className="bg-green-600 px-6 py-2 rounded text-white hover:bg-green-700"
          >
            View Reports
          </button>

          <button
            onClick={() => navigate("/settings/rules")}
            className="bg-purple-600 px-6 py-2 rounded text-white hover:bg-purple-700"
          >
            System Settings
          </button>
        </div>

        {/* RECENT ACTIVITY */}
        <div className="bg-slate-800 rounded-lg p-6">
          <h2 className="text-white text-xl mb-4">
            Recent Expenses
          </h2>

          {recent.length === 0 ? (
            <p className="text-gray-400">No data</p>
          ) : (
            <div className="space-y-3">
              {recent.map((item) => (
                <div
                  key={item.id}
                  className="bg-slate-700 p-3 rounded flex justify-between"
                >
                  <div>
                    <p className="text-white">{item.description}</p>
                    <p className="text-gray-400 text-sm">
                      ₹ {item.amount}
                    </p>
                  </div>

                  <span
                    className={`px-2 py-1 rounded text-white text-sm ${
                      item.status === "APPROVED"
                        ? "bg-green-500"
                        : item.status === "REJECTED"
                        ? "bg-red-500"
                        : "bg-yellow-500"
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;