import React from 'react';
import { Box, Container, Grid, Typography, Link, IconButton } from '@mui/material';
import { theme } from '../../theme.js';

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        background: 'linear-gradient(135deg, #1f2937 0%, #111827 100%)',
        color: 'white',
        py: 6,
        mt: 'auto'
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Company Info */}
          <Grid item xs={12} md={4}>
            <Typography 
              variant="h5" 
              sx={{
                fontFamily: theme.typography.fontFamily,
                fontWeight: '700',
                mb: 2,
                background: 'linear-gradient(45deg, #1fd656ff, #910dfcff)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              Aegis
            </Typography>
            <Typography 
              variant="body1" 
              sx={{
                color: '#d1d5db',
                lineHeight: 1.6,
                mb: 3
              }}
            >
              Protecting enterprise AI interactions with advanced security, 
              real-time monitoring, and comprehensive compliance solutions.
            </Typography>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} md={4}>
            <Typography 
              variant="h6" 
              sx={{
                fontFamily: theme.typography.fontFamily,
                fontWeight: '700',
                mb: 2
              }}
            >
              Quick Links
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link 
                href="/home" 
                sx={{ 
                  color: '#d1d5db', 
                  textDecoration: 'none',
                  '&:hover': { color: theme.colors.primary }
                }}
              >
                Home
              </Link>
              <Link 
                href="/home/about" 
                sx={{ 
                  color: '#d1d5db', 
                  textDecoration: 'none',
                  '&:hover': { color: theme.colors.primary }
                }}
              >
                About
              </Link>
              <Link 
                href="/home/enterprise" 
                sx={{ 
                  color: '#d1d5db', 
                  textDecoration: 'none',
                  '&:hover': { color: theme.colors.primary }
                }}
              >
                Enterprise
              </Link>
              <Link 
                href="/home/employee" 
                sx={{ 
                  color: '#d1d5db', 
                  textDecoration: 'none',
                  '&:hover': { color: theme.colors.primary }
                }}
              >
                Employee Portal
              </Link>
            </Box>
          </Grid>

          {/* Features */}
          <Grid item xs={12} md={4}>
            <Typography 
              variant="h6" 
              sx={{
                fontFamily: theme.typography.fontFamily,
                fontWeight: '700',
                mb: 2
              }}
            >
              Security Features
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Typography variant="body2" sx={{ color: '#d1d5db' }}>
                🛡️ Data Leakage Prevention
              </Typography>
              <Typography variant="body2" sx={{ color: '#d1d5db' }}>
                ⚡ Real-Time Detection
              </Typography>
              <Typography variant="body2" sx={{ color: '#d1d5db' }}>
                ⚖️ Ethical AI Use
              </Typography>
              <Typography variant="body2" sx={{ color: '#d1d5db' }}>
                🚨 Automatic Mitigation
              </Typography>
              <Typography variant="body2" sx={{ color: '#d1d5db' }}>
                📈 Continuous Improvement
              </Typography>
            </Box>
          </Grid>
        </Grid>

        {/* Bottom Section */}
        <Box 
          sx={{
            borderTop: '1px solid #374151',
            mt: 4,
            pt: 4,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 2
          }}
        >
          <Typography variant="body2" sx={{ color: '#9ca3af' }}>
            © 2025 Aegis. All rights reserved. Secure AI for Enterprise.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Link 
              href="#" 
              sx={{ 
                color: '#9ca3af', 
                textDecoration: 'none',
                '&:hover': { color: theme.colors.primary }
              }}
            >
              Privacy Policy
            </Link>
            <Link 
              href="#" 
              sx={{ 
                color: '#9ca3af', 
                textDecoration: 'none',
                '&:hover': { color: theme.colors.primary }
              }}
            >
              Terms of Service
            </Link>
            <Link 
              href="#" 
              sx={{ 
                color: '#9ca3af', 
                textDecoration: 'none',
                '&:hover': { color: theme.colors.primary }
              }}
            >
              Contact
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;
