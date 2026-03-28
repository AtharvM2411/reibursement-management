import React, { useEffect, useState } from 'react';

const PendingApprovals = () => {
  const [approvals, setApprovals] = useState([]);

  useEffect(() => {
    // Fetch pending approvals
  }, []);

  return (
    <div className="pending-approvals">
      <h1>Pending Approvals</h1>
      <table>
        <thead>
          <tr>
            <th>Employee</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* Add approval rows */}
        </tbody>
      </table>
    </div>
  );
};

export default PendingApprovals;
