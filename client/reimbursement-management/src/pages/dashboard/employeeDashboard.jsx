import React, { useState, useEffect } from 'react';

const EmployeeDashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const [stats, setStats] = useState({
    totalExpenses: 0,
    pendingAmount: 0,
    approvedAmount: 0,
    rejectedAmount: 0,
  });

  // Sample data for demo
  const sampleExpenses = [
    {
      id: 'EXP001',
      description: 'Flight to New York',
      amount: 750,
      category: 'Travel',
      date: '2024-03-25',
      status: 'Approved',
    },
    {
      id: 'EXP002',
      description: 'Team lunch meeting',
      amount: 120,
      category: 'Meals',
      date: '2024-03-26',
      status: 'Pending',
    },
    {
      id: 'EXP003',
      description: 'Office supplies',
      amount: 250,
      category: 'Office',
      date: '2024-03-27',
      status: 'Rejected',
    },
  ];

  useEffect(() => {
    setExpenses(sampleExpenses);
    setStats({
      totalExpenses: 3,
      pendingAmount: 120,
      approvedAmount: 750,
      rejectedAmount: 250,
    });
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Approved':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">👋 Welcome, Employee</h1>
        <p className="text-gray-600">Manage your expense requests and track approvals</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Expenses */}
        <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-blue-500 hover:shadow-xl transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Expenses</p>
              <h2 className="text-3xl font-bold text-gray-800">{stats.totalExpenses}</h2>
            </div>
            <span className="text-4xl">📊</span>
          </div>
        </div>

        {/* Pending Amount */}
        <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-yellow-500 hover:shadow-xl transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Pending Amount</p>
              <h2 className="text-3xl font-bold text-yellow-600">${stats.pendingAmount}</h2>
            </div>
            <span className="text-4xl">⏳</span>
          </div>
        </div>

        {/* Approved Amount */}
        <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-green-500 hover:shadow-xl transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Approved Amount</p>
              <h2 className="text-3xl font-bold text-green-600">${stats.approvedAmount}</h2>
            </div>
            <span className="text-4xl">✅</span>
          </div>
        </div>

        {/* Rejected Amount */}
        <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-red-500 hover:shadow-xl transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Rejected Amount</p>
              <h2 className="text-3xl font-bold text-red-600">${stats.rejectedAmount}</h2>
            </div>
            <span className="text-4xl">❌</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 mb-8 flex-wrap">
        <button className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition">
          ➕ Create New Expense
        </button>
        <button className="bg-white border-2 border-blue-500 text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition">
          📋 View All Expenses
        </button>
      </div>

      {/* Recent Expenses Table */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-6 border-b-2 border-gray-100">
          <h2 className="text-2xl font-bold text-gray-800">📝 Recent Expenses</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Description</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Category</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Amount</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Date</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((expense, idx) => (
                <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50 transition">
                  <td className="px-6 py-4 text-gray-800 font-medium">{expense.description}</td>
                  <td className="px-6 py-4 text-gray-600">
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                      {expense.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-semibold text-green-600">${expense.amount}</td>
                  <td className="px-6 py-4 text-gray-600">{expense.date}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(expense.status)}`}>
                      {expense.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        {/* Monthly Summary */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">📈 Monthly Summary</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">This Month:</span>
              <span className="font-bold text-lg text-gray-800">$1,120</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Last Month:</span>
              <span className="font-bold text-lg text-gray-800">$2,450</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Budget Remaining:</span>
              <span className="font-bold text-lg text-green-600">$3,880</span>
            </div>
          </div>
        </div>

        {/* Approval Status */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">🔄 Approval Status</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
                Awaiting Approval
              </span>
              <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-semibold">
                1
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                Approved This Month
              </span>
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                2
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                Rejected
              </span>
              <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-semibold">
                1
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
