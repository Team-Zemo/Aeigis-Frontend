import { create } from 'zustand';

const BASE_URL = '';

export const useAuthStore = create((set, get) => ({
  // State
  currentStep: 1, // 1: email, 2: registration
  loading: false,
  error: null,
  successMessage: null,
  user: null,
  token: null,
  
  // Form data
  formData: {
    email: '',
    password: '',
    name: '',
    otp: ''
  },

  // Actions
  setFormData: (field, value) => set((state) => ({
    formData: { ...state.formData, [field]: value }
    })),

  setError: (error) => set({ error }),
  setSuccessMessage: (message) => set({ successMessage: message }),
  clearMessages: () => set({ error: null, successMessage: null }),
  
  nextStep: () => set((state) => ({ currentStep: state.currentStep + 1 })),
  resetFlow: () => set({ 
    currentStep: 1, 
    formData: { email: '', password: '', name: '', otp: '' },
    error: null,
    successMessage: null
  }),

  // API calls
  sendOTP: async (email) => {
    set({ loading: true, error: null, successMessage: null });
    try {
      const response = await fetch(`${BASE_URL}/api/auth/send-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      
      if (response.ok) {
        const data = await response.text();
        set({ 
          loading: false, 
          successMessage: data,
          formData: { ...get().formData, email }
        });
        get().nextStep();
      } else {
        let errorMessage = 'Failed to send OTP';
        try {
          const errorData = await response.json();
          errorMessage = errorData.email || errorMessage;
        } catch {
          errorMessage = await response.text() || errorMessage;
        }
        set({ loading: false, error: errorMessage });
      }
    } catch (error) {
      console.error('Network error:', error);
      set({ loading: false, error: 'Network error occurred. Please check your connection.' });
    }
  },

  registerAdmin: async () => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(`${BASE_URL}/api/auth/register-admin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(get().formData)
      });
      
      const data = await response.json();
      
      if (response.ok && data.token) {
        set({ 
          loading: false,
          user: { email: data.email, role: data.role },
          token: data.token,
          successMessage: data.message
        });
        // Store token in localStorage
        localStorage.setItem('authToken', data.token);
      } else {
        set({ loading: false, error: data.message || 'Registration failed' });
      }
    } catch (error) {
      set({ loading: false, error: 'Network error occurred' });
    }
  },

  // Add login method
  login: async (email, password) => {
    set({ loading: true, error: null });
    try {
      console.log('Login attempt:', { 
        email, 
        passwordLength: password.length,
        url: `${BASE_URL}/api/auth/login`
      });

      const response = await fetch(`${BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      
      console.log('Response status:', response.status);
      console.log('Response headers:', Object.fromEntries(response.headers.entries()));
      
      const data = await response.json();
      console.log('Response data:', data);
      
      if (response.ok && data.token) {
        console.log('Login successful, setting user data');
        set({ 
          loading: false,
          user: { email: data.email, role: data.role },
          token: data.token,
          successMessage: data.message
        });
        localStorage.setItem('authToken', data.token);
        return true;
      } else {
        console.log('Login failed with message:', data.message);
        set({ loading: false, error: data.message || 'Login failed' });
        return false;
      }
    } catch (error) {
      console.error('Login error details:', error);
      set({ loading: false, error: 'Network error occurred' });
      return false;
    }
  },

  // Add logout method
  logout: () => {
    localStorage.removeItem('authToken');
    set({
      user: null,
      token: null,
      currentStep: 1,
      formData: { email: '', password: '', name: '', otp: '' },
      error: null,
      successMessage: null
    });
  },

  // Add method to initialize auth state from localStorage
  initializeAuth: () => {
    const token = localStorage.getItem('authToken');
    if (token) {
      set({ 
        token,
        user: { email: 'user@example.com', role: 'ADMIN' } // You might want to decode JWT or fetch user info
      });
    }
  },
}));
