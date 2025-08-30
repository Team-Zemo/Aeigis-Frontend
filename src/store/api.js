const BASE_URL = 'http://localhost:8080';
// const BASE_URL = 'http://192.168.137.59:8080';

// Base API utility function
const apiRequest = async (endpoint, options = {}) => {
  const token = localStorage.getItem('authToken');
  
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {})
    },
    // Add CORS mode
    mode: 'cors'
  };

  const mergedOptions = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers
    }
  };

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, mergedOptions);
    return response;
  } catch (error) {
    console.error('API Request Error:', error);
    throw error;
  }
};

// Unauthenticated API utility function (no Authorization header)
const unauthenticatedApiRequest = async (endpoint, options = {}) => {
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json'
    },
    mode: 'cors'
  };

  const mergedOptions = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers
    }
  };

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, mergedOptions);
    return response;
  } catch (error) {
    console.error('API Request Error:', error);
    throw error;
  }
};

// Analytics API
export const analyticsApi = {
  getAnalytics: async () => {
    try {
      const response = await apiRequest('/api/admin/analytics', {
        method: 'GET'
      });

      if (response.ok) {
        const data = await response.json();
        return { success: true, data };
      } else {
        const errorMsg = await response.text();
        return { success: false, error: errorMsg || 'Failed to fetch analytics' };
      }
    } catch (error) {
      console.error('Analytics API error:', error);
      // Return mock data when API is unavailable due to CORS or network issues
      if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
        console.warn('API unavailable, returning mock data');
        return { 
          success: true, 
          data: getMockAnalyticsData() 
        };
      }
      return { success: false, error: 'Network error occurred' };
    }
  }
};

// Mock data function for when API is unavailable
const getMockAnalyticsData = () => ({
  "overallStats": {
    "totalEmployees": 0,
    "totalQueries": 0,
    "safeQueries": 0,
    "warningQueries": 0,
    "severeQueries": 0,
    "safePercentage": 0,
    "warningPercentage": 0,
    "severePercentage": 0
  },
  "employeeAnalytics": [
    {
      "employeeEmail": "demo@example.com",
      "employeeName": "Demo User",
      "totalQueries": 0,
      "safeQueries": 0,
      "warningQueries": 0,
      "severeQueries": 0,
      "safePercentage": 0,
      "warningPercentage": 0,
      "severePercentage": 0,
      "lastQueryDate": "Never"
    }
  ],
  "recentSevereQueries": [],
  "recentWarningQueries": [],
  "dailyQueryCounts": {
    "2025-01-18": 0,
    "2025-01-19": 0,
    "2025-01-20": 0,
    "2025-01-21": 0,
    "2025-01-22": 0,
    "2025-01-23": 0,
    "2025-01-24": 0
  },
  "weeklyQueryCounts": {
    "Week 01-03": 0,
    "Week 01-10": 0,
    "Week 01-17": 0,
    "Week 01-24": 0
  },
  "monthlyQueryCounts": {
    "2024-08": 0,
    "2024-09": 0,
    "2024-10": 0,
    "2024-11": 0,
    "2024-12": 0,
    "2025-01": 0
  }
});

// Auth API (moved from authStore)
export const authApi = {
  sendOTP: async (email) => {
    const response = await unauthenticatedApiRequest('/api/auth/send-otp', {
      method: 'POST',
      body: JSON.stringify({ email })
    });
    return response;
  },

  registerAdmin: async (formData) => {
    const response = await unauthenticatedApiRequest('/api/auth/register-admin', {
      method: 'POST',
      body: JSON.stringify(formData)
    });
    return response;
  },

  login: async (email, password) => {
    const response = await unauthenticatedApiRequest('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });
    return response;
  },

  inviteEmployee: async (email) => {
    const response = await apiRequest('/api/admin/invite-user', {
      method: 'POST',
      body: JSON.stringify({ email })
    });
    return response;
  },

  completeEmployeeRegistration: async (invitationToken, password, name) => {
    const response = await unauthenticatedApiRequest('/api/auth/complete-registration', {
      method: 'POST',
      body: JSON.stringify({ invitationToken, password, name })
    });
    return response;
  },

  getEmployees: async () => {
    const response = await apiRequest('/api/admin/employees', {
      method: 'GET'
    });
    return response;
  },

  getEmployeeAnalytics: async (email) => {
    const response = await apiRequest(`/api/admin/analytics/employee/${encodeURIComponent(email)}`, {
      method: 'GET'
    });
    return response;
  }
};

// Policies API
export const policiesApi = {
  createPolicies: async (policies) => {
    const response = await apiRequest('/api/admin/policies', {
      method: 'POST',
      body: JSON.stringify(policies)
    });
    return response;
  },

  getPolicies: async () => {
    const response = await apiRequest('/api/admin/policies', {
      method: 'GET'
    });
    return response;
  }
};
