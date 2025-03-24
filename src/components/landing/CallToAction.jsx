import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Paper,
  styled,
  useTheme,
  alpha,
  useMediaQuery
} from '@mui/material';
import {
  ArrowForward,
  PersonAdd,
  WorkOutline,
  Star
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';

const CTAContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(10, 0),
  position: 'relative',
  overflow: 'hidden',
  backgroundColor: 'transparent',
  zIndex: 1,
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
    zIndex: -2,
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: 'url("data:image/svg+xml,%3Csvg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z" fill="%23ffffff" fill-opacity="0.05" fill-rule="evenodd"/%3E%3C/svg%3E")',
    zIndex: -1,
  },
}));

const ContentWrapper = styled(Container)(({ theme }) => ({
  position: 'relative',
  zIndex: 1,
}));

const CTATitle = styled(Typography)(({ theme }) => ({
  fontWeight: 800,
  color: 'white',
  textAlign: 'center',
  marginBottom: theme.spacing(2),
  position: 'relative',
  display: 'inline-block',
  '&::after': {
    content: '""',
    position: 'absolute',
    width: '100px',
    height: '4px',
    bottom: '-10px',
    left: '50%',
    transform: 'translateX(-50%)',
    background: theme.palette.secondary.main,
    borderRadius: '2px',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '2rem',
  },
}));

const CTADescription = styled(Typography)(({ theme }) => ({
  fontSize: '1.25rem',
  color: 'rgba(255, 255, 255, 0.85)',
  textAlign: 'center',
  marginBottom: theme.spacing(5),
  maxWidth: '800px',
  margin: '0 auto',
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.1rem',
  },
}));

const CTAButton = styled(Button)(({ theme, buttonType }) => ({
  borderRadius: '50px',
  padding: theme.spacing(1.5, 4),
  fontSize: '1.1rem',
  fontWeight: 600,
  margin: theme.spacing(1, 1),
  boxShadow: buttonType === 'primary' 
    ? '0 8px 20px rgba(255, 107, 107, 0.3)' 
    : 'none',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-3px)',
    boxShadow: buttonType === 'primary' 
      ? '0 12px 25px rgba(255, 107, 107, 0.4)' 
      : '0 8px 15px rgba(255, 255, 255, 0.15)',
  },
}));

const FeatureCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3.5),
  borderRadius: theme.spacing(2),
  backgroundColor: 'rgba(255, 255, 255, 0.05)', 
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  transition: 'all 0.3s ease',
  height: '100%',
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
  }
}));

const FeatureIconWrapper = styled(Box)(({ theme }) => ({
  backgroundColor: alpha(theme.palette.secondary.main, 0.2),
  width: 80,
  height: 80,
  borderRadius: '20px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: theme.spacing(2.5),
  boxShadow: '0 8px 20px rgba(255, 107, 107, 0.2)',
  transition: 'all 0.3s ease',
  '& svg': {
    fontSize: 36,
    color: theme.palette.secondary.main,
  },
  '&:hover': {
    transform: 'scale(1.05) rotate(5deg)',
    backgroundColor: theme.palette.secondary.main,
    '& svg': {
      color: 'white',
    }
  }
}));

const FloatingElement = styled(Box)(({ theme, position, animation }) => ({
  position: 'absolute',
  zIndex: 0,
  opacity: 0.1,
  ...position,
  animation: animation || 'pulse 3s infinite ease-in-out',
  '@keyframes pulse': {
    '0%': { transform: 'scale(1)' },
    '50%': { transform: 'scale(1.05)' },
    '100%': { transform: 'scale(1)' },
  },
  '@keyframes float': {
    '0%': { transform: 'translateY(0px)' },
    '50%': { transform: 'translateY(-20px)' },
    '100%': { transform: 'translateY(0px)' },
  },
}));

const StatsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  marginTop: theme.spacing(5),
  marginBottom: theme.spacing(5),
  flexWrap: 'wrap',
}));

const StatItem = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(2),
  margin: theme.spacing(0, 2),
}));

const StatNumber = styled(Typography)(({ theme }) => ({
  fontSize: '2.5rem',
  fontWeight: 800,
  color: 'white',
  marginBottom: theme.spacing(0.5),
  display: 'block',
}));

const StatTitle = styled(Typography)(({ theme }) => ({
  color: 'rgba(255, 255, 255, 0.7)',
  fontWeight: 500,
}));

const ButtonContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  flexWrap: 'wrap',
  marginTop: theme.spacing(5),
}));

const CallToAction = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <CTAContainer id="cta">
      <FloatingElement 
        position={{ top: '10%', left: '5%' }}
        sx={{ 
          width: '300px', 
          height: '300px', 
          borderRadius: '50%',
          backgroundColor: 'white',
          animation: 'pulse 6s infinite ease-in-out',
        }} 
      />
      <FloatingElement 
        position={{ bottom: '5%', right: '8%' }}
        sx={{ 
          width: '200px', 
          height: '200px', 
          borderRadius: '50%',
          backgroundColor: theme.palette.secondary.main,
          animation: 'float 7s infinite ease-in-out',
        }} 
      />
      
      <ContentWrapper maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <CTATitle variant="h3" gutterBottom>
            Join Our Growing Community Today
          </CTATitle>
          <CTADescription variant="h6">
            Whether you're looking to offer your services or find reliable help, House Warrior
            connects you with opportunities that fit your lifestyle and needs.
          </CTADescription>
        </Box>
        
        <StatsContainer>
          <StatItem>
            <StatNumber variant="h3">5,000+</StatNumber>
            <StatTitle variant="subtitle1">Active Users</StatTitle>
          </StatItem>
          <StatItem>
            <StatNumber variant="h3">1,200+</StatNumber>
            <StatTitle variant="subtitle1">Service Providers</StatTitle>
          </StatItem>
          <StatItem>
            <StatNumber variant="h3">15K+</StatNumber>
            <StatTitle variant="subtitle1">Services Completed</StatTitle>
          </StatItem>
        </StatsContainer>
        
        <Grid container spacing={4} justifyContent="center" sx={{ mb: 6 }}>
          <Grid item xs={12} sm={6} md={4}>
            <FeatureCard elevation={0}>
              <FeatureIconWrapper>
                <PersonAdd />
              </FeatureIconWrapper>
              <Typography variant="h6" gutterBottom sx={{ color: 'white', fontWeight: 600 }}>
                Become a Provider
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 3, flexGrow: 1 }}>
                Showcase your skills, set your own schedule, and earn income while working from the comfort of your home.
              </Typography>
              <Button 
                component={RouterLink} 
                to="/register?role=provider" 
                endIcon={<ArrowForward />}
                color="secondary"
                sx={{ 
                  color: 'white',
                  backgroundColor: alpha(theme.palette.secondary.main, 0.9),
                  padding: '8px 16px',
                  '&:hover': { 
                    backgroundColor: theme.palette.secondary.main,
                    transform: 'translateY(-3px)'
                  }
                }}
              >
                Sign up as provider
              </Button>
            </FeatureCard>
          </Grid>
          
          <Grid item xs={12} sm={6} md={4}>
            <FeatureCard elevation={0}>
              <FeatureIconWrapper>
                <WorkOutline />
              </FeatureIconWrapper>
              <Typography variant="h6" gutterBottom sx={{ color: 'white', fontWeight: 600 }}>
                Find Services
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 3, flexGrow: 1 }}>
                Discover a wide range of high-quality services provided by skilled housewives in your community.
              </Typography>
              <Button 
                component={RouterLink} 
                to="/register?role=customer" 
                endIcon={<ArrowForward />}
                color="secondary"
                sx={{ 
                  color: 'white',
                  backgroundColor: alpha(theme.palette.secondary.main, 0.9),
                  padding: '8px 16px',
                  '&:hover': { 
                    backgroundColor: theme.palette.secondary.main,
                    transform: 'translateY(-3px)'
                  }
                }}
              >
                Find services
              </Button>
            </FeatureCard>
          </Grid>
          
          <Grid item xs={12} sm={6} md={4}>
            <FeatureCard elevation={0}>
              <FeatureIconWrapper>
                <Star />
              </FeatureIconWrapper>
              <Typography variant="h6" gutterBottom sx={{ color: 'white', fontWeight: 600 }}>
                Rate & Review
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 3, flexGrow: 1 }}>
                Share your experiences and help others find the best service providers in your area.
              </Typography>
              <Button 
                component={RouterLink} 
                to="/login" 
                endIcon={<ArrowForward />}
                color="secondary"
                sx={{ 
                  color: 'white',
                  backgroundColor: alpha(theme.palette.secondary.main, 0.9),
                  padding: '8px 16px',
                  '&:hover': { 
                    backgroundColor: theme.palette.secondary.main,
                    transform: 'translateY(-3px)'
                  }
                }}
              >
                Start reviewing
              </Button>
            </FeatureCard>
          </Grid>
        </Grid>
        
        <ButtonContainer>
          <CTAButton 
            variant="contained" 
            color="secondary" 
            buttonType="primary"
            component={RouterLink}
            to="/register"
            endIcon={<ArrowForward />}
          >
            Join Now
          </CTAButton>
          <CTAButton 
            variant="outlined"
            sx={{ color: 'white', borderColor: 'rgba(255, 255, 255, 0.5)' }}
            component={RouterLink}
            to="/login"
          >
            Sign In
          </CTAButton>
        </ButtonContainer>
      </ContentWrapper>
    </CTAContainer>
  );
};

export default CallToAction; 