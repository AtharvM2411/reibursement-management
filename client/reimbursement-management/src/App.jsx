import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import Login from "./pages/auth/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import SubmitExpense from "./pages/expenses/SubmitExpense";

function App() {
  return (
    <Router>
      <Routes>
        {/* Default */}
        <Route path="/" element={<Login />} />

        {/* Other pages */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/submit" element={<SubmitExpense />} />
      </Routes>
    </Router>
  );
}

export default App;