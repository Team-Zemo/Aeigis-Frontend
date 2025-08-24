import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import EnterpriseL from './pages/LoginPage/Enterprise/EnterpriseL';
import ParentL from './pages/LoginPage/Parent/ParentL';
import EnterpriseR from './pages/RegisterPage/Enterprise/EnterpriseR';
import ParentR from './pages/RegisterPage/Parent/ParentR';
import LandingPage from './pages/LandingPage/LandingPage';
import DashBoard from './pages/DashBoard/DashBoard';
import Logo from './components/logo/Logo';
import Enterprise from './pages/Dashboard/Enterprise';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Dashboard from './pages/Dashboard/Dashboard';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home/*" element={<LandingPage />} />
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;