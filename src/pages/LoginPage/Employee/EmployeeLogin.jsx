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

function EmployeeLogin() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { 
    completeEmployeeRegistration, 
    login, 
    loading, 
    error, 
    successMessage, 
    clearMessages 
  } = useAuthStore();
  
  const [isLogin, setIsLogin] = useState(!searchParams.get('token')); // If token exists, show registration
  
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const [formData, setFormData] = useState({
    invitationToken: searchParams.get('token') || '',
    password: '',
    name: ''
  });

  useEffect(() => {
    clearMessages();
  }, [clearMessages]);

  const toggleMode = () => {
    setIsLogin(!isLogin);
    clearMessages();
    setLoginData({ email: '', password: '' });
    setFormData({
      invitationToken: searchParams.get('token') || '',
      password: '',
      name: ''
    });
  };

  const handleLoginChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    });
  };

  const handleRegisterChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    
    if (!loginData.email || !loginData.password) {
      return;
    }

    const success = await login(loginData.email, loginData.password);
    
    if (success) {
      navigate('/employee');
    }
  };

  const handleRegisterSubmit = async (e) => {
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

  if (isLogin) {
    return (
      <Container maxWidth="sm" sx={{ mt: 8 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom align="center">
            Employee Login
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

          <Box component="form" onSubmit={handleLoginSubmit}>
            <TextField
              fullWidth
              margin="normal"
              label="Email"
              name="email"
              type="email"
              value={loginData.email}
              onChange={handleLoginChange}
              required
              disabled={loading}
            />

            <TextField
              fullWidth
              margin="normal"
              label="Password"
              name="password"
              type="password"
              value={loginData.password}
              onChange={handleLoginChange}
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
              {loading ? <CircularProgress size={24} /> : 'Login'}
            </Button>
          </Box>

          {!searchParams.get('token') && (
            <Typography align="center" sx={{ mt: 2 }}>
              Have an invitation?{' '}
              <Button onClick={toggleMode} variant="text">
                Register here
              </Button>
            </Typography>
          )}
        </Paper>
      </Container>
    );
  }

  // Registration form
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
        
        <Box component="form" onSubmit={handleRegisterSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="Invitation Token"
            name="invitationToken"
            value={formData.invitationToken}
            onChange={handleRegisterChange}
            required
            disabled={loading}
          />
          
          <TextField
            fullWidth
            margin="normal"
            label="Full Name"
            name="name"
            value={formData.name}
            onChange={handleRegisterChange}
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
            onChange={handleRegisterChange}
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

        <Typography align="center" sx={{ mt: 2 }}>
          Already have an account?{' '}
          <Button onClick={toggleMode} variant="text">
            Login here
          </Button>
        </Typography>
      </Paper>
    </Container>
  );
}

export default EmployeeLogin;
//             onChange={handleChange}
//             required
//             disabled={loading}
//           />

//           <Button
//             type="submit"
//             fullWidth
//             variant="contained"
//             sx={{ mt: 3, mb: 2 }}
//             disabled={loading}
//           >
//             {loading ? <CircularProgress size={24} /> : 'Login'}
//           </Button>
//         </Box>
//       </Paper>
//     </Container>
//   );
// }}

// export default EmployeeLogin;
