import React from 'react';
import { Box, Typography, Container, Paper, Button } from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 8, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Dashboard
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Welcome back, {currentUser?.name || 'User'}!
        </Typography>
      </Box>

      <Paper sx={{ p: 4, mb: 4, borderRadius: 2 }}>
        <Typography variant="h6" gutterBottom>
          User Information
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Typography variant="body1">
            <strong>Name:</strong> {currentUser?.name || 'N/A'}
          </Typography>
          <Typography variant="body1">
            <strong>Email:</strong> {currentUser?.email || 'N/A'}
          </Typography>
          <Typography variant="body1">
            <strong>Role:</strong> {currentUser?.role === 'housewife' ? 'Service Provider (Housewife)' : 'Customer'}
          </Typography>
        </Box>
      </Paper>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button variant="outlined" color="primary" onClick={handleLogout}>
          Logout
        </Button>
      </Box>
    </Container>
  );
};

export default Dashboard; 