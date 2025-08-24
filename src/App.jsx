import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import EnterpriseL from './pages/LoginPage/Enterprise/EnterpriseL';
import LandingPage from './pages/LandingPage/LandingPage';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Dashboard from './pages/Dashboard/Dashboard';
import Employee from './pages/Employee/Employee';
import EmployeeL from './pages/LoginPage/Employee/EmployeeL';

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
          <Route path="/employee/*" element={<EmployeeL />} />
          <Route 
            path="/enterprise/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute> 
            } 
          />
          <Route 
            path="/employee" 
            element={
              <ProtectedRoute>
                <Employee />
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