import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import CardPage from './pages/CardPage';
import './styles.css'

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
