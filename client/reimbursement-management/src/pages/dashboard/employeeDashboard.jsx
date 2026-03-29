import { useEffect, useState } from "react";
import { getMyExpenses } from "../../services/expenseService";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";

const EmployeeDashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  if (!user || user.role !== "EMPLOYEE") {
    return <p className="p-6 text-red-500">Access Denied</p>;
  }

  const [expenses, setExpenses] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
  });

  const fetchData = async () => {
    const res = await getMyExpenses();
    setExpenses(res);

    setStats({
      total: res.length,
      pending: res.filter(e => e.status === "PENDING").length,
      approved: res.filter(e => e.status === "APPROVED").length,
      rejected: res.filter(e => e.status === "REJECTED").length,
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getColor = (status) => {
    if (status === "APPROVED") return "bg-green-100 text-green-700";
    if (status === "REJECTED") return "bg-red-100 text-red-700";
    return "bg-yellow-100 text-yellow-700";
  };

  return (
    <div className="min-h-screen bg-gray-50">

  <Navbar />

  <div className="p-6">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Employee Dashboard
        </h1>

        <button
          onClick={() => navigate("/submit")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow"
        >
          + New Expense
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">

        {[
          { label: "Total", value: stats.total },
          { label: "Pending", value: stats.pending },
          { label: "Approved", value: stats.approved },
          { label: "Rejected", value: stats.rejected },
        ].map((s, i) => (
          <div key={i} className="bg-white p-5 rounded-xl shadow hover:shadow-md transition">
            <p className="text-gray-500 text-sm">{s.label}</p>
            <h2 className="text-2xl font-bold text-gray-800">{s.value}</h2>
          </div>
        ))}

      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow overflow-hidden">

        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold text-gray-700">
            My Expenses
          </h2>
        </div>

        <div className="divide-y">
          {expenses.length === 0 ? (
            <p className="p-4 text-gray-500">No expenses found</p>
          ) : (
            expenses.map(e => (
              <div
                key={e.id}
                className="flex justify-between items-center p-4 hover:bg-gray-50"
              >
                <div>
                  <p className="font-medium text-gray-800">
                    {e.description}
                  </p>
                  <p className="text-sm text-gray-500">
                    ₹ {e.amount}
                  </p>
                </div>

                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getColor(e.status)}`}>
                  {e.status}
                </span>
              </div>
            ))
          )}
        </div>
      </div>

    </div>
    </div>
  );
};

export default EmployeeDashboard;