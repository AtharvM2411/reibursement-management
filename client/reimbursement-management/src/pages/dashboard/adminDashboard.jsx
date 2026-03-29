import React, { useState, useEffect } from 'react';

const AdminDashboard = () => {
  const [adminStats, setAdminStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    totalExpenses: 0,
    totalBudget: 0,
    companies: 0,
    systemHealth: 0,
  });

  const [recentActivities, setRecentActivities] = useState([]);

  // Sample data
  const sampleActivities = [
    {
      id: 1,
      user: 'John Davis',
      action: 'Created new expense',
      amount: '$750',
      timestamp: '2 hours ago',
      type: 'expense',
    },
    {
      id: 2,
      user: 'Jane Smith',
      action: 'Approved 3 expenses',
      amount: '$1,200',
      timestamp: '1 hour ago',
      type: 'approval',
    },
    {
      id: 3,
      user: 'Admin',
      action: 'Created new approval rule',
      amount: 'N/A',
      timestamp: '30 minutes ago',
      type: 'system',
    },
    {
      id: 4,
      user: 'Sarah Johnson',
      action: 'Updated profile information',
      amount: 'N/A',
      timestamp: '15 minutes ago',
      type: 'user',
    },
  ];

  useEffect(() => {
    setAdminStats({
      totalUsers: 156,
      activeUsers: 142,
      totalExpenses: 2847,
      totalBudget: 456890,
      companies: 5,
      systemHealth: 98,
    });
    setRecentActivities(sampleActivities);
  }, []);

  const getActivityIcon = (type) => {
    switch (type) {
      case 'expense':
        return '💰';
      case 'approval':
        return '✅';
      case 'system':
        return '⚙️';
      case 'user':
        return '👤';
      default:
        return '📌';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">🔐 Admin Dashboard</h1>
        <p className="text-gray-300">System administration & analytics</p>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Total Users */}
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-lg p-6 text-white hover:shadow-xl transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm font-medium">Total Users</p>
              <h2 className="text-3xl font-bold">{adminStats.totalUsers}</h2>
              <p className="text-blue-100 text-xs mt-1">
                {adminStats.activeUsers} active
              </p>
            </div>
            <span className="text-5xl opacity-20">👥</span>
          </div>
        </div>

        {/* Active Users */}
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg shadow-lg p-6 text-white hover:shadow-xl transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm font-medium">Active Users</p>
              <h2 className="text-3xl font-bold">{adminStats.activeUsers}</h2>
              <p className="text-green-100 text-xs mt-1">
                {Math.round((adminStats.activeUsers / adminStats.totalUsers) * 100)}% online
              </p>
            </div>
            <span className="text-5xl opacity-20">🟢</span>
          </div>
        </div>

        {/* Total Expenses */}
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg shadow-lg p-6 text-white hover:shadow-xl transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm font-medium">Total Expenses</p>
              <h2 className="text-3xl font-bold">{adminStats.totalExpenses}</h2>
              <p className="text-purple-100 text-xs mt-1">
                ${(adminStats.totalBudget / 1000).toFixed(0)}K total
              </p>
            </div>
            <span className="text-5xl opacity-20">💸</span>
          </div>
        </div>

        {/* Total Budget */}
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg shadow-lg p-6 text-white hover:shadow-xl transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm font-medium">Total Budget Used</p>
              <h2 className="text-3xl font-bold">${Math.round(adminStats.totalBudget / 1000)}K</h2>
              <p className="text-orange-100 text-xs mt-1">
                Monthly allocation
              </p>
            </div>
            <span className="text-5xl opacity-20">💰</span>
          </div>
        </div>

        {/* Companies */}
        <div className="bg-gradient-to-br from-pink-500 to-pink-600 rounded-lg shadow-lg p-6 text-white hover:shadow-xl transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-pink-100 text-sm font-medium">Companies</p>
              <h2 className="text-3xl font-bold">{adminStats.companies}</h2>
              <p className="text-pink-100 text-xs mt-1">
                Active organizations
              </p>
            </div>
            <span className="text-5xl opacity-20">🏢</span>
          </div>
        </div>

        {/* System Health */}
        <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg shadow-lg p-6 text-white hover:shadow-xl transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-emerald-100 text-sm font-medium">System Health</p>
              <h2 className="text-3xl font-bold">{adminStats.systemHealth}%</h2>
              <p className="text-emerald-100 text-xs mt-1">
                All systems operational
              </p>
            </div>
            <span className="text-5xl opacity-20">✅</span>
          </div>
        </div>
      </div>

      {/* Control Buttons */}
      <div className="flex gap-4 mb-8 flex-wrap">
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition transform hover:scale-105 shadow-lg">
          👤 Manage Users
        </button>
        <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition transform hover:scale-105 shadow-lg">
          ⚙️ System Settings
        </button>
        <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition transform hover:scale-105 shadow-lg">
          📊 Generate Reports
        </button>
        <button className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-semibold transition transform hover:scale-105 shadow-lg">
          📋 View Logs
        </button>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activities */}
        <div className="lg:col-span-2">
          <div className="bg-slate-700 rounded-lg shadow-lg overflow-hidden">
            <div className="p-6 border-b border-slate-600">
              <h2 className="text-2xl font-bold text-white">🕐 Recent Activities</h2>
            </div>

            <div className="divide-y divide-slate-600">
              {recentActivities.map((activity, idx) => (
                <div key={idx} className="p-4 hover:bg-slate-600 transition flex items-center gap-4">
                  <span className="text-3xl">{getActivityIcon(activity.type)}</span>
                  <div className="flex-1">
                    <h3 className="text-white font-semibold">{activity.user}</h3>
                    <p className="text-gray-400 text-sm">{activity.action}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-semibold">{activity.amount}</p>
                    <p className="text-gray-400 text-xs">{activity.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* System Status */}
        <div className="space-y-6">
          {/* Server Status */}
          <div className="bg-slate-700 rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold text-white mb-4">🖥️ Server Status</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Backend API</span>
                <span className="flex items-center gap-1">
                  <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                  <span className="text-green-400 text-sm font-bold">Online</span>
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Database</span>
                <span className="flex items-center gap-1">
                  <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                  <span className="text-green-400 text-sm font-bold">Connected</span>
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Frontend</span>
                <span className="flex items-center gap-1">
                  <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                  <span className="text-green-400 text-sm font-bold">Deployed</span>
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Email Service</span>
                <span className="flex items-center gap-1">
                  <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
                  <span className="text-yellow-400 text-sm font-bold">Checking</span>
                </span>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-slate-700 rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold text-white mb-4">📈 Quick Stats</h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-300">CPU Usage</span>
                  <span className="text-sm font-bold text-white">34%</span>
                </div>
                <div className="w-full bg-slate-600 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '34%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-300">Memory Usage</span>
                  <span className="text-sm font-bold text-white">56%</span>
                </div>
                <div className="w-full bg-slate-600 rounded-full h-2">
                  <div className="bg-purple-500 h-2 rounded-full" style={{ width: '56%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-300">Storage</span>
                  <span className="text-sm font-bold text-white">72%</span>
                </div>
                <div className="w-full bg-slate-600 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '72%' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Security Alert */}
          <div className="bg-gradient-to-br from-yellow-600 to-orange-600 rounded-lg shadow-lg p-6 text-white">
            <h3 className="font-bold mb-2">⚠️ Security Notice</h3>
            <p className="text-sm">3 failed login attempts detected. Review security logs for details.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
