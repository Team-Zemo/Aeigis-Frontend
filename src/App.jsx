import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import EnterpriseL from './pages/LoginPage/Enterprise/EnterpriseL';
import LandingPage from './pages/LandingPage/LandingPage';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Dashboard from './pages/Dashboard/Dashboard';
import ChatScreen from './pages/ChatPage/ChatScreen';
// import EmployeeLogin from './pages/LoginPage/Employee/EmployeeLogin';

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
          {/* <Route path="/employee/*" element={<EmployeeLogin />} /> */}
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
                <ChatScreen />
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