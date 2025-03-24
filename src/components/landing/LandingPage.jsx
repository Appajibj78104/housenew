import React from 'react';
import { Box, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import Navbar from './Navbar';
import HeroSection from './HeroSection';
import FeaturedServices from './FeaturedServices';
import HowItWorks from './HowItWorks';
import Testimonials from './Testimonials';
import CallToAction from './CallToAction';
import Footer from './Footer';

// Create a custom theme with enhanced UI/UX
const theme = createTheme({
  palette: {
    primary: {
      main: '#4E5DE3', // Modern indigo blue
      light: '#7A85FF',
      dark: '#3545C4',
      contrastText: '#fff',
    },
    secondary: {
      main: '#FF6B6B', // Warm coral
      light: '#FF9797',
      dark: '#E54F4F',
      contrastText: '#fff',
    },
    background: {
      default: '#F8FAFF', // Light cool blue-tinted white
      paper: '#FFFFFF',
    },
    text: {
      primary: '#1F2A48', // Deep navy blue
      secondary: '#4E5D78',
    },
    success: {
      main: '#2CC672',
      light: '#61DE9A',
      dark: '#20A05B',
    },
    error: {
      main: '#F5585D',
      light: '#FF8A8E',
      dark: '#E13A40',
    },
    info: {
      main: '#0CBBF3',
      light: '#5DD4FF',
      dark: '#0999C8',
    },
    warning: {
      main: '#FFB946',
      light: '#FFD07F',
      dark: '#E5A53E',
    },
    grey: {
      50: '#F9FAFB',
      100: '#F3F4F6',
      200: '#E5E7EB',
      300: '#D2D6DB',
      400: '#9CA3AF',
      500: '#6D7580',
      600: '#4B5563',
      700: '#374151',
      800: '#1F2937',
      900: '#111827',
    }
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 800,
      fontSize: '3.5rem',
      lineHeight: 1.2,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontWeight: 700,
      fontSize: '2.5rem',
      lineHeight: 1.3,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontWeight: 700,
      fontSize: '2rem',
      lineHeight: 1.3,
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.5rem',
      lineHeight: 1.3,
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.25rem',
      lineHeight: 1.4,
    },
    h6: {
      fontWeight: 600,
      fontSize: '1rem',
      lineHeight: 1.4,
    },
    subtitle1: {
      fontSize: '1.125rem',
      lineHeight: 1.5,
      letterSpacing: '0.005em',
    },
    subtitle2: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
      letterSpacing: '0.005em',
      fontWeight: 500,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.6,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
      fontSize: '0.9375rem',
    },
  },
  shape: {
    borderRadius: 12,
  },
  shadows: [
    'none',
    '0px 1px 3px rgba(0, 0, 0, 0.05)',
    '0px 2px 6px rgba(0, 0, 0, 0.05)',
    '0px 4px 12px rgba(0, 0, 0, 0.08)',
    '0px 6px 18px rgba(0, 0, 0, 0.08)',
    '0px 8px 25px rgba(0, 0, 0, 0.1)',
    '0px 10px 30px rgba(0, 0, 0, 0.1)',
    // ... more shadows as per Material UI defaults
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          padding: '10px 24px',
          boxShadow: 'none',
          transition: 'all 0.25s ease-in-out',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.1)',
          },
        },
        contained: {
          '&:hover': {
            boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.15)',
          },
        },
        containedPrimary: {
          backgroundImage: 'linear-gradient(135deg, #4E5DE3 0%, #3545C4 100%)',
          '&:hover': {
            backgroundImage: 'linear-gradient(135deg, #5D6BF0 0%, #4150D9 100%)',
          },
        },
        containedSecondary: {
          backgroundImage: 'linear-gradient(135deg, #FF6B6B 0%, #E54F4F 100%)',
          '&:hover': {
            backgroundImage: 'linear-gradient(135deg, #FF7E7E 0%, #F05A5A 100%)',
          },
        },
        outlined: {
          borderWidth: '2px',
          '&:hover': {
            borderWidth: '2px',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0px 5px 20px rgba(0, 0, 0, 0.05)',
          borderRadius: '16px',
          transition: 'all 0.3s ease',
          '&:hover': {
            boxShadow: '0px 12px 25px rgba(0, 0, 0, 0.09)',
            transform: 'translateY(-5px)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        rounded: {
          borderRadius: '16px',
        },
        elevation1: {
          boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.05)',
        },
        elevation2: {
          boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.08)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '12px',
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderWidth: '2px',
              borderColor: '#4E5DE3',
            },
          },
          '& .MuiFormLabel-root.Mui-focused': {
            color: '#4E5DE3',
          },
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          paddingLeft: 24,
          paddingRight: 24,
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          textDecoration: 'none',
          transition: 'color 0.2s ease',
          color: '#4E5DE3',
          '&:hover': {
            textDecoration: 'none',
            color: '#3545C4',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          fontWeight: 500,
        },
        filled: {
          backgroundColor: '#F3F4FF',
          color: '#4E5DE3',
          '&:hover': {
            backgroundColor: '#E7E9FF',
          },
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          border: '2px solid #fff',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.08)',
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          textTransform: 'none',
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          fontSize: '0.95rem',
        },
      },
    },
  },
});

const LandingPage = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box 
        component="main"
        sx={{ 
          backgroundColor: 'background.default', 
          minHeight: '100vh',
          overflowX: 'hidden' // Prevent horizontal scrolling
        }}
      >
        <Navbar />
        <Box id="home">
          <HeroSection />
        </Box>
        <FeaturedServices />
        <HowItWorks />
        <Testimonials />
        <CallToAction />
        <Footer />
      </Box>
    </ThemeProvider>
  );
};

export default LandingPage; 