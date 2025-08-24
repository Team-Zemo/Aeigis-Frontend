import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import EnterpriseL from './pages/LoginPage/Enterprise/EnterpriseL';
import ParentL from './pages/LoginPage/Parent/ParentL';
import EnterpriseR from './pages/RegisterPage/Enterprise/EnterpriseR';
import ParentR from './pages/RegisterPage/Parent/ParentR';
import LandingPage from './pages/LandingPage/LandingPage';
import Logo from './components/logo/Logo';

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