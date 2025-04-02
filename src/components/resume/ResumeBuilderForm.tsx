import React, { useState } from 'react';
import { 
  Box,
  Paper,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Button,
  CircularProgress
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ResumeData, PersonalInfo } from '../../types/resume';
import aiService from '../../services/aiService';

// Step components
import PersonalInfoForm from './steps/PersonalInfoForm';
import WorkExperienceForm from './steps/WorkExperienceForm';
import EducationForm from './steps/EducationForm';
import SkillsForm from './steps/SkillsForm';
import JobDescriptionForm from './steps/JobDescriptionForm';
import ResumePreview from './ResumePreview';

const steps = [
  'Personal Information',
  'Work Experience',
  'Education',
  'Skills & Projects',
  'Job Description',
  'Preview'
];

const initialValues: Partial<ResumeData> = {
  personalInfo: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    summary: '',
  } as PersonalInfo,
  workExperience: [
    {
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      description: '',
      achievements: [''],
      location: '',
    }
  ],
  education: [
    {
      institution: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      description: '',
    }
  ],
  skills: [],
  projects: [],
};

const ResumeBuilderForm: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [jobDescription, setJobDescription] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedResume, setGeneratedResume] = useState<ResumeData | null>(null);

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object({}), // We'll implement step-specific validation
    onSubmit: async (values) => {
      console.log('Form submitted with values:', values);
      
      // If we're on the final step, generate the resume
      if (activeStep === steps.length - 2) {
        await handleGenerateResume();
      }
    },
  });

  const handleNext = () => {
    // Validate current step before proceeding
    // This is a placeholder - we would implement actual step validation
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleJobDescriptionChange = (description: string) => {
    setJobDescription(description);
  };

  const handleGenerateResume = async () => {
    if (isGenerating) return;

    setIsGenerating(true);
    try {
      // Use the AI service to generate a tailored resume
      const result = await aiService.generateResume(formik.values as ResumeData, jobDescription);
      setGeneratedResume(result);
      // Move to the preview step
      setActiveStep(steps.length - 1);
    } catch (error) {
      console.error('Error generating resume:', error);
      // We should add proper error handling here
    } finally {
      setIsGenerating(false);
    }
  };

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return <PersonalInfoForm formik={formik} />;
      case 1:
        return <WorkExperienceForm formik={formik} />;
      case 2:
        return <EducationForm formik={formik} />;
      case 3:
        return <SkillsForm formik={formik} />;
      case 4:
        return (
          <JobDescriptionForm 
            jobDescription={jobDescription} 
            onJobDescriptionChange={handleJobDescriptionChange} 
          />
        );
      case 5:
        return <ResumePreview resume={generatedResume || formik.values as ResumeData} />;
      default:
        return 'Unknown step';
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h4" component="h1" align="center" sx={{ mb: 4 }}>
          Build Your ATS-Optimized Resume
        </Typography>
        
        <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Box component="form" onSubmit={formik.handleSubmit}>
          {getStepContent(activeStep)}
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
            <Button
              variant="outlined"
              disabled={activeStep === 0}
              onClick={handleBack}
            >
              Back
            </Button>
            
            <Box>
              {activeStep === steps.length - 2 ? (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleGenerateResume}
                  disabled={isGenerating}
                  startIcon={isGenerating ? <CircularProgress size={20} /> : null}
                >
                  {isGenerating ? 'Generating...' : 'Generate AI Resume'}
                </Button>
              ) : activeStep === steps.length - 1 ? (
                <Button
                  variant="contained"
                  color="primary"
                >
                  Download Resume
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                >
                  Next
                </Button>
              )}
            </Box>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default ResumeBuilderForm;
