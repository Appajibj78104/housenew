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
  Stepper,
  Step,
  StepLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  FormLabel as MuiFormLabel,
  alpha,
  Select,
  MenuItem,
  Chip,
  InputLabel,
  useTheme,
  useMediaQuery,
  styled
} from '@mui/material';
import { 
  Visibility, 
  VisibilityOff, 
  Email, 
  Lock, 
  Person, 
  Phone, 
  LocationOn,
  ArrowForward,
  Home,
  Description,
  Category
} from '@mui/icons-material';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
// Import environment variables
import env from '../../config/environment';
// Import the success popup
import SuccessPopup from '../common/SuccessPopup';

// Service categories for housewife registration
const serviceCategories = [
  'Culinary',
  'Cleaning & Housekeeping',
  'Tutoring', 
  'Arts & Crafts',
  'Beauty & Personal Care',
  'Health & Wellness',
  'Childcare & Elderly Support',
  'Home Management & Organization',
  'Event Planning & Management',
  'Freelance & Administrative Services',
  'Gardening & Landscaping',
  'Pet Care',
  'Technology & Digital Services'
];

// Enhanced styled components
const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(5),
  borderRadius: '20px',
  boxShadow: '0 10px 50px rgba(0, 0, 0, 0.08)',
  maxWidth: '550px',
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
}));

const FormField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  '& .MuiOutlinedInput-root': {
    borderRadius: '12px',
    transition: 'all 0.3s ease',
    '&.Mui-focused': {
      boxShadow: `0 0 0 2px ${alpha(theme.palette.primary.main, 0.2)}`,
    },
  },
  '& .MuiInputLabel-root': {
    fontWeight: 500,
  },
  '& .MuiInputAdornment-root .MuiSvgIcon-root': {
    color: theme.palette.primary.main,
  },
}));

const ActionButton = styled(Button)(({ theme, isSecondary }) => ({
  padding: theme.spacing(1.5),
  borderRadius: '12px',
  fontSize: '1rem',
  fontWeight: 700,
  boxShadow: isSecondary ? 'none' : '0 8px 20px rgba(78, 93, 227, 0.2)',
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
    boxShadow: isSecondary ? '0 5px 15px rgba(0, 0, 0, 0.05)' : '0 12px 25px rgba(78, 93, 227, 0.25)',
    '&::after': {
      opacity: 1,
    },
  },
}));

const LoginLink = styled(Link)(({ theme }) => ({
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

const StyledStepper = styled(Stepper)(({ theme }) => ({
  margin: theme.spacing(0, 0, 5),
  '& .MuiStepLabel-label': {
    fontWeight: 500,
    fontSize: '0.95rem',
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.85rem',
    },
  },
  '& .MuiStepIcon-root': {
    width: '32px',
    height: '32px',
    transition: 'all 0.3s ease',
  },
  '& .MuiStepIcon-root.Mui-active': {
    color: theme.palette.primary.main,
    boxShadow: `0 0 0 4px ${alpha(theme.palette.primary.main, 0.2)}`,
    borderRadius: '50%',
  },
  '& .MuiStepIcon-root.Mui-completed': {
    color: theme.palette.success.main,
  },
  '& .MuiStepConnector-line': {
    borderColor: alpha(theme.palette.divider, 0.5),
    borderTopWidth: 3,
  },
}));

const StepTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  fontWeight: 700,
  color: theme.palette.text.primary,
  textAlign: 'center',
  position: 'relative',
  display: 'inline-block',
  '&::after': {
    content: '""',
    position: 'absolute',
    width: '60px',
    height: '4px',
    bottom: '-10px',
    left: '50%',
    transform: 'translateX(-50%)',
    background: theme.palette.primary.main,
    borderRadius: '2px',
  },
}));

const StepperButtonGroup = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: theme.spacing(4),
}));

const RoleSelect = styled(RadioGroup)(({ theme }) => ({
  marginTop: theme.spacing(3),
  marginBottom: theme.spacing(3),
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2.5),
}));

const RoleOption = styled(FormControlLabel)(({ theme, selected }) => ({
  margin: 0,
  padding: theme.spacing(2.5),
  border: `2px solid ${selected ? theme.palette.primary.main : alpha(theme.palette.divider, 0.8)}`,
  borderRadius: '16px',
  width: '100%',
  transition: 'all 0.3s ease',
  backgroundColor: selected ? alpha(theme.palette.primary.main, 0.05) : 'transparent',
  boxShadow: selected ? `0 5px 20px ${alpha(theme.palette.primary.main, 0.15)}` : 'none',
  '&:hover': {
    backgroundColor: selected ? alpha(theme.palette.primary.main, 0.1) : alpha(theme.palette.action.hover, 0.05),
    transform: 'translateY(-3px)',
    boxShadow: `0 8px 25px ${alpha(theme.palette.primary.main, selected ? 0.2 : 0.05)}`,
  },
  '& .MuiFormControlLabel-label': {
    width: '100%',
  },
  '& .MuiRadio-root': {
    color: selected ? theme.palette.primary.main : theme.palette.action.active,
  },
}));

const FormTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 800,
  marginBottom: theme.spacing(5),
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

const StyledFormLabel = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  marginBottom: theme.spacing(2),
  color: theme.palette.text.primary,
}));

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  '& .MuiOutlinedInput-root': {
    borderRadius: '12px',
    transition: 'all 0.3s ease',
    '&.Mui-focused': {
      boxShadow: `0 0 0 2px ${alpha(theme.palette.primary.main, 0.2)}`,
    },
  },
  '& .MuiInputLabel-root': {
    fontWeight: 500,
  },
}));

const CategoryChip = styled(Chip)(({ theme }) => ({
  margin: theme.spacing(0.5),
  borderRadius: '8px',
  fontWeight: 500,
  transition: 'all 0.2s ease',
  '&.MuiChip-outlined': {
    border: `1px solid ${alpha(theme.palette.divider, 0.8)}`,
  },
  '&.MuiChip-filled': {
    backgroundColor: alpha(theme.palette.primary.main, 0.1),
    color: theme.palette.primary.main,
    border: `1px solid ${alpha(theme.palette.primary.main, 0.3)}`,
  },
}));

const Register = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    role: 'customer',
    fullName: '',
    email: '',
    phone: '',
    address: '',
    password: '',
    confirmPassword: '',
    serviceCategories: [],
    bio: '',
    interests: '',
    description: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [successPopup, setSuccessPopup] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Check if role is provided in URL query params
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const roleParam = params.get('role');
    if (roleParam === 'provider' || roleParam === 'customer') {
      setFormData(prev => ({ ...prev, role: roleParam === 'provider' ? 'housewife' : 'customer' }));
    }
  }, [location]);

  const steps = ['Choose Role', 'Personal Info', 'Account Details', 'Service Information'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleNext = () => {
    // Validate current step
    if (activeStep === 0) {
      // Role step - no validation needed
      setActiveStep(1);
    } else if (activeStep === 1) {
      // Personal info step
      if (!formData.fullName || !formData.phone || !formData.address) {
        setError('Please fill in all required fields');
        return;
      }
      setActiveStep(2);
    } else if (activeStep === 2) {
      // Account details step
      if (!formData.email || !formData.password || !formData.confirmPassword) {
        setError('Please fill in all required fields');
        return;
      }
      if (!validateEmail(formData.email)) {
        setError('Please enter a valid email address');
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        return;
      }
      if (formData.password.length < 6) {
        setError('Password must be at least 6 characters long');
        return;
      }
      setActiveStep(3);
    } else if (activeStep === 3) {
      // Service info step - validation done in handleSubmit
      handleSubmit();
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
    setError('');
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = async () => {
    setError('');
    setIsSubmitting(true);

    // Final validation before submission
    if (formData.role === 'housewife' && formData.serviceCategories.length === 0) {
      setError('Please select at least one service category');
      setIsSubmitting(false);
      return;
    }

    if (formData.role === 'housewife' && !formData.bio) {
      setError('Please provide a brief description of your services');
      setIsSubmitting(false);
      return;
    }

    try {
      // Map form fields to backend expected field names
      const userData = {
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        contactNumber: formData.phone, // Map phone to contactNumber for backend
        address: formData.address,
        role: formData.role,
        ...(formData.role === 'housewife' ? {
          serviceCategories: formData.serviceCategories,
          bio: formData.bio
        } : {
          interests: formData.interests,
          description: formData.description
        })
      };

      const success = await register(userData);
      if (success) {
        // Show success popup instead of navigating directly
        setSuccessPopup(true);
      } else {
        setError('Registration failed. Please try again.');
      }
    } catch (err) {
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSuccessAction = () => {
    // Navigate to login page after success popup is closed
    navigate('/login');
  };

  const handleCategoryChange = (category) => {
    const currentCategories = [...formData.serviceCategories];
    if (currentCategories.includes(category)) {
      setFormData({
        ...formData,
        serviceCategories: currentCategories.filter(cat => cat !== category)
      });
    } else {
      setFormData({
        ...formData,
        serviceCategories: [...currentCategories, category]
      });
    }
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <StepTitle variant="h5">Choose your role</StepTitle>
            <FormControl component="fieldset" sx={{ width: '100%' }}>
              <MuiFormLabel component="legend" sx={{ mb: 1, fontWeight: 500, color: theme.palette.text.secondary }}>
                I want to register as:
              </MuiFormLabel>
              <RoleSelect
                aria-label="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
              >
                <RoleOption
                  value="housewife"
                  control={<Radio />}
                  label={
                    <Box>
                      <Typography variant="subtitle1" fontWeight={700} color="primary.main">
                        Service Provider (Housewife)
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                        Offer your services and skills to earn income while maintaining flexibility for your family
                      </Typography>
                    </Box>
                  }
                  selected={formData.role === 'housewife'}
                />
                <RoleOption
                  value="customer"
                  control={<Radio />}
                  label={
                    <Box>
                      <Typography variant="subtitle1" fontWeight={700} color="secondary.main">
                        Customer
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                        Discover and book high-quality services from talented housewives in your community
                      </Typography>
                    </Box>
                  }
                  selected={formData.role === 'customer'}
                />
              </RoleSelect>
            </FormControl>
          </Box>
        );
      case 1:
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <StepTitle variant="h5">Personal Information</StepTitle>
            <Box sx={{ width: '100%' }}>
              <FormField
                required
                fullWidth
                id="fullName"
                label="Full Name"
                name="fullName"
                autoComplete="name"
                value={formData.fullName}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person />
                    </InputAdornment>
                  ),
                }}
              />
              <FormField
                required
                fullWidth
                id="phone"
                label="Contact Number"
                name="phone"
                autoComplete="tel"
                value={formData.phone}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Phone />
                    </InputAdornment>
                  ),
                }}
              />
              <FormField
                required
                fullWidth
                id="address"
                label="Residential Address"
                name="address"
                autoComplete="street-address"
                value={formData.address}
                onChange={handleChange}
                multiline
                rows={2}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start" sx={{ alignSelf: 'flex-start', mt: 1.5 }}>
                      <Home />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
          </Box>
        );
      case 2:
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <StepTitle variant="h5">Create Account</StepTitle>
            <Box sx={{ width: '100%' }}>
              <FormField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
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
                autoComplete="new-password"
                value={formData.password}
                onChange={handleChange}
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
              <FormField
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type={showConfirmPassword ? 'text' : 'password'}
                id="confirmPassword"
                autoComplete="new-password"
                value={formData.confirmPassword}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        edge="end"
                        sx={{ color: theme.palette.text.secondary }}
                      >
                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Typography variant="body2" color="text.secondary" sx={{ mt: 2, fontSize: '0.85rem' }}>
                By registering, you agree to our Terms of Service and Privacy Policy
              </Typography>
            </Box>
          </Box>
        );
      case 3:
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <StepTitle variant="h5">
              {formData.role === 'housewife' ? 'Service Information' : 'Preferences'}
            </StepTitle>
            <Box sx={{ width: '100%' }}>
              {formData.role === 'housewife' && (
                <>
                  <StyledFormLabel>Service Categories</StyledFormLabel>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
                    {serviceCategories.map((category) => (
                      <Chip
                        key={category}
                        label={category}
                        onClick={() => handleCategoryChange(category)}
                        color={formData.serviceCategories.includes(category) ? 'primary' : 'default'}
                        variant={formData.serviceCategories.includes(category) ? 'filled' : 'outlined'}
                        sx={{ 
                          borderRadius: '8px', 
                          p: 0.5,
                          fontWeight: 500,
                          cursor: 'pointer',
                          '&:hover': {
                            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                          }
                        }}
                        icon={<Category fontSize="small" />}
                      />
                    ))}
                  </Box>
                  <FormField
                    required
                    fullWidth
                    name="bio"
                    label="Bio / Description of Services"
                    placeholder="Describe your skills, experience, and the services you offer..."
                    variant="outlined"
                    multiline
                    rows={4}
                    value={formData.bio}
                    onChange={handleChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start" sx={{ alignSelf: 'flex-start', mt: 1.5 }}>
                          <Description />
                        </InputAdornment>
                      ),
                    }}
                  />
                </>
              )}
              {formData.role === 'customer' && (
                <>
                  <FormField
                    fullWidth
                    name="interests"
                    label="Service Preferences/Interests (Optional)"
                    placeholder="What kind of services are you looking for? Any specific preferences?"
                    variant="outlined"
                    multiline
                    rows={3}
                    value={formData.interests}
                    onChange={handleChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start" sx={{ alignSelf: 'flex-start', mt: 1.5 }}>
                          <Category />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <FormField
                    fullWidth
                    name="description"
                    label="Brief Description/Note (Optional)"
                    placeholder="Any additional information you'd like to share..."
                    variant="outlined"
                    multiline
                    rows={3}
                    value={formData.description}
                    onChange={handleChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start" sx={{ alignSelf: 'flex-start', mt: 1.5 }}>
                          <Description />
                        </InputAdornment>
                      ),
                    }}
                  />
                </>
              )}
            </Box>
          </Box>
        );
      default:
        return null;
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
          }}
        >
          {env.appName}
        </Typography>
        
        <StyledPaper elevation={0}>
          <FormTitle variant="h5">
            Join Our Community
          </FormTitle>
          
          <StyledStepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </StyledStepper>
          
          <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {error && (
              <Alert 
                severity="error" 
                sx={{ 
                  mb: 3, 
                  width: '100%',
                  borderRadius: '12px',
                  border: '1px solid',
                  borderColor: 'error.light'
                }} 
                onClose={() => setError('')}
              >
                {error}
              </Alert>
            )}
            
            {renderStepContent(activeStep)}
            
            <StepperButtonGroup>
              <ActionButton
                disabled={activeStep === 0}
                onClick={handleBack}
                variant="outlined"
                isSecondary={true}
                sx={{ 
                  minWidth: '120px',
                  opacity: activeStep === 0 ? 0.5 : 1
                }}
              >
                Back
              </ActionButton>
              <ActionButton
                variant="contained"
                color="primary"
                onClick={handleNext}
                disabled={isSubmitting}
                endIcon={activeStep === steps.length - 1 ? <ArrowForward /> : null}
                sx={{ minWidth: '120px' }}
              >
                {isSubmitting ? 'Processing...' : (activeStep === steps.length - 1 ? 'Register' : 'Next')}
              </ActionButton>
            </StepperButtonGroup>
            
            <StyledDivider>
              <Typography variant="body2" color="text.secondary">
                OR
              </Typography>
            </StyledDivider>
            
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="body1" sx={{ mb: 2, color: theme.palette.text.secondary }}>
                Already have an account?
              </Typography>
              <LoginLink
                component={RouterLink}
                to="/login"
                color="primary"
                variant="subtitle1"
              >
                Sign In
              </LoginLink>
            </Box>
          </Box>
        </StyledPaper>
      </Box>
      
      {/* Success Popup */}
      <SuccessPopup
        open={successPopup}
        title="Registration Successful!"
        message={`Your account has been created successfully as a ${formData.role === 'housewife' ? 'Service Provider' : 'Customer'}. Please login to continue.`}
        buttonText="Go to Login"
        onClose={() => setSuccessPopup(false)}
        onAction={handleSuccessAction}
      />
    </Container>
  );
};

export default Register; 