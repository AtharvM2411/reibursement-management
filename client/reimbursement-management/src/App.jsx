import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Auth
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";

// Dashboards
import EmployeeDashboard from "./pages/dashboard/EmployeeDashboard";
import ManagerDashboard from "./pages/dashboard/ManagerDashboard";
import AdminDashboard from "./pages/dashboard/AdminDashboard";

// Features
import Approvals from "./pages/approvals/Approvals";
import SubmitExpense from "./pages/expenses/SubmitExpense";
import Expenses from "./pages/expenses/Expenses";

function App() {
  return (
    <Router>
      <Routes>

        {/* Auth */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Dashboards */}
        <Route path="/employee" element={<EmployeeDashboard />} />
        <Route path="/manager" element={<ManagerDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />

        {/* Features */}
        <Route path="/approvals" element={<Approvals />} />
        <Route path="/submit" element={<SubmitExpense />} />
        <Route path="/expenses" element={<Expenses />} />

      </Routes>
    </Router>
  );
}

export default App;