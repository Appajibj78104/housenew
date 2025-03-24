import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Avatar,
  IconButton,
  useTheme,
  alpha,
  useMediaQuery,
  styled,
  Rating
} from '@mui/material';
import {
  FormatQuote,
  ArrowBackIos,
  ArrowForwardIos
} from '@mui/icons-material';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// Custom styled components
const SectionContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(10, 0),
  backgroundColor: alpha(theme.palette.primary.main, 0.02),
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    right: 0,
    width: '400px',
    height: '400px',
    background: `radial-gradient(circle, ${alpha(theme.palette.primary.light, 0.1)} 0%, transparent 70%)`,
    zIndex: 0,
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '300px',
    height: '300px',
    background: `radial-gradient(circle, ${alpha(theme.palette.secondary.light, 0.08)} 0%, transparent 70%)`,
    zIndex: 0,
  }
}));

const ContentWrapper = styled(Container)(({ theme }) => ({
  position: 'relative',
  zIndex: 1,
}));

const SectionHeading = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(1),
  fontWeight: 800,
  textAlign: 'center',
  position: 'relative',
  display: 'inline-block',
  color: theme.palette.text.primary,
  '&::after': {
    content: '""',
    position: 'absolute',
    width: '100px',
    height: '4px',
    bottom: '-10px',
    left: '50%',
    transform: 'translateX(-50%)',
    background: theme.palette.primary.main,
    borderRadius: '2px',
  },
}));

const SectionSubheading = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(6),
  color: theme.palette.text.secondary,
  textAlign: 'center',
  maxWidth: '800px',
  margin: '0 auto',
}));

const TestimonialCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: theme.spacing(2),
  position: 'relative',
  transition: 'all 0.3s ease',
  boxShadow: '0 6px 20px rgba(0, 0, 0, 0.05)',
  cursor: 'pointer',
  margin: '20px 15px',
  '&:hover': {
    transform: 'translateY(-10px)',
    boxShadow: '0 15px 40px rgba(0, 0, 0, 0.1)',
  },
}));

const QuoteIcon = styled(FormatQuote)(({ theme }) => ({
  position: 'absolute',
  top: 20,
  right: 20,
  fontSize: '3rem',
  color: alpha(theme.palette.primary.main, 0.1),
  transform: 'rotate(180deg)',
}));

const TestimonialContent = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  color: theme.palette.text.primary,
  fontStyle: 'italic',
  flex: 1,
  position: 'relative',
  zIndex: 1,
  lineHeight: 1.6,
}));

const UserInfo = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginTop: 'auto',
}));

const UserAvatar = styled(Avatar)(({ theme }) => ({
  width: 60,
  height: 60,
  marginRight: theme.spacing(2),
  border: `3px solid ${theme.palette.background.paper}`,
  boxShadow: '0 5px 15px rgba(0, 0, 0, 0.08)',
}));

const UserName = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  marginBottom: theme.spacing(0.5),
}));

const UserRole = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: '0.875rem',
}));

const RatingContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  margin: theme.spacing(1, 0),
}));

const NavigationButton = styled(IconButton)(({ theme, direction }) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  zIndex: 10,
  ...(direction === 'prev' ? { left: { xs: 5, md: -20 } } : { right: { xs: 5, md: -20 } }),
  '&:hover': {
    backgroundColor: theme.palette.background.paper,
    boxShadow: '0 6px 20px rgba(0, 0, 0, 0.15)',
    transform: 'translateY(-50%) scale(1.1)',
  },
  [theme.breakpoints.down('sm')]: {
    width: 35,
    height: 35,
  },
}));

// Testimonial data
const testimonials = [
  {
    id: 1,
    content: "House Warrior transformed my life! As a housewife with culinary skills, I now earn a steady income while maintaining flexibility for my family. The platform is intuitive and clients are respectful.",
    name: "Sarah Johnson",
    role: "Culinary Service Provider",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
    rating: 5
  },
  {
    id: 2,
    content: "Finding reliable home services used to be challenging, but House Warrior changed that. I've used their cleaning and tutoring services - both exceeded expectations. Transparent pricing and verified providers give me peace of mind.",
    name: "Michael Chen",
    role: "Customer",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
    rating: 4.5
  },
  {
    id: 3,
    content: "I started offering baking services through House Warrior after being a stay-at-home mom for 6 years. Now I run a successful home bakery! The platform handles payments and scheduling so I can focus on what I love.",
    name: "Emily Rodriguez",
    role: "Baking Service Provider",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
    rating: 5
  },
  {
    id: 4,
    content: "As a busy professional, House Warrior has been a lifesaver. I've found high-quality services for everything from meal preparation to gardening. The ability to read verified reviews helps me choose the best providers.",
    name: "David Thompson",
    role: "Customer",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
    rating: 4.5
  },
  {
    id: 5,
    content: "House Warrior empowered me to use my teaching background while staying home with my children. I now tutor students online and in-person through the platform, creating a perfect work-life balance.",
    name: "Priya Patel",
    role: "Tutoring Service Provider",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
    rating: 5
  }
];

const Testimonials = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const SliderRef = React.useRef(null);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: isMobile ? 1 : 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };

  const handlePrev = () => {
    SliderRef.current.slickPrev();
  };

  const handleNext = () => {
    SliderRef.current.slickNext();
  };

  return (
    <SectionContainer id="testimonials">
      <ContentWrapper maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <SectionHeading variant="h2">
            What Our Users Say
          </SectionHeading>
          <SectionSubheading variant="subtitle1">
            Read about the experiences of housewives and customers who have found success with our platform
          </SectionSubheading>
        </Box>

        <Box sx={{ position: 'relative', mx: { xs: 1, md: 4 }, my: 4 }}>
          <NavigationButton direction="prev" onClick={handlePrev}>
            <ArrowBackIos fontSize="small" sx={{ ml: 1 }} />
          </NavigationButton>
          
          <Slider ref={SliderRef} {...settings}>
            {testimonials.map((testimonial) => (
              <div key={testimonial.id}>
                <TestimonialCard elevation={1}>
                  <QuoteIcon />
                  <TestimonialContent variant="body1">
                    "{testimonial.content}"
                  </TestimonialContent>
                  
                  <UserInfo>
                    <UserAvatar src={testimonial.avatar} alt={testimonial.name} />
                    <Box>
                      <UserName variant="subtitle1">{testimonial.name}</UserName>
                      <UserRole variant="body2">{testimonial.role}</UserRole>
                      <RatingContainer>
                        <Rating 
                          value={testimonial.rating} 
                          precision={0.5} 
                          readOnly 
                          size="small"
                        />
                      </RatingContainer>
                    </Box>
                  </UserInfo>
                </TestimonialCard>
              </div>
            ))}
          </Slider>
          
          <NavigationButton direction="next" onClick={handleNext}>
            <ArrowForwardIos fontSize="small" />
          </NavigationButton>
        </Box>
      </ContentWrapper>
    </SectionContainer>
  );
};

export default Testimonials; 