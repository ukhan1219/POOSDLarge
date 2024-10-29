import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import LoginPage from './pages/LoginPage';
import CardPage from './pages/CardPage';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <Router >
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/cards" element={<CardPage />} />
      </Routes>
    </Router>
  </StrictMode>,
)
