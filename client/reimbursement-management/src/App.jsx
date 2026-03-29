import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/auth/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import Approvals from "./pages/approvals/Approvals";
import SubmitExpense from "./pages/expenses/SubmitExpense";
import Expenses from "./pages/expenses/Expenses";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/approvals" element={<Approvals />} />
        <Route path="/submit" element={<SubmitExpense />} />
        <Route path="/expenses" element={<Expenses />} />
      </Routes>
    </Router>
  );

}

export default App;