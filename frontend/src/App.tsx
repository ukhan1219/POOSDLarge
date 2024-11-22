import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import LandingPage from "./pages/LandingPage";
import RegisterPage from "./pages/RegisterPage";

import "./App.css";

function App() {
  const LoggedIn = true; // Adjust this logic as needed to determine user login state

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        {LoggedIn && (
          <Route path="/dashboard" element={<Dashboard status={LoggedIn} />} />
        )}
      </Routes>
    </Router>
  );
}

export default App;
