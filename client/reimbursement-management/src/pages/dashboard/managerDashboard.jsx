import React, { useState, useEffect } from 'react';

const ManagerDashboard = () => {
  const [approvals, setApprovals] = useState([]);
  const [teamStats, setTeamStats] = useState({
    pendingApprovals: 0,
    totalReviewed: 0,
    approvedThisMonth: 0,
    rejectedThisMonth: 0,
    teamMembers: 0,
    totalBudgetSpent: 0,
  });

  // Sample approval data
  const sampleApprovals = [
    {
      id: 'APR001',
      employeeName: 'John Davis',
      amount: 750,
      category: 'Travel',
      description: 'Flight to New York',
      submittedDate: '2024-03-25',
      status: 'Pending',
      daysWaiting: 2,
    },
    {
      id: 'APR002',
      employeeName: 'Sarah Johnson',
      amount: 120,
      category: 'Meals',
      description: 'Team lunch meeting',
      submittedDate: '2024-03-26',
      status: 'Pending',
      daysWaiting: 1,
    },
    {
      id: 'APR003',
      employeeName: 'Mike Chen',
      amount: 450,
      category: 'Office',
      description: 'Laptop accessories',
      submittedDate: '2024-03-24',
      status: 'Approved',
      daysWaiting: 4,
    },
    {
      id: 'APR004',
      employeeName: 'Emma Wilson',
      amount: 2500,
      category: 'Equipment',
      description: 'Conference registration',
      submittedDate: '2024-03-22',
      status: 'Approved',
      daysWaiting: 6,
    },
  ];

  useEffect(() => {
    setApprovals(sampleApprovals);
    setTeamStats({
      pendingApprovals: 2,
      totalReviewed: 45,
      approvedThisMonth: 28,
      rejectedThisMonth: 5,
      teamMembers: 12,
      totalBudgetSpent: 15240,
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

  const getPriorityColor = (daysWaiting) => {
    if (daysWaiting > 5) return 'border-l-4 border-red-500 bg-red-50';
    if (daysWaiting > 3) return 'border-l-4 border-yellow-500 bg-yellow-50';
    return 'border-l-4 border-green-500 bg-green-50';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">📊 Manager Dashboard</h1>
        <p className="text-gray-600">Review and manage team expense approvals</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Pending Approvals */}
        <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-red-500 hover:shadow-xl transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Pending Approvals</p>
              <h2 className="text-3xl font-bold text-red-600">{teamStats.pendingApprovals}</h2>
            </div>
            <span className="text-4xl">⏳</span>
          </div>
        </div>

        {/* Total Reviewed */}
        <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-blue-500 hover:shadow-xl transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Reviewed</p>
              <h2 className="text-3xl font-bold text-blue-600">{teamStats.totalReviewed}</h2>
            </div>
            <span className="text-4xl">✅</span>
          </div>
        </div>

        {/* Approved This Month */}
        <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-green-500 hover:shadow-xl transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Approved This Month</p>
              <h2 className="text-3xl font-bold text-green-600">{teamStats.approvedThisMonth}</h2>
            </div>
            <span className="text-4xl">📈</span>
          </div>
        </div>

        {/* Rejected This Month */}
        <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-orange-500 hover:shadow-xl transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Rejected This Month</p>
              <h2 className="text-3xl font-bold text-orange-600">{teamStats.rejectedThisMonth}</h2>
            </div>
            <span className="text-4xl">❌</span>
          </div>
        </div>

        {/* Team Members */}
        <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-purple-500 hover:shadow-xl transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Team Members</p>
              <h2 className="text-3xl font-bold text-purple-600">{teamStats.teamMembers}</h2>
            </div>
            <span className="text-4xl">👥</span>
          </div>
        </div>

        {/* Total Budget Spent */}
        <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-indigo-500 hover:shadow-xl transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Budget Spent (Month)</p>
              <h2 className="text-3xl font-bold text-indigo-600">${teamStats.totalBudgetSpent.toLocaleString()}</h2>
            </div>
            <span className="text-4xl">💰</span>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex gap-4 mb-8 flex-wrap">
        <button className="bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition">
          🔴 Review Pending ({teamStats.pendingApprovals})
        </button>
        <button className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition">
          👥 View Team Expenses
        </button>
        <button className="bg-white border-2 border-indigo-500 text-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition">
          📊 Generate Report
        </button>
      </div>

      {/* Pending Approvals Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Pending List */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-6 border-b-2 border-gray-100">
              <h2 className="text-2xl font-bold text-gray-800">📋 Pending Approvals</h2>
            </div>

            <div className="space-y-3 p-6">
              {approvals
                .filter((a) => a.status === 'Pending')
                .map((approval, idx) => (
                  <div key={idx} className={`p-4 rounded-lg ${getPriorityColor(approval.daysWaiting)}`}>
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-lg font-bold text-gray-800">{approval.employeeName}</h3>
                        <p className="text-gray-600 text-sm">{approval.description}</p>
                      </div>
                      <span className="text-2xl font-bold text-gray-800">${approval.amount}</span>
                    </div>

                    <div className="flex flex-wrap gap-3 items-center justify-between">
                      <div className="flex gap-3">
                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-semibold">
                          {approval.category}
                        </span>
                        <span className="text-gray-600 text-sm">
                          Submitted: {approval.submittedDate} ({approval.daysWaiting} days)
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded font-semibold transform hover:scale-105 transition">
                          ✓ Approve
                        </button>
                        <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded font-semibold transform hover:scale-105 transition">
                          ✕ Reject
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Approval Summary */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">📊 Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Waiting Approval:</span>
                <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full font-bold">
                  {approvals.filter((a) => a.status === 'Pending').length}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Approved:</span>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full font-bold">
                  {approvals.filter((a) => a.status === 'Approved').length}
                </span>
              </div>
              <div className="flex justify-between items-center pt-3 border-t border-gray-200">
                <span className="text-gray-600 font-semibold">Avg Review Time:</span>
                <span className="font-bold text-lg">2.3 days</span>
              </div>
            </div>
          </div>

          {/* Team Performance */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">🎯 Performance</h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-600">Approval Rate</span>
                  <span className="text-sm font-bold">85%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-600">Rejection Rate</span>
                  <span className="text-sm font-bold">15%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-red-500 h-2 rounded-full" style={{ width: '15%' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Info */}
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-lg p-6 text-white">
            <h3 className="text-xl font-bold mb-4">💡 Tip</h3>
            <p className="text-sm">Review pending approvals regularly to maintain team workflow efficiency. Delays can impact employee reimbursements.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagerDashboard;
