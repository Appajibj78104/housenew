import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Paper, Button, Grid, CircularProgress } from '@mui/material';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const HousewifeDashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (!storedUser || !token) {
      // Redirect to login if no user or token
      window.location.href = '/auth';
      return;
    }

    try {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      setLoading(false);
    } catch (error) {
      console.error('Error parsing user data:', error);
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      window.location.href = '/auth';
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    window.location.href = '/auth';
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper sx={{ p: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h4">Welcome, {user?.fullName || 'Housewife'}</Typography>
              <Button variant="contained" color="secondary" onClick={handleLogout}>
                Logout
              </Button>
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h5" gutterBottom>
                Your Profile
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Typography variant="body1"><strong>Email:</strong> {user?.email}</Typography>
                <Typography variant="body1"><strong>Contact:</strong> {user?.contactNumber}</Typography>
                <Typography variant="body1"><strong>Address:</strong> {user?.address}</Typography>
                <Typography variant="body1" sx={{ mt: 2 }}><strong>Bio:</strong> {user?.bio}</Typography>
                
                <Typography variant="h6" sx={{ mt: 2 }}>Services Offered:</Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                  {user?.serviceCategories?.map((service, index) => (
                    <Paper key={index} sx={{ px: 2, py: 1, bgcolor: 'primary.light', color: 'white' }}>
                      {service}
                    </Paper>
                  ))}
                </Box>
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h5" gutterBottom>
                Service Requests
              </Typography>
              <Typography variant="body1">
                No service requests at the moment. They will appear here when customers request your services.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default HousewifeDashboard; 