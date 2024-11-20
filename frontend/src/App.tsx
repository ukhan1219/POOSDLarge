import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
//import ProfilePage from './pages/ProfilePage'; SOON. 
import LoginPage from './pages/LoginPage';

import './App.css';

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </Router>
  );
}

export default App;