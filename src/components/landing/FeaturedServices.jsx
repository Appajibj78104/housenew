import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  useTheme,
  alpha,
  styled
} from '@mui/material';
import {
  Restaurant as RestaurantIcon,
  School as SchoolIcon,
  Brush as BrushIcon,
  Spa as SpaIcon,
  FitnessCenter as FitnessCenterIcon,
  LocalHospital as LocalHospitalIcon,
  ChildCare as ChildCareIcon,
  HomeWork as HomeWorkIcon,
  Celebration as CelebrationIcon,
  Computer as ComputerIcon,
  Pets as PetsIcon,
  LocalFlorist as LocalFloristIcon,
  ArrowForward as ArrowForwardIcon
} from '@mui/icons-material';

// Styled components for enhanced design
const SectionContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(10, 0),
  backgroundColor: theme.palette.background.default,
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    right: 0,
    width: '400px',
    height: '400px',
    background: `radial-gradient(circle, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.primary.main, 0)} 70%)`,
    zIndex: 0,
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '300px',
    height: '300px',
    background: `radial-gradient(circle, ${alpha(theme.palette.secondary.main, 0.08)} 0%, ${alpha(theme.palette.secondary.main, 0)} 70%)`,
    zIndex: 0,
  }
}));

const SectionHeading = styled(Typography)(({ theme }) => ({
  fontWeight: 800,
  marginBottom: theme.spacing(1),
  textAlign: 'center',
  position: 'relative',
  display: 'inline-block',
  color: theme.palette.text.primary,
}));

const SectionSubheading = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(6),
  textAlign: 'center',
  maxWidth: '700px',
  margin: '0 auto',
  color: theme.palette.text.secondary,
}));

const ServiceCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'all 0.3s ease',
  overflow: 'visible',
  backgroundColor: theme.palette.background.paper,
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 16px 30px rgba(0, 0, 0, 0.1)',
    '& .MuiCardContent-root .service-icon': {
      backgroundColor: theme.palette.primary.main,
      color: 'white',
      transform: 'scale(1.1) rotate(5deg)',
    },
  },
}));

const ServiceIcon = styled(Box)(({ theme }) => ({
  width: '70px',
  height: '70px',
  borderRadius: '20px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: theme.spacing(2),
  backgroundColor: alpha(theme.palette.primary.main, 0.1),
  color: theme.palette.primary.main,
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  '& svg': {
    fontSize: '2rem',
  },
}));

const ServiceTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  marginBottom: theme.spacing(1),
  color: theme.palette.text.primary,
}));

const ServiceDescription = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(2),
  flexGrow: 1,
}));

const LearnMoreButton = styled(Button)(({ theme }) => ({
  alignSelf: 'flex-start',
  marginTop: 'auto',
  borderRadius: '50px',
  fontWeight: 600,
  textTransform: 'none',
  padding: theme.spacing(0.75, 2),
  '&:hover': {
    backgroundColor: alpha(theme.palette.primary.main, 0.08),
    '& .MuiSvgIcon-root': {
      transform: 'translateX(4px)',
    },
  },
  '& .MuiSvgIcon-root': {
    fontSize: '1rem',
    transition: 'transform 0.3s ease',
  },
}));

// Service categories data
const serviceCategories = [
  {
    title: 'Culinary',
    description: 'Expert home-cooked meals, baking, meal prep, and cooking classes for all dietary needs.',
    icon: <RestaurantIcon />,
  },
  {
    title: 'Tutoring',
    description: 'Personalized educational support for all ages, subjects, and skill levels.',
    icon: <SchoolIcon />,
  },
  {
    title: 'Arts & Crafts',
    description: 'Handmade creations, custom designs, and artistic services for home and events.',
    icon: <BrushIcon />,
  },
  {
    title: 'Beauty & Personal Care',
    description: 'Hair styling, makeup, manicures, and more from the comfort of your home.',
    icon: <SpaIcon />,
  },
  {
    title: 'Health & Wellness',
    description: 'Fitness training, yoga instruction, and wellness coaching services.',
    icon: <FitnessCenterIcon />,
  },
  {
    title: 'Healthcare Support',
    description: 'Caregiving, medical assistance, and health monitoring by qualified professionals.',
    icon: <LocalHospitalIcon />,
  },
  {
    title: 'Childcare & Elderly Support',
    description: 'Reliable care for children and seniors with compassion and expertise.',
    icon: <ChildCareIcon />,
  },
  {
    title: 'Home Management',
    description: 'Cleaning, organization, and home maintenance services to simplify your life.',
    icon: <HomeWorkIcon />,
  },
  {
    title: 'Event Planning',
    description: 'Comprehensive event planning, decoration, and catering for special occasions.',
    icon: <CelebrationIcon />,
  },
  {
    title: 'Tech Services',
    description: 'Technical support, digital assistance, and technology education for all skill levels.',
    icon: <ComputerIcon />,
  },
  {
    title: 'Pet Care',
    description: 'Loving pet sitting, grooming, and training services for your furry friends.',
    icon: <PetsIcon />,
  },
  {
    title: 'Gardening',
    description: 'Plant care, garden design, and maintenance to create beautiful outdoor spaces.',
    icon: <LocalFloristIcon />,
  },
];

const FeaturedServices = () => {
  const theme = useTheme();

  return (
    <SectionContainer id="services">
      <Container maxWidth="xl">
        <Box sx={{ mb: 6, textAlign: 'center' }}>
          <SectionHeading variant="h2">
            Explore Our Services
          </SectionHeading>
          <SectionSubheading variant="subtitle1">
            Discover the wide range of high-quality services offered by skilled housewives in your community
          </SectionSubheading>
        </Box>

        <Grid container spacing={3}>
          {serviceCategories.map((service, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <ServiceCard>
                <CardContent sx={{ p: 3, flexGrow: 1 }}>
                  <ServiceIcon className="service-icon">
                    {service.icon}
                  </ServiceIcon>
                  <ServiceTitle variant="h5">
                    {service.title}
                  </ServiceTitle>
                  <ServiceDescription variant="body2">
                    {service.description}
                  </ServiceDescription>
                </CardContent>
                <CardActions sx={{ px: 3, pb: 3 }}>
                  <LearnMoreButton 
                    color="primary" 
                    endIcon={<ArrowForwardIcon />}
                  >
                    Learn More
                  </LearnMoreButton>
                </CardActions>
              </ServiceCard>
            </Grid>
          ))}
        </Grid>
      </Container>
    </SectionContainer>
  );
};

export default FeaturedServices; 