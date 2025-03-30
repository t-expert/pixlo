import React from 'react';
import {
  Grid,
  TextField,
  Typography,
  Divider,
  Button,
  Box,
  IconButton,
  Paper,
} from '@mui/material';
import { FormikProps } from 'formik';
import { ResumeData, WorkExperience } from '../../../types/resume';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

interface WorkExperienceFormProps {
  formik: FormikProps<Partial<ResumeData>>;
}

const WorkExperienceForm: React.FC<WorkExperienceFormProps> = ({ formik }) => {
  const { values, handleChange, handleBlur, setFieldValue } = formik;
  const workExperiences = values.workExperience || [];

  const addWorkExperience = () => {
    const newWorkExperience: WorkExperience = {
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      description: '',
      achievements: [''],
      location: '',
    };
    setFieldValue('workExperience', [...workExperiences, newWorkExperience]);
  };

  const removeWorkExperience = (index: number) => {
    const updatedWorkExperiences = [...workExperiences];
    updatedWorkExperiences.splice(index, 1);
    setFieldValue('workExperience', updatedWorkExperiences);
  };

  const addAchievement = (workIndex: number) => {
    const updatedWorkExperiences = [...workExperiences];
    updatedWorkExperiences[workIndex].achievements = [
      ...updatedWorkExperiences[workIndex].achievements,
      '',
    ];
    setFieldValue('workExperience', updatedWorkExperiences);
  };

  const removeAchievement = (workIndex: number, achievementIndex: number) => {
    const updatedWorkExperiences = [...workExperiences];
    updatedWorkExperiences[workIndex].achievements.splice(achievementIndex, 1);
    setFieldValue('workExperience', updatedWorkExperiences);
  };

  const handleAchievementChange = (
    workIndex: number,
    achievementIndex: number,
    value: string
  ) => {
    const updatedWorkExperiences = [...workExperiences];
    updatedWorkExperiences[workIndex].achievements[achievementIndex] = value;
    setFieldValue('workExperience', updatedWorkExperiences);
  };

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom>
            Work Experience
          </Typography>
          <Divider sx={{ mb: 3 }} />
        </Grid>
      </Grid>

      {workExperiences.map((experience, workIndex) => (
        <Paper 
          key={workIndex} 
          elevation={2} 
          sx={{ p: 3, mb: 3, position: 'relative' }}
        >
          {workExperiences.length > 1 && (
            <IconButton
              size="small"
              aria-label="delete"
              onClick={() => removeWorkExperience(workIndex)}
              sx={{ position: 'absolute', top: 8, right: 8 }}
            >
              <DeleteIcon />
            </IconButton>
          )}

          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id={`workExperience[${workIndex}].company`}
                name={`workExperience[${workIndex}].company`}
                label="Company"
                value={experience.company}
                onChange={handleChange}
                onBlur={handleBlur}
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id={`workExperience[${workIndex}].position`}
                name={`workExperience[${workIndex}].position`}
                label="Position"
                value={experience.position}
                onChange={handleChange}
                onBlur={handleBlur}
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id={`workExperience[${workIndex}].location`}
                name={`workExperience[${workIndex}].location`}
                label="Location (optional)"
                value={experience.location || ''}
                onChange={handleChange}
                onBlur={handleBlur}
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    id={`workExperience[${workIndex}].startDate`}
                    name={`workExperience[${workIndex}].startDate`}
                    label="Start Date"
                    type="month"
                    value={experience.startDate}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    variant="outlined"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    id={`workExperience[${workIndex}].endDate`}
                    name={`workExperience[${workIndex}].endDate`}
                    label="End Date"
                    type="month"
                    value={experience.endDate}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    variant="outlined"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    placeholder="Present"
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                id={`workExperience[${workIndex}].description`}
                name={`workExperience[${workIndex}].description`}
                label="Job Description"
                value={experience.description}
                onChange={handleChange}
                onBlur={handleBlur}
                variant="outlined"
                multiline
                rows={3}
                placeholder="Describe your responsibilities and day-to-day tasks..."
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                Key Achievements
              </Typography>
              {experience.achievements.map((achievement, achievementIndex) => (
                <Box 
                  key={achievementIndex} 
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    mb: 2 
                  }}
                >
                  <TextField
                    fullWidth
                    value={achievement}
                    onChange={(e) =>
                      handleAchievementChange(workIndex, achievementIndex, e.target.value)
                    }
                    variant="outlined"
                    placeholder={`Achievement ${achievementIndex + 1}`}
                    size="small"
                  />
                  {experience.achievements.length > 1 && (
                    <IconButton
                      size="small"
                      aria-label="delete achievement"
                      onClick={() => removeAchievement(workIndex, achievementIndex)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  )}
                </Box>
              ))}
              <Button
                startIcon={<AddIcon />}
                onClick={() => addAchievement(workIndex)}
                variant="text"
                size="small"
              >
                Add Achievement
              </Button>
            </Grid>
          </Grid>
        </Paper>
      ))}

      <Box sx={{ mt: 2, mb: 2, display: 'flex', justifyContent: 'center' }}>
        <Button
          startIcon={<AddIcon />}
          onClick={addWorkExperience}
          variant="outlined"
          size="medium"
        >
          Add Another Work Experience
        </Button>
      </Box>
    </>
  );
};

export default WorkExperienceForm;