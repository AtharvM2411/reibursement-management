import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { getUsers, deleteUser } from "../../services/userService";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // ✅ Delete user
  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      fetchUsers(); // refresh list
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900">
      <Navbar />

      <div className="p-6">
        <h2 className="text-3xl font-bold text-white mb-6">
          👥 Users Management
        </h2>

        {loading ? (
          <p className="text-gray-400">Loading users...</p>
        ) : (
          <div className="overflow-x-auto bg-slate-800 rounded-lg shadow">
            <table className="min-w-full text-left">
              
              {/* HEADER */}
              <thead className="bg-slate-700 text-gray-300 uppercase text-sm">
                <tr>
                  <th className="px-6 py-3">Name</th>
                  <th className="px-6 py-3">Email</th>
                  <th className="px-6 py-3">Role</th>
                  <th className="px-6 py-3">Actions</th>
                </tr>
              </thead>

              {/* BODY */}
              <tbody className="text-gray-200">
                {users.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="text-center py-6 text-gray-400">
                      No users found
                    </td>
                  </tr>
                ) : (
                  users.map((user) => (
                    <tr
                      key={user.id}
                      className="border-b border-slate-700 hover:bg-slate-700 transition"
                    >
                      <td className="px-6 py-4">{user.name}</td>
                      <td className="px-6 py-4">{user.email}</td>

                      {/* ROLE BADGE */}
                      <td className="px-6 py-4">
                        <span
                          className={`px-2 py-1 rounded text-sm font-medium ${
                            user.role === "ADMIN"
                              ? "bg-red-500"
                              : user.role === "MANAGER"
                              ? "bg-blue-500"
                              : "bg-green-500"
                          }`}
                        >
                          {user.role}
                        </span>
                      </td>

                      {/* ACTIONS */}
                      <td className="px-6 py-4 flex gap-2">
                        <button
                          className="bg-yellow-500 px-3 py-1 rounded text-white text-sm"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => handleDelete(user.id)}
                          className="bg-red-600 px-3 py-1 rounded text-white text-sm"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>

            </table>
          </div>
        )}
      </div>
    </div>
  );
}