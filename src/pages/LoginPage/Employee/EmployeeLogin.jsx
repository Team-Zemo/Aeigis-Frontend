import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuthStore } from '../../../store/authStore';
import Magnet from "../../../components/Magnet.jsx";
import HoverBorderGradientDemo from "../../../components/HoverBorderGradientDemo";
import { theme } from "../../../theme.js";

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
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-3xl/9 font-bold tracking-tight text-black">
            Employee Login
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          {error && <div className="error-message">{error}</div>}
          <form className="space-y-6" onSubmit={handleLoginSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-base/6 font-medium text-black"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={loginData.email}
                  onChange={handleLoginChange}
                  required
                  disabled={loading}
                  placeholder="email@gmail.com"
                  autoComplete="email"
                  className="block w-full rounded-md bg-black/80 px-3 py-2 text-white text outline-1 -outline-offset-1 outline-white/10 placeholder:text-white/50 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-base/6 font-medium text-black"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  value={loginData.password}
                  onChange={handleLoginChange}
                  type="password"
                  placeholder="Enter your password"
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md bg-black/80 px-3 py-2 text-white text outline-1 -outline-offset-1 outline-white/10 placeholder:text-white/50 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <Magnet
                padding={25}
                disabled={false}
                magnetStrength={5}
                wrapperClassName={"w-full"}
              >
                <HoverBorderGradientDemo
                  content={loading ? "Signing in..." : "Sign In"}
                />
              </Magnet>
            </div>
          </form>

          <p className="mt-10 text-center text-sm/6 text-gray-400">
            Don't have an account?{" "}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                toggleMode();
              }}
              className="font-semibold"
              style={{ color: theme.colors.primary }}
            >
              Signup
            </a>
          </p>
        </div>
      </div>
    );
  }

  // Registration form
  return (
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          {error && (
            <div className="mb-6 p-4 bg-red-100 border border-red-300 text-red-700 rounded-lg font-medium">
              {error}
            </div>
          )}
          {successMessage && (
            <div className="mb-6 p-4 bg-green-100 border border-green-300 text-green-700 rounded-lg font-medium">
              {successMessage}
            </div>
          )}
          <h2 className="mt-10 text-center text-3xl/9 font-bold tracking-tight text-black">
            Complete Registration
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          {error && <div className="error-message">{error}</div>}
          <form className="space-y-6" onSubmit={handleRegisterSubmit}>

            <div>
              <label
                htmlFor="text"
                className="block text-base/6 font-medium text-black"
              >
                Invitation Token
              </label>
              <div className="mt-2">
                <input
                  name="invitationToken"
                  type="text"
                  value={formData.invitationToken}
                  onChange={handleRegisterChange}
                  required
                  disabled={loading}
                  placeholder="Enter invitation token"
                  className="block w-full rounded-md bg-black/80 px-3 py-2 text-white text outline-1 -outline-offset-1 outline-white/10 placeholder:text-white/50 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-base/6 font-medium text-black"
              >
                Enter Full Name
              </label>
              <div className="mt-2">
                <input
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleRegisterChange}
                  required
                  disabled={loading}
                  placeholder="Enter your full name"
                  autoComplete="name"
                  className="block w-full rounded-md bg-black/80 px-3 py-2 text-white text outline-1 -outline-offset-1 outline-white/10 placeholder:text-white/50 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-base/6 font-medium text-black"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleRegisterChange}
                  type="password"
                  placeholder="Enter your password"
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md bg-black/80 px-3 py-2 text-white text outline-1 -outline-offset-1 outline-white/10 placeholder:text-white/50 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                />
              </div>
            </div>

            <div type="submit">
              <Magnet
                padding={25}
                disabled={false}
                magnetStrength={5}
                wrapperClassName={"w-full"}
              >
                <HoverBorderGradientDemo
                  content={loading ? "Registering..." : "Register"}
                />
              </Magnet>
            </div>
          </form>

          <p className="mt-10 text-center text-sm/6 text-gray-400">
            Already have an account?{" "}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                toggleMode();
              }}
              className="font-semibold"
              style={{ color: theme.colors.primary }}
            >
              Login
            </a>
          </p>
        </div>
      </div>
  );
}

export default EmployeeLogin;
  