import React from 'react';
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
              <Typography variant="h2" component="h1" gutterBottom>
                AI-Powered Resume Builder
              </Typography>
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
              <Paper
                elevation={3}
                sx={{
                  width: '100%',
                  height: 400,
                  maxWidth: 400,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto',
                  borderRadius: 2,
                  backgroundColor: 'background.paper',
                  border: '1px solid',
                  borderColor: 'divider'
                }}
              >
                <Typography variant="h6" color="text.secondary">
                  Resume Preview
                </Typography>
              </Paper>
            </Grid>
          </Grid>
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
