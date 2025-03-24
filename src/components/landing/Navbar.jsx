import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
  useScrollTrigger,
  styled,
  useTheme
} from '@mui/material';
import {
  Menu as MenuIcon,
  AccountCircle,
  Login as LoginIcon,
  HowToReg as RegisterIcon
} from '@mui/icons-material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

// Custom styled components for enhanced UI
const StyledAppBar = styled(AppBar)(({ theme, scrolled }) => ({
  boxShadow: scrolled 
    ? '0 4px 20px rgba(0, 0, 0, 0.08)' 
    : 'none',
  backgroundColor: scrolled 
    ? theme.palette.background.paper 
    : 'transparent',
  transition: 'all 0.3s ease',
  color: scrolled ? theme.palette.text.primary : 'white',
  position: 'fixed',
  top: 0,
  backdropFilter: scrolled ? 'blur(10px)' : 'none',
}));

const LogoContainer = styled(Box)(({ theme, scrolled }) => ({
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  '& img': {
    height: '40px',
    transition: 'all 0.3s ease',
  },
}));

const LogoText = styled(Typography)(({ theme, scrolled }) => ({
  fontWeight: 800,
  marginLeft: theme.spacing(1),
  fontSize: '1.5rem',
  letterSpacing: '-0.02em',
  background: scrolled 
    ? `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})` 
    : 'white',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: scrolled ? 'transparent' : 'white',
  transition: 'all 0.3s ease',
}));

const NavButton = styled(Button)(({ theme, scrolled }) => ({
  my: 2,
  color: scrolled ? theme.palette.text.primary : 'white',
  fontWeight: 600,
  mx: 1.5,
  '&:hover': {
    backgroundColor: scrolled 
      ? 'rgba(0, 0, 0, 0.04)' 
      : 'rgba(255, 255, 255, 0.1)',
    transform: 'translateY(-3px)',
  },
  transition: 'all 0.3s ease',
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    width: '0%',
    height: '3px',
    bottom: '4px',
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: scrolled ? theme.palette.primary.main : 'white',
    transition: 'width 0.3s ease',
    borderRadius: '10px',
  },
  '&:hover::after': {
    width: '70%',
  },
}));

const AuthButton = styled(Button)(({ theme, variant, scrolled }) => ({
  fontWeight: 600,
  borderRadius: '50px',
  padding: theme.spacing(0.75, 2.5),
  transition: 'all 0.3s ease',
  marginLeft: theme.spacing(2),
  ...(variant === 'login' && {
    color: scrolled ? theme.palette.primary.main : 'white',
    border: `2px solid ${scrolled ? theme.palette.primary.main : 'white'}`,
    '&:hover': {
      backgroundColor: scrolled 
        ? 'rgba(33, 150, 243, 0.05)' 
        : 'rgba(255, 255, 255, 0.1)',
      transform: 'translateY(-3px)',
    },
  }),
  ...(variant === 'register' && {
    backgroundColor: theme.palette.secondary.main,
    color: 'white',
    '&:hover': {
      backgroundColor: theme.palette.secondary.dark,
      transform: 'translateY(-3px)',
      boxShadow: '0 6px 20px rgba(255, 138, 101, 0.3)',
    },
  }),
}));

// Menu items for navigation
const navigationLinks = [
  { name: 'Home', path: '#home' },
  { name: 'Services', path: '#services' },
  { name: 'How It Works', path: '#how-it-works' },
  { name: 'Testimonials', path: '#testimonials' },
  { name: 'Join Now', path: '#cta' }
];

const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const { currentUser, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();

  // Handle scroll event to change Navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  
  const handleNavClick = (e, path) => {
    handleCloseNavMenu();
    
    if (path.includes('#')) {
      e.preventDefault();
      const targetId = path.substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80, // Account for navbar height
          behavior: 'smooth'
        });
      }
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      handleCloseUserMenu();
      navigate('/');
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };

  return (
    <StyledAppBar position="fixed" scrolled={scrolled ? 1 : 0}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Logo for desktop */}
          <LogoContainer 
            sx={{ display: { xs: 'none', md: 'flex' } }}
            scrolled={scrolled ? 1 : 0}
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <LogoText variant="h6" scrolled={scrolled ? 1 : 0}>
              House Warrior
            </LogoText>
          </LogoContainer>

          {/* Mobile menu */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {navigationLinks.map((page) => (
                <MenuItem 
                  key={page.name} 
                  onClick={(e) => handleNavClick(e, page.path)}
                  component={page.path.includes('#') ? 'a' : RouterLink} 
                  to={page.path}
                  href={page.path.includes('#') ? page.path : undefined}
                >
                  <Typography textAlign="center">{page.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Logo for mobile */}
          <LogoContainer 
            sx={{ display: { xs: 'flex', md: 'none' }, flexGrow: 1 }}
            scrolled={scrolled ? 1 : 0}
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <LogoText variant="h6" scrolled={scrolled ? 1 : 0}>
              House Warrior
            </LogoText>
          </LogoContainer>

          {/* Desktop menu */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
            {navigationLinks.map((page) => (
              <NavButton
                key={page.name}
                scrolled={scrolled ? 1 : 0}
                component={page.path.includes('#') ? 'a' : RouterLink}
                to={!page.path.includes('#') ? page.path : undefined}
                href={page.path.includes('#') ? page.path : undefined}
                onClick={(e) => handleNavClick(e, page.path)}
              >
                {page.name}
              </NavButton>
            ))}
          </Box>

          {/* Auth buttons/user menu */}
          <Box sx={{ flexGrow: 0 }}>
            {isAuthenticated && currentUser ? (
              // If user is logged in, show user menu
              <>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar 
                      alt={currentUser.name || "User"} 
                      src={currentUser.photoURL || undefined}
                      sx={{ 
                        width: 40, 
                        height: 40,
                        backgroundColor: theme.palette.primary.main,
                      }}
                    >
                      {!currentUser.photoURL && (currentUser.name?.charAt(0) || <AccountCircle />)}
                    </Avatar>
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem component={RouterLink} to="/dashboard" onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">Dashboard</Typography>
                  </MenuItem>
                  <MenuItem component={RouterLink} to="/profile" onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">Profile</Typography>
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>
                    <Typography textAlign="center">Logout</Typography>
                  </MenuItem>
                </Menu>
              </>
            ) : (
              // If user is not logged in, show login/register buttons
              <Box sx={{ display: 'flex' }}>
                <AuthButton 
                  variant="login" 
                  scrolled={scrolled ? 1 : 0}
                  startIcon={<LoginIcon />}
                  component={RouterLink}
                  to="/login"
                >
                  Login
                </AuthButton>
                <AuthButton 
                  variant="register" 
                  scrolled={scrolled ? 1 : 0}
                  startIcon={<RegisterIcon />}
                  component={RouterLink}
                  to="/register"
                >
                  Sign Up
                </AuthButton>
              </Box>
            )}
          </Box>
        </Toolbar>
      </Container>
    </StyledAppBar>
  );
};

export default Navbar; 