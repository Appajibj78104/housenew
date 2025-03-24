// Environment variables configuration for frontend
const env = {
  // API Configuration
  apiUrl: import.meta.env.VITE_APP_API_URL || 'http://localhost:5000/api',
  
  // App Information
  appName: import.meta.env.VITE_APP_NAME || 'House Warrior',
  appDescription: import.meta.env.VITE_APP_DESCRIPTION || 'Connecting skilled housewives with customers who need their services',
  appVersion: import.meta.env.VITE_APP_VERSION || '1.0.0',
  
  // Feature Flags
  enableAnalytics: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
  isDevelopment: import.meta.env.MODE === 'development',
  
  // Authentication
  authTokenKey: 'housewarrior_auth_token',
  userDataKey: 'housewarrior_user',
};

export default env; 