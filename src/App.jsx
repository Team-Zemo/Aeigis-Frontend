import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import EnterpriseL from './pages/LoginPage/Enterprise/EnterpriseL';
import ParentL from './pages/LoginPage/Parent/ParentL';
import EnterpriseR from './pages/RegisterPage/Enterprise/EnterpriseR';
import ParentR from './pages/RegisterPage/Parent/ParentR';
import LandingPage from './pages/LandingPage/LandingPage';
import Logo from './components/logo/Logo';
import Enterprise from './pages/Dashboard/Enterprise';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

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
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/home/*" element={<LandingPage />} />
          <Route path="/enterprise/login" element={<EnterpriseL />} />
          <Route 
            path="/enterprise/dashboard" 
            element={
              <ProtectedRoute>
                <Enterprise />
              </ProtectedRoute>
            } 
          />
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;