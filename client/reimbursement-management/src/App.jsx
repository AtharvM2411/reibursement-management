import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

// import your pages
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import SubmitExpense from "./pages/SubmitExpense";

function App() {
  return (
    <Router>
      <Routes>
        {/* Default route */}
        <Route path="/" element={<Login />} />

        {/* Other pages */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/submit" element={<SubmitExpense />} />
      </Routes>
    </Router>
  );
}

export default App;