import React, { useEffect, useState } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Grid, 
  Card, 
  CardContent,
  Container,
  Paper
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import DescriptionIcon from '@mui/icons-material/Description';
import MailIcon from '@mui/icons-material/Mail';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import SpeedIcon from '@mui/icons-material/Speed';

const Home: React.FC = () => {
  const [animationPhase, setAnimationPhase] = useState<'pulseOnly' | 'waveActive'>('pulseOnly');

  useEffect(() => {
    let waveTimeout: NodeJS.Timeout;
    let bounceTimeout: NodeJS.Timeout;

    const cycleAnimation = () => {
      setAnimationPhase('pulseOnly');

      waveTimeout = setTimeout(() => {
        setAnimationPhase('waveActive');
      }, 10000);

      bounceTimeout = setTimeout(() => {
        setAnimationPhase('pulseOnly');
      }, 18000); // 10s pulse + 8s wave
    };

    cycleAnimation();
    const interval = setInterval(cycleAnimation, 28000); // 10s + 8s + 10s

    // Cleanup timeouts and interval on component unmount
    return () => {
      clearTimeout(waveTimeout);
      clearTimeout(bounceTimeout);
      clearInterval(interval);
    };
  }, []);

  const features = [
    {
      icon: <AutoFixHighIcon fontSize="large" color="primary" />,
      title: 'AI-Powered Generation',
      description: 'Our advanced AI technology creates personalized resumes and cover letters tailored to specific job descriptions.'
    },
    {
      icon: <SpeedIcon fontSize="large" color="primary" />,
      title: 'ATS Optimization',
      description: 'Get past Applicant Tracking Systems with our ATS-friendly formatting and keyword optimization.'
    },
    {
      icon: <DescriptionIcon fontSize="large" color="primary" />,
      title: 'Multiple Templates',
      description: 'Choose from a variety of professional templates that catch the eye and make your application stand out.'
    },
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Paper 
        sx={{ 
          py: 8, 
          px: 2, 
          mb: 6, 
          borderRadius: 3,
          background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
          color: 'white'
        }}
        elevation={3}
      >
        <Container maxWidth="md">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={7}>
              {/* Main Title - Static */}
              <Typography 
                variant="h2" 
                component="h1" 
                align="center" // Center align
                sx={{ mb: 1 }} // Reduced bottom margin
              >
                AI-Powered Resume Builder
              </Typography>
              {/* Subtitle - Static */}
              <Typography variant="h5" paragraph> 
                Create tailored resumes and cover letters that get you hired
              </Typography>
              <Box sx={{ mt: 4 }}>
                <Button 
                  variant="contained" 
                  size="large" 
                  component={RouterLink} 
                  to="/resume-builder"
                  sx={{ 
                    mr: 2, 
                    mb: 2,
                    backgroundColor: 'white',
                    color: 'primary.main',
                    '&:hover': {
                      backgroundColor: '#e0e0e0',
                    }
                  }}
                >
                  <DescriptionIcon sx={{ mr: 1 }} />
                  Create Resume
                </Button>
                <Button 
                  variant="outlined"
                  size="large"
                  component={RouterLink}
                  to="/resume-builder"
                  sx={{ 
                    mb: 2,
                    borderColor: 'white',
                    color: 'white',
                    '&:hover': {
                      borderColor: '#e0e0e0',
                      backgroundColor: 'rgba(255,255,255,0.1)',
                    }
                  }}
                >
                  <MailIcon sx={{ mr: 1 }} />
                  Write Cover Letter
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={5}>
              <Box
                component="img"
                src="/resume-preview.webp"
                alt="Resume preview"
                sx={{
                  width: '100%',
                  height: 'auto',
                  maxWidth: 400,
                  display: 'block',
                  margin: '0 auto',
                  borderRadius: 2,
                  boxShadow: 3
                }}
              />
            </Grid>
          </Grid>
          {/* Coming Soon Text - Moved below the grid */}
          <Typography
            variant="h3"
            align="center"
            sx={{
              mt: 4, // Margin top to space from grid
              fontWeight: 'bold',
              // Base styles - softer white
              color: 'rgba(255,255,255,0.9)',
              textShadow: '0 0 8px rgba(255,255,255,0.4)',
              animation: 'breathe 4s ease-in-out infinite',
              
              // Animation based on phase
              ...(animationPhase === 'waveActive' && {
                animation: 'waveGradient 12s linear forwards',
                backgroundImage: `linear-gradient(
                  to right,
                  rgba(255,255,255,0.9) 0%,
                  rgba(255,255,255,0.9) 10%,
                  #7DF9FF 20%,
                  rgba(255,255,255,0.8) 25%,
                  #FF69B4 35%,
                  rgba(255,255,255,0.8) 40%,
                  #FFD700 50%,
                  rgba(255,255,255,0.8) 55%,
                  #FF6347 65%,
                  rgba(255,255,255,0.8) 70%,
                  #9370DB 80%,
                  rgba(255,255,255,0.8) 85%,
                  #98FB98 90%,
                  rgba(255,255,255,0.9) 100%
                )`,
                backgroundSize: '500% auto', // Wider for smoother movement
                color: 'transparent',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                textShadow: '0 0 12px rgba(255,255,255,0.3)',
              }),

              // Breathing animation for white state
              '@keyframes breathe': {
                '0%, 100%': {
                  textShadow: '0 0 8px rgba(255,255,255,0.4)',
                  opacity: 0.9
                },
                '50%': {
                  textShadow: '0 0 12px rgba(255,255,255,0.5)',
                  opacity: 1
                }
              },

              // Wave animation with smoother transitions
              '@keyframes waveGradient': {
                '0%': { 
                  backgroundPosition: '0% center'
                },
                '100%': { 
                  backgroundPosition: '-400% center'
                }
              },
            }}
          >
            Big changes Coming Soon... WOAAOW
          </Typography>
        </Container>
      </Paper>

      {/* Features Section */}
      <Box sx={{ py: 6 }}>
        <Container maxWidth="lg">
          <Typography variant="h4" component="h2" align="center" gutterBottom>
            Key Features
          </Typography>
          <Typography variant="subtitle1" align="center" color="text.secondary" paragraph>
            How our AI-powered platform helps you land your dream job
          </Typography>
          
          <Grid container spacing={4} sx={{ mt: 4 }}>
            {features.map((feature, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }} elevation={2}>
                  <Box sx={{ p: 2, display: 'flex', justifyContent: 'center' }}>
                    {feature.icon}
                  </Box>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" component="h3" align="center" gutterBottom>
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" align="center">
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Templates Preview Section */}
      <Box sx={{ py: 6, bgcolor: 'background.paper' }}>
        <Container maxWidth="lg">
          <Typography variant="h4" component="h2" align="center" gutterBottom>
            Professional Templates
          </Typography>
          <Typography variant="subtitle1" align="center" color="text.secondary" paragraph>
            Choose from a wide variety of professional and creative resume templates
          </Typography>
          
          <Grid container spacing={3} sx={{ mt: 4 }}>
            {[1, 2, 3].map((item) => (
              <Grid item xs={12} sm={6} md={4} key={item}>
                <Card sx={{ maxWidth: 345, mx: 'auto' }} elevation={3}>
                  <Box
                    sx={{
                      height: 200,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      bgcolor: `primary.${item === 1 ? 'main' : item === 2 ? 'light' : 'dark'}`,
                      color: 'white'
                    }}
                  >
                    <Typography variant="h6">
                      Template {item}
                    </Typography>
                  </Box>
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                      {item === 1 ? 'Professional' : item === 2 ? 'Creative' : 'Modern'} Template
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item === 1 
                        ? 'Clean, organized, and ATS-friendly format perfect for corporate roles.' 
                        : item === 2 
                        ? 'Stand out with a unique design while maintaining professional structure.'
                        : 'Balanced template with contemporary design elements and optimal content layout.'}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          
          <Box sx={{ mt: 6, textAlign: 'center' }}>
            <Button 
              variant="contained" 
              size="large"
              component={RouterLink}
              to="/resume-builder"
            >
              Browse All Templates
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Call to Action */}
      <Box sx={{ py: 8, textAlign: 'center' }}>
        <Container maxWidth="md">
          <Typography variant="h4" component="h2" gutterBottom>
            Ready to boost your job search?
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" paragraph>
            Create your ATS-optimized resume and cover letter today
          </Typography>
          <Button 
            variant="contained" 
            size="large" 
            color="primary"
            component={RouterLink}
            to="/resume-builder"
          >
            Get Started For Free
          </Button>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;
