import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="bg-white shadow px-6 py-3 flex justify-between items-center">

      {/* Left */}
      <h1
        onClick={() => navigate("/")}
        className="text-xl font-bold text-blue-600 cursor-pointer"
      >
        Reimbursement System
      </h1>

      {/* Middle (role-based links) */}
      <div className="flex gap-4 items-center">

        {user?.role === "EMPLOYEE" && (
          <>
            <button onClick={() => navigate("/employee")} className="hover:text-blue-600">
              Dashboard
            </button>
            <button onClick={() => navigate("/submit")} className="hover:text-blue-600">
              Submit
            </button>
            <button onClick={() => navigate("/expenses")} className="hover:text-blue-600">
              Expenses
            </button>
          </>
        )}

        {user?.role === "MANAGER" && (
          <>
            <button onClick={() => navigate("/manager")} className="hover:text-blue-600">
              Dashboard
            </button>
            <button onClick={() => navigate("/approvals")} className="hover:text-blue-600">
              Approvals
            </button>
          </>
        )}

        {user?.role === "ADMIN" && (
          <>
            <button onClick={() => navigate("/admin")} className="hover:text-blue-600">
              Dashboard
            </button>
          </>
        )}

      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600">
          {user?.role}
        </span>

        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;