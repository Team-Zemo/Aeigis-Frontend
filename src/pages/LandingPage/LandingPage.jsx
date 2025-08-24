import Box from '@mui/material/Box';
import Navbar from './Navbar';
import Particles from './Particles';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import HeroScrollDemo from '../../components/HeroScrollDemo';
import EnterpriseL from '../LoginPage/Enterprise/EnterpriseL';
import { Routes, Route } from 'react-router-dom';
import Home from './Home';

import { theme } from '../../theme.js';

function LandingPage() {
  return (
    <Box sx={{height: '100vh', width: '100vw', position: 'relative'}}>
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
        <Box sx={{width: '100%', pointerEvents: 'auto', overflow: 'hidden'}}>
          <Navbar />
        </Box>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/enterprise" element={<EnterpriseL />} />
        </Routes>

        
        {/* <Box sx={{mt:20, width: '100%'}} overflow="hidden">
          <HeroScrollDemo/>
        </Box> */}



      </div>
    </Box>
  );
}

export default LandingPage;
