import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Paper, 
  useTheme,
  alpha,
  styled 
} from '@mui/material';
import {
  HowToReg as RegisterIcon,
  Search as SearchIcon,
  VerifiedUser as VerifiedUserIcon,
  RateReview as RateReviewIcon
} from '@mui/icons-material';

// Styled components for enhanced UI
const SectionContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(10, 0),
  backgroundColor: alpha(theme.palette.primary.main, 0.04),
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '5%',
    left: '-10%',
    width: '500px',
    height: '500px',
    borderRadius: '50%',
    background: `radial-gradient(circle, ${alpha(theme.palette.primary.light, 0.2)} 0%, ${alpha(theme.palette.primary.light, 0)} 70%)`,
    zIndex: 0,
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: '-10%',
    right: '-10%',
    width: '600px',
    height: '600px',
    borderRadius: '50%',
    background: `radial-gradient(circle, ${alpha(theme.palette.primary.light, 0.15)} 0%, ${alpha(theme.palette.primary.light, 0)} 70%)`,
    zIndex: 0,
  }
}));

const ContentContainer = styled(Container)(({ theme }) => ({
  position: 'relative',
  zIndex: 1,
}));

const SectionHeading = styled(Typography)(({ theme }) => ({
  fontWeight: 800,
  marginBottom: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.primary,
}));

const SectionSubheading = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(6),
  textAlign: 'center',
  maxWidth: '700px',
  margin: '0 auto',
  color: theme.palette.text.secondary,
}));

const StepCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  borderRadius: '20px',
  transition: 'all 0.3s ease',
  boxShadow: '0 6px 20px rgba(0, 0, 0, 0.06)',
  position: 'relative',
  overflow: 'hidden',
  border: `1px solid ${alpha(theme.palette.primary.main, 0.08)}`,
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 12px 30px rgba(0, 0, 0, 0.1)',
    '& .step-icon-wrapper': {
      transform: 'scale(1.1)',
      backgroundColor: theme.palette.primary.main,
      '& .MuiSvgIcon-root': {
        color: 'white',
      },
    },
  },
}));

const StepNumber = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '10px',
  left: '10px',
  width: '30px',
  height: '30px',
  borderRadius: '50%',
  backgroundColor: alpha(theme.palette.primary.main, 0.1),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontWeight: 700,
  fontSize: '14px',
  color: theme.palette.primary.main,
}));

const StepIconWrapper = styled(Box)(({ theme }) => ({
  width: '90px',
  height: '90px',
  borderRadius: '20px',
  backgroundColor: alpha(theme.palette.primary.main, 0.1),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: theme.spacing(3),
  transition: 'all 0.3s ease',
  '& .MuiSvgIcon-root': {
    fontSize: '40px',
    color: theme.palette.primary.main,
    transition: 'all 0.3s ease',
  },
}));

const StepTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  marginBottom: theme.spacing(1.5),
  color: theme.palette.text.primary,
}));

const StepDescription = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
}));

const BackgroundShape = styled(Box)(({ theme, position, size, rotation }) => ({
  position: 'absolute',
  width: size || '80px',
  height: size || '80px',
  borderRadius: '20px',
  backgroundColor: alpha(theme.palette.primary.main, 0.04),
  top: position === 'top' ? '10%' : position === 'middle' ? '50%' : '80%',
  left: position === 'left' ? '5%' : position === 'right' ? '80%' : '45%',
  transform: `rotate(${rotation || 0}deg)`,
  zIndex: 0,
}));

const ConnectorLine = styled(Box)(({ theme, vertical }) => ({
  position: 'absolute',
  ...(vertical ? {
    width: '3px',
    height: '80px',
    top: 'calc(100% + 10px)',
    left: '50%',
    transform: 'translateX(-50%)',
  } : {
    height: '3px',
    width: '80px',
    top: '50%',
    left: 'calc(100% + 20px)',
    transform: 'translateY(-50%)',
  }),
  background: `linear-gradient(to ${vertical ? 'bottom' : 'right'}, transparent, ${theme.palette.primary.main}, transparent)`,
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
}));

const HowItWorks = () => {
  const theme = useTheme();
  
  // Process steps data
  const steps = [
    {
      number: 1,
      title: 'Register',
      description: 'Create your account as a housewife or customer in a few simple steps.',
      icon: <RegisterIcon />,
    },
    {
      number: 2,
      title: 'Discover Services',
      description: 'Browse categories to find or showcase services that match your needs and skills.',
      icon: <SearchIcon />,
    },
    {
      number: 3,
      title: 'Book & Experience',
      description: 'Select and book services securely, then enjoy professional home-based service.',
      icon: <VerifiedUserIcon />,
    },
    {
      number: 4,
      title: 'Share Feedback',
      description: 'Rate your experience and help others find quality services in your community.',
      icon: <RateReviewIcon />,
    },
  ];

  return (
    <SectionContainer id="how-it-works">
      <BackgroundShape position="top" position2="left" size="120px" rotation="15" />
      <BackgroundShape position="middle" position2="right" size="150px" rotation="-10" />
      <BackgroundShape position="bottom" position2="left" size="100px" rotation="45" />
      
      <ContentContainer maxWidth="xl">
        <Box sx={{ mb: 8 }}>
          <SectionHeading variant="h2">
            How It Works
          </SectionHeading>
          <SectionSubheading variant="subtitle1">
            Our platform makes it easy to connect housewives with customers in just a few simple steps
          </SectionSubheading>
        </Box>

        <Grid container spacing={4} justifyContent="center">
          {steps.map((step, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Box sx={{ position: 'relative' }}>
                <StepCard elevation={0}>
                  <StepNumber>{step.number}</StepNumber>
                  <StepIconWrapper className="step-icon-wrapper">
                    {step.icon}
                  </StepIconWrapper>
                  <StepTitle variant="h5">
                    {step.title}
                  </StepTitle>
                  <StepDescription variant="body2">
                    {step.description}
                  </StepDescription>
                </StepCard>
                
                {index < steps.length - 1 && (
                  <ConnectorLine vertical={theme.breakpoints.down('md')} />
                )}
              </Box>
            </Grid>
          ))}
        </Grid>
      </ContentContainer>
    </SectionContainer>
  );
};

export default HowItWorks; 