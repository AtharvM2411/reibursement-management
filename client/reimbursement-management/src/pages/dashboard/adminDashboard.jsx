import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { getAllExpenses } from "../../services/expenseService";
import Navbar from "../../components/Navbar";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [expenses, setExpenses] = useState([]);
  const [recent, setRecent] = useState([]);

  const [filters, setFilters] = useState({
    status: "ALL",
    user: "ALL",
    fromDate: "",
    toDate: "",
  });

  // 🔹 Fetch data
  const fetchData = async () => {
    try {
      const data = await getAllExpenses();
      console.log("ADMIN DATA:", data);

      setExpenses(data);
      setRecent(data.slice(0, 5));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // 🔹 Memoized filtering (FIXED)
  const filteredExpenses = useMemo(() => {
    return expenses.filter((e) => {
      if (filters.status !== "ALL" && e.status !== filters.status) return false;
      if (filters.user !== "ALL" && e.user?.name !== filters.user) return false;

      const created = new Date(e.createdAt);

      if (filters.fromDate && created < new Date(filters.fromDate)) return false;
      if (filters.toDate && created > new Date(filters.toDate)) return false;

      return true;
    });
  }, [expenses, filters]);

  // 🔹 Memoized stats (FIXED - no useEffect loop)
  const stats = useMemo(() => {
    const approved = filteredExpenses.filter(
      (e) => e.status === "APPROVED"
    ).length;

    const rejected = filteredExpenses.filter(
      (e) => e.status === "REJECTED"
    ).length;

    const pending = filteredExpenses.filter(
      (e) => e.status === "PENDING"
    ).length;

    const totalAmount = filteredExpenses.reduce(
      (sum, e) => sum + (e.amount || 0),
      0
    );

    return {
      totalExpenses: filteredExpenses.length,
      approved,
      rejected,
      pending,
      totalAmount,
    };
  }, [filteredExpenses]);

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

        {/* FILTERS */}
        <div className="flex flex-wrap gap-4 mb-6">

          {/* Status */}
          <select
            value={filters.status}
            onChange={(e) =>
              setFilters({ ...filters, status: e.target.value })
            }
            className="p-2 rounded bg-slate-700 text-white"
          >
            <option value="ALL">All Status</option>
            <option value="APPROVED">Approved</option>
            <option value="PENDING">Pending</option>
            <option value="REJECTED">Rejected</option>
          </select>

          {/* User */}
          <select
            value={filters.user}
            onChange={(e) =>
              setFilters({ ...filters, user: e.target.value })
            }
            className="p-2 rounded bg-slate-700 text-white"
          >
            <option value="ALL">All Users</option>
            {[...new Set(expenses.map(e => e.user?.name))].map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>

          {/* From Date */}
          <input
            type="date"
            value={filters.fromDate}
            onChange={(e) =>
              setFilters({ ...filters, fromDate: e.target.value })
            }
            className="p-2 rounded bg-slate-700 text-white"
          />

          {/* To Date */}
          <input
            type="date"
            value={filters.toDate}
            onChange={(e) =>
              setFilters({ ...filters, toDate: e.target.value })
            }
            className="p-2 rounded bg-slate-700 text-white"
          />

          {/* Reset */}
          <button
            onClick={() =>
              setFilters({
                status: "ALL",
                user: "ALL",
                fromDate: "",
                toDate: "",
              })
            }
            className="bg-red-600 px-4 py-2 rounded text-white"
          >
            Reset
          </button>
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

        {/* RECENT */}
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
                    <p className="text-xs text-blue-400">
                      {item.user?.name}
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