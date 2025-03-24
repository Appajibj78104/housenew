import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Button, 
  Grid, 
  styled,
  useTheme,
  useMediaQuery 
} from '@mui/material';
import { 
  ArrowForward, 
  Star, 
  Security, 
  Diversity3
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';

// Styled components with enhanced visual appeal
const HeroContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  minHeight: '90vh',
  display: 'flex',
  alignItems: 'center',
  backgroundImage: 'linear-gradient(135deg, #3545C4 0%, #4E5DE3 50%, #5D6BF0 100%)',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: 'url("https://images.unsplash.com/photo-1615873968403-89e068629265?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    opacity: 0.1,
    zIndex: 0,
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'radial-gradient(circle at 50% 30%, rgba(94, 114, 235, 0.8) 0%, rgba(94, 114, 235, 0) 70%)',
    zIndex: 0,
  }
}));

const ContentWrapper = styled(Container)(({ theme }) => ({
  position: 'relative',
  zIndex: 1,
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.down('md')]: {
    paddingTop: theme.spacing(12),
  },
}));

const HeroTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 800,
  color: 'white',
  marginBottom: theme.spacing(2),
  letterSpacing: '-0.02em',
  position: 'relative',
  display: 'inline-block',
  textAlign: 'center',
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
    fontSize: '2.5rem',
  },
}));

const HeroSubtitle = styled(Typography)(({ theme }) => ({
  fontSize: '1.25rem',
  color: 'rgba(255, 255, 255, 0.85)',
  marginBottom: theme.spacing(4),
  maxWidth: '800px',
  lineHeight: 1.6,
  textAlign: 'center',
  margin: '0 auto',
}));

const HeroButton = styled(Button)(({ theme, buttonType }) => ({
  padding: theme.spacing(1.5, 3.5),
  borderRadius: '50px',
  fontSize: '1.1rem',
  fontWeight: 600,
  margin: theme.spacing(0, 1, 2),
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

const FeaturesContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginTop: theme.spacing(5),
  [theme.breakpoints.up('md')]: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
}));

const FeatureBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(2),
  color: 'white',
  [theme.breakpoints.up('md')]: {
    margin: theme.spacing(0, 2, 2),
    width: 'auto',
  },
}));

const FeatureIcon = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '40px',
  height: '40px',
  borderRadius: '50%',
  backgroundColor: 'rgba(255, 255, 255, 0.15)',
  marginRight: theme.spacing(2),
  '& svg': {
    fontSize: '1.25rem',
    color: 'white',
  },
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    transform: 'scale(1.05)',
  }
}));

const FloatingShape = styled(Box)(({ theme, position, delay, size, rotation }) => ({
  position: 'absolute',
  width: size || '100px',
  height: size || '100px',
  borderRadius: '50%',
  background: 'rgba(255, 255, 255, 0.1)',
  zIndex: 0,
  animation: `float 6s ease-in-out infinite ${delay || '0s'}`,
  top: position === 'top' ? '10%' : position === 'middle' ? '50%' : '80%',
  left: position === 'left' ? '5%' : position === 'right' ? '80%' : '40%',
  transform: rotation ? `rotate(${rotation}deg)` : 'none',
  '@keyframes float': {
    '0%': {
      transform: rotation ? `translateY(0px) rotate(${rotation}deg)` : 'translateY(0px)',
    },
    '50%': {
      transform: rotation ? `translateY(-20px) rotate(${rotation}deg)` : 'translateY(-20px)',
    },
    '100%': {
      transform: rotation ? `translateY(0px) rotate(${rotation}deg)` : 'translateY(0px)',
    },
  },
}));

const StatBox = styled(Box)(({ theme }) => ({
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(8px)',
  borderRadius: '16px',
  padding: theme.spacing(2.5),
  marginTop: theme.spacing(5),
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  maxWidth: '800px',
  margin: '0 auto',
  border: '1px solid rgba(255, 255, 255, 0.15)',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    transform: 'translateY(-5px)',
  }
}));

const StatItem = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(1),
  flex: '1 1 auto',
  minWidth: '120px',
  margin: theme.spacing(0, 2),
}));

const StatNumber = styled(Typography)(({ theme }) => ({
  fontSize: '2.2rem',
  fontWeight: 700,
  color: 'white',
  marginBottom: theme.spacing(0.5),
}));

const StatLabel = styled(Typography)(({ theme }) => ({
  fontSize: '0.875rem',
  color: 'rgba(255, 255, 255, 0.7)',
}));

const ButtonContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  flexWrap: 'wrap',
  marginTop: theme.spacing(2),
}));

const HeroSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <HeroContainer>
      <FloatingShape position="top" size="150px" />
      <FloatingShape position="middle" size="80px" delay="1s" rotation="45" />
      <FloatingShape position="bottom" position2="right" size="120px" delay="2s" />
      <FloatingShape position="top" position2="right" size="100px" delay="3s" rotation="-15" />
      
      <ContentWrapper maxWidth="xl">
        <Box sx={{ textAlign: 'center' }}>
          <HeroTitle variant="h1" gutterBottom>
            Empower Housewives, Enrich Communities
          </HeroTitle>
          <HeroSubtitle variant="h6">
            Connect with skilled housewives offering quality services or showcase your talents
            to earn income while managing your home.
          </HeroSubtitle>
          
          <ButtonContainer>
            <HeroButton 
              variant="contained" 
              color="secondary" 
              buttonType="primary"
              component={RouterLink}
              to="/register?role=provider"
              endIcon={<ArrowForward />}
            >
              Offer Services
            </HeroButton>
            <HeroButton 
              variant="outlined" 
              sx={{ 
                color: 'white', 
                borderColor: 'rgba(255,255,255,0.5)' 
              }}
              component={RouterLink}
              to="/register?role=customer"
            >
              Find Services
            </HeroButton>
          </ButtonContainer>
          
          <FeaturesContainer>
            <FeatureBox>
              <FeatureIcon>
                <Star />
              </FeatureIcon>
              <Typography variant="body1">High-quality, personalized home services</Typography>
            </FeatureBox>
            <FeatureBox>
              <FeatureIcon>
                <Security />
              </FeatureIcon>
              <Typography variant="body1">Secure, trusted platform with verified providers</Typography>
            </FeatureBox>
            <FeatureBox>
              <FeatureIcon>
                <Diversity3 />
              </FeatureIcon>
              <Typography variant="body1">Support local housewives in your community</Typography>
            </FeatureBox>
          </FeaturesContainer>
          
          <StatBox>
            <StatItem>
              <StatNumber variant="h3">1200+</StatNumber>
              <StatLabel variant="body2">Service Providers</StatLabel>
            </StatItem>
            <StatItem>
              <StatNumber variant="h3">15k+</StatNumber>
              <StatLabel variant="body2">Happy Customers</StatLabel>
            </StatItem>
            <StatItem>
              <StatNumber variant="h3">4.8</StatNumber>
              <StatLabel variant="body2">Average Rating</StatLabel>
            </StatItem>
          </StatBox>
        </Box>
      </ContentWrapper>
    </HeroContainer>
  );
};

export default HeroSection; 