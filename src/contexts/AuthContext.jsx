import React, { createContext, useContext, useState, useEffect } from 'react';
import env from '../config/environment';

// Create auth context
const AuthContext = createContext();

// Custom hook to use the auth context
export const useAuth = () => {
  return useContext(AuthContext);
};

// Auth provider component
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Check if user is logged in on initial load
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        // Check if token exists in localStorage
        const token = localStorage.getItem(env.authTokenKey);
        
        if (token) {
          // Here you would normally validate the token with your backend
          // For now, we'll just assume it's valid if it exists
          setIsAuthenticated(true);
          
          // Get user data from localStorage
          const userData = JSON.parse(localStorage.getItem(env.userDataKey));
          setCurrentUser(userData);
        }
      } catch (err) {
        console.error('Auth status check failed:', err);
        setError('Session verification failed');
        // Clear any invalid tokens
        localStorage.removeItem(env.authTokenKey);
        localStorage.removeItem(env.userDataKey);
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  // Login function
  const login = async (email, password) => {
    setLoading(true);
    setError('');
    
    try {
      // Make the actual API call to the backend
      const response = await fetch(`${env.apiUrl}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }
      
      // Store token and user data from actual response
      localStorage.setItem(env.authTokenKey, data.token);
      localStorage.setItem(env.userDataKey, JSON.stringify(data.user));
      
      setCurrentUser(data.user);
      setIsAuthenticated(true);
      return true;
    } catch (err) {
      console.error('Login error:', err);
      setError(err.message || 'Login failed');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Register function
  const register = async (userData) => {
    setLoading(true);
    setError('');
    
    try {
      // Make the actual API call to the backend
      const response = await fetch(`${env.apiUrl}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }
      
      // Return success but don't automatically log in
      // The user will be redirected to login page
      return true;
    } catch (err) {
      console.error('Registration error:', err);
      setError(err.message || 'Registration failed');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    // Clear all auth data
    localStorage.removeItem(env.authTokenKey);
    localStorage.removeItem(env.userDataKey);
    setCurrentUser(null);
    setIsAuthenticated(false);
  };

  // Auth context value
  const value = {
    currentUser,
    isAuthenticated,
    loading,
    error,
    login,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider; 