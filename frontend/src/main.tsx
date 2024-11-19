import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import App from './App.tsx'
import LandingPage from './pages/LandingPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './styles.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* <App /> */}
    <LandingPage />
    <Router >
      <Routes>
        {/* <Route path="/login" element={<LoginPage />} /> */}
        {/* <Route path="/cards" element={<CardPage />} /> */}
      </Routes>
    </Router>
  </StrictMode>,
)
