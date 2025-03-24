import React, { useState, useEffect } from 'react';
import {
  Container, 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Paper, 
  Link, 
  InputAdornment, 
  IconButton,
  Alert,
  Divider,
  useTheme,
  alpha,
  styled,
  CircularProgress
} from '@mui/material';
import { Visibility, VisibilityOff, Email, Lock, Login as LoginIcon } from '@mui/icons-material';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import env from '../../config/environment';

// Styled components with enhanced design
const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(5),
  borderRadius: '20px',
  boxShadow: '0 10px 50px rgba(0, 0, 0, 0.08)',
  maxWidth: '450px',
  width: '100%',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '6px',
    background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  },
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 16px 70px rgba(0, 0, 0, 0.1)',
  },
}));

const FormField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  '& .MuiOutlinedInput-root': {
    borderRadius: '12px',
    transition: 'all 0.3s ease',
    '&.Mui-focused': {
      boxShadow: `0 0 0 2px ${alpha(theme.palette.primary.main, 0.2)}`,
    },
    '&:hover': {
      borderColor: theme.palette.primary.main,
    },
  },
  '& .MuiInputLabel-root': {
    fontWeight: 500,
  },
  '& .MuiInputAdornment-root .MuiSvgIcon-root': {
    color: theme.palette.primary.main,
    transition: 'transform 0.2s ease',
  },
  '&:hover .MuiInputAdornment-root .MuiSvgIcon-root': {
    transform: 'scale(1.1)',
  },
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1.5),
  borderRadius: '12px',
  fontSize: '1rem',
  fontWeight: 700,
  marginTop: theme.spacing(2),
  boxShadow: '0 8px 20px rgba(78, 93, 227, 0.2)',
  transition: 'all 0.3s ease',
  position: 'relative',
  overflow: 'hidden',
  '&::after': {
    content: '""',
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    background: 'linear-gradient(rgba(255,255,255,0.1), rgba(255,255,255,0))',
    opacity: 0,
    transition: 'opacity 0.3s ease',
  },
  '&:hover': {
    transform: 'translateY(-3px)',
    boxShadow: '0 12px 25px rgba(78, 93, 227, 0.25)',
    '&::after': {
      opacity: 1,
    },
  },
}));

const RegisterLink = styled(Link)(({ theme }) => ({
  fontWeight: 600,
  textDecoration: 'none',
  position: 'relative',
  transition: 'all 0.3s ease',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: -2,
    left: 0,
    width: 0,
    height: '2px',
    backgroundColor: theme.palette.primary.main,
    transition: 'width 0.3s ease',
  },
  '&:hover': {
    textDecoration: 'none',
    '&::after': {
      width: '100%',
    },
  },
}));

const FormTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 800,
  marginBottom: theme.spacing(4),
  textAlign: 'center',
  position: 'relative',
  display: 'inline-block',
  color: theme.palette.text.primary,
  '&::after': {
    content: '""',
    position: 'absolute',
    width: '80px',
    height: '4px',
    bottom: '-10px',
    left: '50%',
    transform: 'translateX(-50%)',
    background: theme.palette.primary.main,
    borderRadius: '2px',
  },
  animation: 'fadeIn 0.8s ease-in-out',
  '@keyframes fadeIn': {
    '0%': {
      opacity: 0,
      transform: 'translateY(-10px)',
    },
    '100%': {
      opacity: 1,
      transform: 'translateY(0)',
    },
  },
}));

const StyledDivider = styled(Divider)(({ theme }) => ({
  margin: theme.spacing(4, 0),
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '50%',
    left: 0,
    right: 0,
    height: '1px',
    backgroundColor: alpha(theme.palette.divider, 0.7),
  },
  '& .MuiDivider-wrapper': {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(0, 2),
    borderRadius: '4px',
  },
}));

const ForgotPasswordLink = styled(Link)(({ theme }) => ({
  fontWeight: 500,
  textDecoration: 'none',
  transition: 'all 0.2s ease',
  color: theme.palette.primary.main,
  '&:hover': {
    color: theme.palette.primary.dark,
    textDecoration: 'none',
  },
}));

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();

  // Check for registration success message in URL params
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const success = params.get('registered');
    const role = params.get('role');
    
    if (success === 'true' && role) {
      // Show a success message if redirected from registration
      setError('');
    }
  }, [location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Input validation
    if (!email || !password) {
      setError('Please fill in all fields');
      setIsLoading(false);
      return;
    }

    try {
      const success = await login(email, password);
      if (success) {
        navigate('/dashboard');
      } else {
        setError('Login failed. Please check your credentials.');
      }
    } catch (err) {
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ 
        minHeight: '100vh', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center',
        py: 5,
        background: `radial-gradient(circle at 80% 20%, ${alpha(theme.palette.primary.light, 0.05)} 0%, transparent 60%)`,
      }}>
        <Typography 
          variant="h3" 
          component="h1" 
          sx={{ 
            mb: 3, 
            fontWeight: 800, 
            textAlign: 'center',
            background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            animation: 'fadeIn 0.6s ease-out',
            '@keyframes fadeIn': {
              '0%': {
                opacity: 0,
                transform: 'translateY(-20px)',
              },
              '100%': {
                opacity: 1,
                transform: 'translateY(0)',
              },
            },
          }}
        >
          {env.appName}
        </Typography>
        
        <StyledPaper elevation={0}>
          <FormTitle variant="h5">
            Welcome Back
          </FormTitle>
          
          <Box component="form" onSubmit={handleSubmit} noValidate>
            {location.search.includes('registered=true') && (
              <Alert 
                severity="success" 
                sx={{ 
                  mb: 3, 
                  borderRadius: '12px',
                  animation: 'slideDown 0.5s ease-out',
                  '@keyframes slideDown': {
                    '0%': {
                      opacity: 0,
                      transform: 'translateY(-20px)',
                    },
                    '100%': {
                      opacity: 1,
                      transform: 'translateY(0)',
                    },
                  },
                }}
              >
                Registration successful! Please login with your credentials.
              </Alert>
            )}
            
            {error && (
              <Alert 
                severity="error" 
                sx={{ 
                  mb: 3, 
                  borderRadius: '12px',
                  border: '1px solid',
                  borderColor: 'error.light' 
                }} 
                onClose={() => setError('')}
              >
                {error}
              </Alert>
            )}
            
            <FormField
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email />
                  </InputAdornment>
                ),
              }}
            />
            
            <FormField
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      sx={{ color: theme.palette.text.secondary }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 1 }}>
              <ForgotPasswordLink 
                component={RouterLink} 
                to="/forgot-password" 
                variant="body2" 
              >
                Forgot password?
              </ForgotPasswordLink>
            </Box>
            
            <SubmitButton
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              size="large"
              disabled={isLoading}
              startIcon={isLoading ? null : <LoginIcon />}
            >
              {isLoading ? (
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <CircularProgress size={24} sx={{ color: 'white', mr: 1 }} />
                  Signing in...
                </Box>
              ) : (
                'Sign In'
              )}
            </SubmitButton>
            
            <StyledDivider>
              <Typography variant="body2" color="text.secondary">
                OR
              </Typography>
            </StyledDivider>
            
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="body1" sx={{ mb: 2, color: theme.palette.text.secondary }}>
                Don't have an account?
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                <RegisterLink
                  component={RouterLink}
                  to="/register?role=customer"
                  color="primary"
                  variant="subtitle1"
                >
                  Register as Customer
                </RegisterLink>
                <Typography sx={{ color: theme.palette.text.secondary }}>|</Typography>
                <RegisterLink
                  component={RouterLink}
                  to="/register?role=provider"
                  color="secondary"
                  variant="subtitle1"
                >
                  Register as Provider
                </RegisterLink>
              </Box>
            </Box>
          </Box>
        </StyledPaper>
      </Box>
    </Container>
  );
};

export default Login; 