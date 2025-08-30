import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import HeroScrollDemo from '../../components/HeroScrollDemo';
import LogoLoop from '../../components/LogoLoop';
import { theme } from '../../theme.js';
import { FaRobot } from 'react-icons/fa';
import { SiOpenai } from 'react-icons/si';
import { SiGoogle } from 'react-icons/si';
import { FaQuestionCircle } from 'react-icons/fa';
// Import AEGIS logo
import aegisLogo from '../../assets/aegis.jpg';

const techLogos = [
    { node: <FaRobot />, title: "Claude", href: "https://claude.ai" },
    { node: <SiOpenai />, title: "ChatGPT", href: "https://chat.openai.com" },
    { node: <SiGoogle />, title: "Gemini", href: "https://gemini.google.com" },
    { node: <FaQuestionCircle />, title: "Perplexity", href: "https://www.perplexity.ai" },
];

function Home() {

    return (
      // <PageWrapper backgroundColor='#fbded6'>
      <Box sx={{ 
        width: '100%', 
        minHeight: '100vh',
        backgroundColor: 'transparent',
        pointerEvents:'auto'
      }}>
            {/* Top Text Grid */}
            <Grid container>
                <Grid item xs={12} md={6} sx={{ mt: 25 }}>
                    <Typography
                        variant="h3"
                        sx={{
                            fontFamily: theme.typography.fontFamily,
                            pl: 13,
                            fontSize: { xs: 60, md: 150 },
                            fontWeight: '700',
                            lineHeight: 1
                        }}
                    >
                        See the signs,
                    </Typography>
                    <Typography
                        variant="h3"
                        sx={{
                            fontFamily: theme.typography.fontFamily,
                            pl: 13,
                            fontSize: { xs: 60, md: 150 },
                            fontWeight: '700',
                            lineHeight: 1
                        }}
                    >
                        Draw the lines
                    </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                    {/* Additional content can go here */}
                </Grid>
            </Grid>

            {/* Hero Scroll Section */}
            <Box sx={{ mt: 8, width: '100%', overflow: 'hidden' }}>
                <HeroScrollDemo 
                    titleComponent="AEGIS Security Platform"
                >
                    <img 
                        src={aegisLogo} 
                        alt="AEGIS Logo" 
                        height={720}
                        width={1400}
                        className="mx-auto rounded-2xl object-cover h-full object-center"
                        draggable={false}
                        style={{
                            objectFit: 'contain',
                            display: 'block',
                            margin: '0 auto'
                        }}
                    />
                </HeroScrollDemo>
            </Box>

            {/* Bottom Text Grid */}
            <Grid container sx={{ mt: 0.1}}>
                <Grid item xs={12} md={6} sx={{ mt: 25 }}>
                    <Typography
                        variant="h3"
                        sx={{
                            fontFamily: theme.typography.fontFamily,
                            pl: 13,
                            fontSize: { xs: 60, md: 150 },
                            fontWeight: '700',
                            lineHeight: 1
                        }}
                    >
                        Beat the AI,
                    </Typography>
                    <Typography
                        variant="h3"
                        sx={{
                            fontFamily: theme.typography.fontFamily,
                            pl: 13,
                            fontSize: { xs: 60, md: 150 },
                            fontWeight: '700',
                            lineHeight: 1
                        }}
                    >
                        By the AI
                    </Typography>
                </Grid>
            </Grid>
            <Box sx={{mt:30}}>
                <LogoLoop
                    logos={techLogos}
                    speed={120}
                    direction="left"
                    logoHeight={150}
                    gap={40}
                    pauseOnHover
                    scaleOnHover
                    fadeOut
                    fadeOutColor="#ffffff"
                    ariaLabel="Technology partners"
                />
            </Box>
            <Box
                component="footer"
                sx={{
                    width: '100%',
                    background: '#1a1a1a',
                    color: '#fff',
                    py: 6,
                    px: { xs: 4, md: 13 },
                    mt: 12,
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}
            >
                <Typography
                    variant="body1"
                    sx={{
                        fontFamily: theme.typography.fontFamily,
                        fontWeight: 500,
                        fontSize: { xs: 16, md: 18 }
                    }}
                >
                    © 2024 Your Company
                </Typography>
                <Box sx={{
                    display: 'flex',
                    gap: 4,
                    mt: { xs: 3, md: 0 },
                    fontFamily: theme.typography.fontFamily
                }}>
                    <Typography
                        component="a"
                        href="#"
                        sx={{
                            color: '#fff',
                            textDecoration: 'none',
                            fontWeight: 500,
                            fontSize: { xs: 16, md: 18 },
                            '&:hover': { color: '#ccc' }
                        }}
                    >
                        Privacy
                    </Typography>
                    <Typography
                        component="a"
                        href="#"
                        sx={{
                            color: '#fff',
                            textDecoration: 'none',
                            fontWeight: 500,
                            fontSize: { xs: 16, md: 18 },
                            '&:hover': { color: '#ccc' }
                        }}
                    >
                        Terms
                    </Typography>
                    <Typography
                        component="a"
                        href="#"
                        sx={{
                            color: '#fff',
                            textDecoration: 'none',
                            fontWeight: 500,
                            fontSize: { xs: 16, md: 18 },
                            '&:hover': { color: '#ccc' }
                        }}
                    >
                        Contact
                    </Typography>
                </Box>
            </Box>
        </Box>
        // {/* </PageWrapper> */}

    );
}

export default Home;