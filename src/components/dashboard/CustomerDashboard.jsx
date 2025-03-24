import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Paper, Button, Grid, CircularProgress, Card, CardContent, CardActions } from '@mui/material';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const CustomerDashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [services, setServices] = useState([]);

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
      
      // Load mock services for demo
      setServices([
        {
          id: 1,
          category: 'Culinary',
          providerId: 'user1',
          providerName: 'Jane Smith',
          description: 'Homemade meals and baked goods prepared with love and care.',
          rating: 4.8,
        },
        {
          id: 2,
          category: 'Tutoring',
          providerId: 'user2',
          providerName: 'Mary Johnson',
          description: 'Mathematics and science tutoring for school children.',
          rating: 4.9,
        },
        {
          id: 3,
          category: 'Beauty & Personal Care',
          providerId: 'user3',
          providerName: 'Sarah Williams',
          description: 'Home beauty services including haircuts, styling, and makeup.',
          rating: 4.6,
        },
      ]);
      
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
              <Typography variant="h4">Welcome, {user?.fullName || 'Customer'}</Typography>
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
                {user?.interests && (
                  <Typography variant="body1" sx={{ mt: 2 }}>
                    <strong>Interests:</strong> {user.interests}
                  </Typography>
                )}
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h5" gutterBottom>
                Available Services
              </Typography>
              <Grid container spacing={2} sx={{ mt: 1 }}>
                {services.map((service) => (
                  <Grid item xs={12} sm={6} md={4} key={service.id}>
                    <Card>
                      <CardContent>
                        <Typography variant="h6" gutterBottom>
                          {service.category}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                          Provider: {service.providerName}
                        </Typography>
                        <Typography variant="body2">
                          {service.description}
                        </Typography>
                        <Typography variant="body2" sx={{ mt: 1 }}>
                          Rating: {service.rating}/5
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button size="small" color="primary">
                          View Details
                        </Button>
                        <Button size="small" variant="contained" color="primary">
                          Request Service
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h5" gutterBottom>
                Your Service Requests
              </Typography>
              <Typography variant="body1">
                You haven't made any service requests yet. Browse available services above to get started.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default CustomerDashboard; 