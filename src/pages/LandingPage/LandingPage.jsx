import Box from '@mui/material/Box';
import Navbar from './Navbar';
import Particles from './Particles';
import EnterpriseL from '../LoginPage/Enterprise/EnterpriseL';
import About from './About';
import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import EmployeeLogin from '../LoginPage/Employee/EmployeeLogin.jsx';


function LandingPage() {
  return (
    <div sx={{height: '100vh', width: '100vw', position: 'relative'}}>
      {/* Make Particles fixed and full viewport */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0
      }}>
        <Particles
          particleColors={['#000', '#000']}
          particleCount={200}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover={true}
          alphaParticles={false}
          disableRotation={false}
        />
      </div>
      {/* Content goes above particles */}
      <div style={{ width: '100%', minHeight: 'fit-content', position: 'relative', zIndex: 1}}>
        <Box sx={{width: '100%', pointerEvents: 'auto'}}>
          <Navbar />
        </Box>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/enterprise" element={<EnterpriseL />} />
          <Route path="/employee" element={<EmployeeLogin />} />
          <Route path="/about" element={<About />} />
        </Routes>

      </div>
    </div>
  );
}

export default LandingPage;
