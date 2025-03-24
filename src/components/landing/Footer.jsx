import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  TextField,
  Button,
  styled,
  useTheme,
  ListItemIcon,
  InputAdornment,
} from '@mui/material';
import {
  Facebook,
  Twitter,
  Instagram,
  LinkedIn,
  Send,
  KeyboardArrowUp,
  Phone,
  Email,
  LocationOn,
  ArrowForward,
  CheckCircle,
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';

// Custom styled components
const FooterContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.dark,
  color: 'rgba(255, 255, 255, 0.85)',
  paddingTop: theme.spacing(8),
  paddingBottom: theme.spacing(4),
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '4px',
    background: `linear-gradient(90deg, ${theme.palette.secondary.main}, ${theme.palette.primary.light})`,
  },
}));

const Logo = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  color: 'white',
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(2),
}));

const LogoIcon = styled('img')({
  width: '40px',
  height: '40px',
  marginRight: '10px',
});

const FooterHeading = styled(Typography)(({ theme }) => ({
  color: 'white',
  fontWeight: 600,
  marginBottom: theme.spacing(3),
  position: 'relative',
  paddingBottom: theme.spacing(1),
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '30px',
    height: '2px',
    backgroundColor: theme.palette.secondary.main,
  },
}));

const FooterLink = styled(Link)(({ theme }) => ({
  color: 'rgba(255, 255, 255, 0.7)',
  textDecoration: 'none',
  transition: 'all 0.2s ease',
  display: 'inline-block',
  marginBottom: theme.spacing(1),
  '&:hover': {
    color: theme.palette.secondary.main,
    transform: 'translateX(5px)',
  },
}));

const SocialButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  color: 'white',
  margin: theme.spacing(0, 0.5),
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: theme.palette.primary.main,
    transform: 'translateY(-3px)',
  },
}));

const SubscribeForm = styled(Box)(({ theme }) => ({
  display: 'flex',
  marginTop: theme.spacing(2),
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    '& .MuiTextField-root': {
      marginBottom: theme.spacing(1),
    },
  },
}));

const SubscribeInput = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    color: 'white',
    borderRadius: '4px 0 0 4px',
    '& fieldset': {
      borderColor: 'rgba(255, 255, 255, 0.2)',
    },
    '&:hover fieldset': {
      borderColor: 'rgba(255, 255, 255, 0.3)',
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.primary.main,
    },
  },
  '& .MuiInputBase-input::placeholder': {
    color: 'rgba(255, 255, 255, 0.5)',
  },
  '& .MuiInputLabel-root': {
    color: 'rgba(255, 255, 255, 0.7)',
  },
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    '& .MuiOutlinedInput-root': {
      borderRadius: '4px',
    },
  },
}));

const SubscribeButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: 'white',
  borderRadius: '0 4px 4px 0',
  padding: theme.spacing(1, 2),
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    borderRadius: '4px',
    marginTop: theme.spacing(1),
  },
}));

const ContactItem = styled(ListItem)(({ theme }) => ({
  padding: theme.spacing(0.5, 0),
  '& .MuiListItemIcon-root': {
    minWidth: '30px',
    color: theme.palette.secondary.main,
  },
}));

const CopyrightSection = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(3, 0, 1),
  color: 'rgba(255, 255, 255, 0.6)',
}));

const ScrollTopButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  right: '30px',
  top: '-25px',
  backgroundColor: theme.palette.primary.main,
  color: 'white',
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
}));

const NewsletterForm = styled('form')(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

const FeatureItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(1),
}));

const FeatureIcon = styled(CheckCircle)(({ theme }) => ({
  color: theme.palette.secondary.main,
  fontSize: '1rem',
  marginRight: theme.spacing(1),
}));

const Footer = () => {
  const theme = useTheme();
  const [email, setEmail] = React.useState('');
  const [subscribed, setSubscribed] = React.useState(false);

  const handleScrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      // In a real app, you would send this to your API
      console.log('Subscribed with:', email);
    }
  };

  return (
    <FooterContainer component="footer" id="contact">
      <ScrollTopButton 
        onClick={handleScrollTop} 
        aria-label="Scroll to top"
      >
        <KeyboardArrowUp />
      </ScrollTopButton>
      
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={3}>
            <Logo variant="h5">
              <LogoIcon 
                src="/logo.png" 
                alt="House Warrior Logo" 
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://via.placeholder.com/40?text=HW";
                }}
              />
              House Warrior
            </Logo>
            <Typography variant="body2" sx={{ mb: 3, maxWidth: 280 }}>
              Empowering housewives to showcase their skills and connecting customers with quality home services.
            </Typography>
            <Box sx={{ display: 'flex', mb: 3 }}>
              <SocialButton aria-label="Facebook">
                <Facebook fontSize="small" />
              </SocialButton>
              <SocialButton aria-label="Twitter">
                <Twitter fontSize="small" />
              </SocialButton>
              <SocialButton aria-label="Instagram">
                <Instagram fontSize="small" />
              </SocialButton>
              <SocialButton aria-label="LinkedIn">
                <LinkedIn fontSize="small" />
              </SocialButton>
            </Box>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <FooterHeading variant="h6">Quick Links</FooterHeading>
            <List disablePadding>
              <ListItem disableGutters dense>
                <ListItemText>
                  <FooterLink component={RouterLink} to="/">Home</FooterLink>
                </ListItemText>
              </ListItem>
              <ListItem disableGutters dense>
                <ListItemText>
                  <FooterLink component={RouterLink} to="/about">About Us</FooterLink>
                </ListItemText>
              </ListItem>
              <ListItem disableGutters dense>
                <ListItemText>
                  <FooterLink component={RouterLink} to="/services">Services</FooterLink>
                </ListItemText>
              </ListItem>
              <ListItem disableGutters dense>
                <ListItemText>
                  <FooterLink component={RouterLink} to="/blog">Blog</FooterLink>
                </ListItemText>
              </ListItem>
              <ListItem disableGutters dense>
                <ListItemText>
                  <FooterLink component={RouterLink} to="/contact">Contact</FooterLink>
                </ListItemText>
              </ListItem>
            </List>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <FooterHeading variant="h6">Contact Us</FooterHeading>
            <List dense disablePadding>
              <ContactItem>
                <ListItemIcon>
                  <LocationOn fontSize="small" />
                </ListItemIcon>
                <ListItemText 
                  primary="123 House Warrior Lane, Suite 101" 
                  primaryTypographyProps={{ variant: 'body2' }}
                />
              </ContactItem>
              <ContactItem>
                <ListItemIcon>
                  <Phone fontSize="small" />
                </ListItemIcon>
                <ListItemText 
                  primary="+92 (123) 456-7890" 
                  primaryTypographyProps={{ variant: 'body2' }}
                />
              </ContactItem>
              <ContactItem>
                <ListItemIcon>
                  <Email fontSize="small" />
                </ListItemIcon>
                <ListItemText 
                  primary="info@housewarrior.com" 
                  primaryTypographyProps={{ variant: 'body2' }}
                />
              </ContactItem>
            </List>
            
            <Box mt={3}>
              <FooterHeading variant="h6">Why Choose Us</FooterHeading>
              <FeatureItem>
                <FeatureIcon />
                <Typography variant="body2">Verified Providers</Typography>
              </FeatureItem>
              <FeatureItem>
                <FeatureIcon />
                <Typography variant="body2">Secure Payments</Typography>
              </FeatureItem>
              <FeatureItem>
                <FeatureIcon />
                <Typography variant="body2">Quality Assurance</Typography>
              </FeatureItem>
              <FeatureItem>
                <FeatureIcon />
                <Typography variant="body2">24/7 Support</Typography>
              </FeatureItem>
            </Box>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <FooterHeading variant="h6">Newsletter</FooterHeading>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Subscribe to our newsletter for the latest updates, offers, and news.
            </Typography>
            
            {!subscribed ? (
              <NewsletterForm onSubmit={handleSubscribe}>
                <SubscribeInput
                  fullWidth
                  variant="outlined"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <ArrowForward sx={{ color: 'rgba(255, 255, 255, 0.5)' }} />
                      </InputAdornment>
                    ),
                  }}
                />
                <SubscribeButton
                  type="submit"
                  variant="contained"
                  fullWidth
                  disableElevation
                >
                  Subscribe
                </SubscribeButton>
              </NewsletterForm>
            ) : (
              <Box 
                sx={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.05)', 
                  p: 2, 
                  borderRadius: 2,
                  textAlign: 'center',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}
              >
                <CheckCircle sx={{ color: theme.palette.secondary.main, fontSize: '2rem', mb: 1 }} />
                <Typography variant="body1" sx={{ color: 'white', fontWeight: 500 }}>
                  Thank you for subscribing!
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  You'll receive our newsletter soon.
                </Typography>
              </Box>
            )}
            
            <Box mt={3}>
              <Typography variant="body2" sx={{ fontWeight: 500, color: 'white', mb: 1 }}>
                Download Our App
              </Typography>
              <Box display="flex" gap={1}>
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Google_Play_Store_badge_EN.svg/2560px-Google_Play_Store_badge_EN.svg.png" 
                  alt="Get it on Google Play"
                  style={{ height: '32px', width: 'auto' }}
                />
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Download_on_the_App_Store_Badge.svg/2560px-Download_on_the_App_Store_Badge.svg.png" 
                  alt="Download on App Store"
                  style={{ height: '32px', width: 'auto' }}
                />
              </Box>
            </Box>
          </Grid>
        </Grid>
        
        <Divider sx={{ my: 4, backgroundColor: 'rgba(255, 255, 255, 0.1)' }} />
        
        <Grid container spacing={2} justifyContent="space-between" alignItems="center">
          <Grid item xs={12} md={6}>
            <CopyrightSection>
              <Typography variant="body2">
                © {new Date().getFullYear()} House Warrior. All rights reserved.
              </Typography>
            </CopyrightSection>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box display="flex" justifyContent={{ xs: 'center', md: 'flex-end' }} gap={2}>
              <FooterLink href="#" underline="none" variant="body2">
                Privacy Policy
              </FooterLink>
              <FooterLink href="#" underline="none" variant="body2">
                Terms of Service
              </FooterLink>
              <FooterLink href="#" underline="none" variant="body2">
                Cookies Policy
              </FooterLink>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </FooterContainer>
  );
};

export default Footer; 