import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import EnterpriseL from './pages/LoginPage/Enterprise/EnterpriseL';
import ParentL from './pages/LoginPage/Parent/ParentL';
import EnterpriseR from './pages/RegisterPage/Enterprise/EnterpriseR';
import ParentR from './pages/RegisterPage/Parent/ParentR';
import LandingPage from './pages/LandingPage/LandingPage';
import Logo from './components/logo/Logo';
import { div } from 'framer-motion/client';
import { HeroScrollDemo } from './components/HeroScrollDemo';

function App() {

  return (
    // <BrowserRouter>
    //   <Routes>
    //     <Route path="/landing_page/*" element={<LandingPage />} />
    //     <Route path="/login/parent/*" element={<ParentL />} />
    //     <Route path="/login/enterprise/*" element={<EnterpriseL />} />
    //     <Route path="/register/parent/*" element={<ParentR />} />
    //     <Route path="/register/enterprise/*" element={<EnterpriseR />} />

    //     <Route
    //       path="/"
    //       element={<Navigate to="/landing_page" replace />}
    //     />
    //     <Route
    //       path="*"
    //       element={<Navigate to="/landing_page" replace />}
    //     />
    //   </Routes>
    // </BrowserRouter>
    <div>
      <HeroScrollDemo />
    </div>

  );
}

export default App;