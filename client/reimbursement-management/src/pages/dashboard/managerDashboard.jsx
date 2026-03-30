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
  const [selectedImage, setSelectedImage] = useState(null);

  const fetchData = async () => {
    const res = await getPendingApprovals();
    console.log("API DATA:", res); // 🔥 global debug
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
    <div className="min-h-screen bg-slate-900">
      <Navbar />

      <div className="p-6">
        <h1 className="text-3xl font-bold text-white mb-6">
          Manager Dashboard
        </h1>

        <div className="bg-slate-800 rounded-xl shadow overflow-hidden">

          <div className="p-4 border-b border-slate-700">
            <h2 className="text-lg font-semibold text-white">
              Pending Approvals
            </h2>
          </div>

          <div className="divide-y divide-slate-700">
            {data.length === 0 ? (
              <p className="p-4 text-gray-400">
                No pending approvals
              </p>
            ) : (
              data.map((item) => {
                console.log("ITEM:", item); // ✅ correct debug

                return (
                  <div
                    key={item.id}
                    className="flex justify-between items-center p-4 hover:bg-slate-700 transition"
                  >
                    {/* LEFT SIDE */}
                    <div className="flex gap-4 items-center">

                      {/* 🔥 RECEIPT IMAGE */}
                      {item.expense?.receiptUrl ? (
                        <img
                          src={`http://localhost:5000${item.expense.receiptUrl}`}
                          alt="receipt"
                          className="w-16 h-16 object-cover rounded cursor-pointer border border-slate-600 hover:scale-105 transition"
                          onClick={() =>
                            setSelectedImage(
                              `http://localhost:5000${item.expense.receiptUrl}`
                            )
                          }
                        />
                      ) : (
                        <div className="w-16 h-16 flex items-center justify-center bg-slate-700 text-xs text-gray-400 rounded">
                          No Img
                        </div>
                      )}

                      {/* TEXT */}
                      <div>
                        <p className="font-medium text-white">
                          {item.expense?.description}
                        </p>

                        <p className="text-sm text-gray-400">
                          {item.expense?.currency} {item.expense?.amount}
                        </p>
                        <p className="text-xs text-gray-500">
                          Submitted by: <span className="text-blue-400 font-medium">
                            {item.expense?.user?.name}
                          </span>
                        </p>
                        <p className="text-xs text-gray-500">
                          {item.expense?.user?.name} ({item.expense?.user?.email})
                        </p>
                      </div>
                    </div>

                    {/* ACTIONS */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleApprove(item.id)}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded-lg text-sm"
                      >
                        Approve
                      </button>

                      <button
                        onClick={() => handleReject(item.id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded-lg text-sm"
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* MODAL */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-[9999]"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-10 right-0 text-white text-3xl"
            >
              ✕
            </button>

            <img
              src={selectedImage}
              alt="receipt"
              className="max-w-[90vw] max-h-[90vh] rounded-lg border-4 border-white"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ManagerDashboard;