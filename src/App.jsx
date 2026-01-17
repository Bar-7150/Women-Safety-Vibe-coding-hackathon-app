import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SafetyPage from './location/SafetyPage';
import HealthPage from './health/HealthPage';
import LoginPage from './auth/LoginPage';
import RegisterPage from './auth/RegisterPage';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import Layout from './components/layouts/Layout';
import './App.css';

// Guard Component Removed - Dashboard is now public

function App() {
  return (
    <Router>
      <Routes>
        {/* Main App Layout covers ALL pages now */}
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Public Dashboard (Renamed to Safety) */}
          <Route path="/safety" element={<SafetyPage />} />
          <Route path="/dashboard" element={<Navigate to="/safety" replace />} />

          {/* Health Dashboard */}
          <Route path="/health" element={<HealthPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App
