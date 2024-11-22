import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import LandingPage from "./pages/LandingPage";
import RegisterPage from "./pages/RegisterPage";
import ProfileForm from "./pages/ProfilePage";
import CalendarPage from "./pages/CalendarPage";

import "./App.css";

function App() {
  const LoggedIn = true; // Adjust this logic as needed to determine user login state
  console.log("App status:", LoggedIn);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage status = {LoggedIn}/>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile" element={<ProfileForm />} />
        <Route path="/calendar" element={<CalendarPage/>}/>
        <Route path="/dashboard" element={<Dashboard status={LoggedIn} />} />
      </Routes>
    </Router>
  );
}

export default App;
