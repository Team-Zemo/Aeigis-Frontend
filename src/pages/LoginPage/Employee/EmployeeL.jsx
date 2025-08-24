import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  CircularProgress
} from '@mui/material';
import { useAuthStore } from '../../../store/authStore';

function EmployeeL() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { completeEmployeeRegistration, loading, error, successMessage, clearMessages } = useAuthStore();
  
  const [formData, setFormData] = useState({
    invitationToken: searchParams.get('token') || '',
    password: '',
    name: ''
  });

  useEffect(() => {
    clearMessages();
  }, [clearMessages]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.invitationToken || !formData.password || !formData.name) {
      return;
    }

    const success = await completeEmployeeRegistration(
      formData.invitationToken,
      formData.password,
      formData.name
    );

    if (success) {
      navigate('/employee');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Complete Registration
        </Typography>
        
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        
        {successMessage && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {successMessage}
          </Alert>
        )}
        
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="Invitation Token"
            name="invitationToken"
            value={formData.invitationToken}
            onChange={handleChange}
            required
            disabled={loading}
          />
          
          <TextField
            fullWidth
            margin="normal"
            label="Full Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            disabled={loading}
          />
          
          <TextField
            fullWidth
            margin="normal"
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
            disabled={loading}
          />
          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Complete Registration'}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default EmployeeL;
