import React from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';
import ResumeBuilderForm from '../components/resume/ResumeBuilderForm';

const ResumeBuilder: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ pt: 2, pb: 6 }}>
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          AI Resume Builder
        </Typography>
        <Typography variant="subtitle1" align="center" color="text.secondary" sx={{ mb: 4 }}>
          Create a tailored, ATS-optimized resume in just a few steps
        </Typography>
        
        <ResumeBuilderForm />
        
        <Paper elevation={0} sx={{ p: 3, mt: 4, bgcolor: 'background.default' }}>
          <Typography variant="h6" gutterBottom>
            How Our AI Resume Builder Works
          </Typography>
          <Typography variant="body2" paragraph>
            1. <strong>Enter your information</strong> - Fill in your personal details, work experience, education, and skills.
          </Typography>
          <Typography variant="body2" paragraph>
            2. <strong>Add the job description</strong> - Paste the job posting you're applying for so our AI can analyze it.
          </Typography>
          <Typography variant="body2" paragraph>
            3. <strong>Generate your resume</strong> - Our AI will tailor your resume to match the job requirements and optimize it for ATS systems.
          </Typography>
          <Typography variant="body2" paragraph>
            4. <strong>Download and apply</strong> - Get your professionally formatted resume ready to submit to employers.
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
};

export default ResumeBuilder;