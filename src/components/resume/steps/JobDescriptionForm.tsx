import React from 'react';
import {
  Grid,
  TextField,
  Typography,
  Divider,
  Paper,
  Box,
  Alert,
  CircularProgress,
} from '@mui/material';
import { useState } from 'react';
import aiService from '../../../services/aiService';

interface JobDescriptionFormProps {
  jobDescription: string;
  onJobDescriptionChange: (description: string) => void;
}

const JobDescriptionForm: React.FC<JobDescriptionFormProps> = ({
  jobDescription,
  onJobDescriptionChange,
}) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<{
    keywords: string[];
    skills: string[];
    relevanceScore: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleJobDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onJobDescriptionChange(e.target.value);
  };

  const analyzeJobDescription = async () => {
    if (!jobDescription.trim()) {
      setError('Please enter a job description to analyze');
      return;
    }

    setIsAnalyzing(true);
    setError(null);

    try {
      const result = await aiService.analyzeJobDescription(jobDescription);
      setAnalysis(result);
    } catch (error) {
      console.error('Error analyzing job description:', error);
      setError('Failed to analyze job description. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h5" gutterBottom>
          Job Description Analysis
        </Typography>
        <Divider sx={{ mb: 3 }} />

        <Typography variant="body1" paragraph>
          Paste the job description below. Our AI will analyze it to extract key skills and requirements,
          which will be used to tailor your resume for this specific position.
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <TextField
          fullWidth
          id="jobDescription"
          name="jobDescription"
          label="Job Description"
          value={jobDescription}
          onChange={handleJobDescriptionChange}
          variant="outlined"
          multiline
          rows={10}
          placeholder="Paste the job description here..."
        />
      </Grid>

      <Grid item xs={12}>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Box
            component="button"
            onClick={analyzeJobDescription}
            disabled={isAnalyzing || !jobDescription.trim()}
            sx={{
              bgcolor: 'primary.main',
              color: 'white',
              py: 1,
              px: 2,
              borderRadius: 1,
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              '&:disabled': {
                bgcolor: 'grey.400',
                cursor: 'not-allowed',
              },
              '&:hover:not(:disabled)': {
                bgcolor: 'primary.dark',
              },
            }}
          >
            {isAnalyzing && <CircularProgress size={20} sx={{ color: 'white', mr: 1 }} />}
            {isAnalyzing ? 'Analyzing...' : 'Analyze Job Description'}
          </Box>
        </Box>
      </Grid>

      {error && (
        <Grid item xs={12}>
          <Alert severity="error">{error}</Alert>
        </Grid>
      )}

      {analysis && (
        <Grid item xs={12}>
          <Paper elevation={2} sx={{ p: 3, mt: 2 }}>
            <Typography variant="h6" gutterBottom>
              Job Analysis Results
            </Typography>
            
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                Key Keywords:
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {analysis.keywords.map((keyword, index) => (
                  <Box
                    key={index}
                    sx={{
                      bgcolor: 'primary.light',
                      color: 'white',
                      py: 0.5,
                      px: 1.5,
                      borderRadius: 4,
                    }}
                  >
                    {keyword}
                  </Box>
                ))}
              </Box>
            </Box>
            
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                Required Skills:
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {analysis.skills.map((skill, index) => (
                  <Box
                    key={index}
                    sx={{
                      bgcolor: 'secondary.light',
                      color: 'white',
                      py: 0.5,
                      px: 1.5,
                      borderRadius: 4,
                    }}
                  >
                    {skill}
                  </Box>
                ))}
              </Box>
            </Box>
            
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                Resume Matching Score:
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <CircularProgress
                  variant="determinate"
                  value={analysis.relevanceScore * 100}
                  color={analysis.relevanceScore > 0.7 ? 'success' : analysis.relevanceScore > 0.4 ? 'warning' : 'error'}
                  sx={{ mr: 2 }}
                />
                <Typography variant="body1">
                  {Math.round(analysis.relevanceScore * 100)}% match with your current resume
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Your resume will be tailored to improve this score using our AI optimization.
              </Typography>
            </Box>
          </Paper>
        </Grid>
      )}
    </Grid>
  );
};

export default JobDescriptionForm;