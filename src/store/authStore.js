import { create } from 'zustand';
import { authApi, analyticsApi } from './api.js';

export const useAuthStore = create((set, get) => ({
  // State
  currentStep: 1, // 1: email, 2: registration
  loading: false,
  error: null,
  successMessage: null,
  user: null,
  token: null,
  analytics: null,
  
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
      const response = await authApi.sendOTP(email);
      
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
      console.log('Register payload:', get().formData);

      const response = await authApi.registerAdmin(get().formData);
      const data = await response.json();
      
      if (response.ok && data.token) {
        set({ 
          loading: false,
          user: { email: data.email, role: data.role },
          token: data.token,
          successMessage: data.message
        });
        localStorage.setItem('authToken', data.token);
      } else {
        set({ loading: false, error: data.message || 'Registration failed' });
      }
    } catch (error) {
      set({ loading: false, error: 'Network error occurred' });
    }
  },

  login: async (email, password) => {
    set({ loading: true, error: null });
    try {
      console.log('Login attempt:', { 
        email, 
        passwordLength: password.length
      });

      const response = await authApi.login(email, password);

      console.log('Response status:', response.status);

      let data;
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        const message = await response.text();
        data = { message, token: null };
      }

      if (response.ok && data.token) {
        set({ 
          loading: false,
          user: { email: data.email, role: data.role },
          token: data.token,
          successMessage: data.message
        });
        localStorage.setItem('authToken', data.token);
        return true;
      } else {
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

  inviteEmployee: async (email) => {
    set({ loading: true, error: null, successMessage: null });
    try {
      const response = await authApi.inviteEmployee(email);
      
      if (response.status === 200) {
        const message = await response.text();
        set({ loading: false, successMessage: message || 'email is sent' });
        return true;
      } else if (response.status === 403) {
        set({ loading: false, error: 'You do not have permission to invite employees.' });
        return false;
      } else {
        const errorMsg = await response.text();
        set({ loading: false, error: errorMsg || 'Failed to send invite' });
        return false;
      }
    } catch (error) {
      set({ loading: false, error: 'Network error occurred' });
      return false;
    }
  },

  completeEmployeeRegistration: async (invitationToken, password, name) => {
    set({ loading: true, error: null, successMessage: null });
    try {
      const response = await authApi.completeEmployeeRegistration(invitationToken, password, name);
      const data = await response.json();
      
      if (response.ok && data.token) {
        set({ 
          loading: false,
          user: { email: data.email, role: data.role },
          token: data.token,
          successMessage: data.message
        });
        localStorage.setItem('authToken', data.token);
        return true;
      } else {
        set({ loading: false, error: data.message || 'Registration failed' });
        return false;
      }
    } catch (error) {
      set({ loading: false, error: 'Network error occurred' });
      return false;
    }
  },

  // Analytics methods
  fetchAnalytics: async () => {
    set({ loading: true, error: null });
    try {
      const result = await analyticsApi.getAnalytics();
      
      if (result.success) {
        set({ loading: false, analytics: result.data });
        return true;
      } else {
        set({ loading: false, error: result.error });
        return false;
      }
    } catch (error) {
      set({ loading: false, error: 'Failed to fetch analytics' });
      return false;
    }
  },
}));
//           loading: false,
//           user: { email: data.email, role: data.role },
//           token: data.token,
//           successMessage: data.message
//         });
//         localStorage.setItem('authToken', data.token);
//         return true;
//       } else {
//         set({ loading: false, error: data.message || 'Registration failed' });
//         return false;
//       }
//     } catch (error) {
//       set({ loading: false, error: 'Network error occurred' });
//       return false;
//     }
//   },
// }));
