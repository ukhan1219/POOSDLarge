import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage/index.tsx';
import './styles.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    {/* <Dashboard /> */}
    <Router >
      <Routes>
        {<Route path="/login" element={<LoginPage />} />}
        {/* <Route path="/cards" element={<CardPage />} /> */}
      </Routes>
    </Router>
  </StrictMode>,
)
