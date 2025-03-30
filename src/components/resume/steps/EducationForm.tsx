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
import { ResumeData, Education } from '../../../types/resume';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

interface EducationFormProps {
  formik: FormikProps<Partial<ResumeData>>;
}

const EducationForm: React.FC<EducationFormProps> = ({ formik }) => {
  const { values, handleChange, handleBlur, setFieldValue } = formik;
  const educationEntries = values.education || [];

  const addEducation = () => {
    const newEducation: Education = {
      institution: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      description: '',
      gpa: '',
    };
    setFieldValue('education', [...educationEntries, newEducation]);
  };

  const removeEducation = (index: number) => {
    const updatedEducation = [...educationEntries];
    updatedEducation.splice(index, 1);
    setFieldValue('education', updatedEducation);
  };

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom>
            Education
          </Typography>
          <Divider sx={{ mb: 3 }} />
        </Grid>
      </Grid>

      {educationEntries.map((education, eduIndex) => (
        <Paper 
          key={eduIndex} 
          elevation={2} 
          sx={{ p: 3, mb: 3, position: 'relative' }}
        >
          {educationEntries.length > 1 && (
            <IconButton
              size="small"
              aria-label="delete"
              onClick={() => removeEducation(eduIndex)}
              sx={{ position: 'absolute', top: 8, right: 8 }}
            >
              <DeleteIcon />
            </IconButton>
          )}

          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id={`education[${eduIndex}].institution`}
                name={`education[${eduIndex}].institution`}
                label="Institution"
                value={education.institution}
                onChange={handleChange}
                onBlur={handleBlur}
                variant="outlined"
                placeholder="University/College/School Name"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id={`education[${eduIndex}].degree`}
                name={`education[${eduIndex}].degree`}
                label="Degree"
                value={education.degree}
                onChange={handleChange}
                onBlur={handleBlur}
                variant="outlined"
                placeholder="e.g., Bachelor of Science, High School Diploma"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id={`education[${eduIndex}].field`}
                name={`education[${eduIndex}].field`}
                label="Field of Study"
                value={education.field}
                onChange={handleChange}
                onBlur={handleBlur}
                variant="outlined"
                placeholder="e.g., Computer Science, Business Administration"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    id={`education[${eduIndex}].startDate`}
                    name={`education[${eduIndex}].startDate`}
                    label="Start Date"
                    type="month"
                    value={education.startDate}
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
                    id={`education[${eduIndex}].endDate`}
                    name={`education[${eduIndex}].endDate`}
                    label="End Date"
                    type="month"
                    value={education.endDate}
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

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id={`education[${eduIndex}].gpa`}
                name={`education[${eduIndex}].gpa`}
                label="GPA (optional)"
                value={education.gpa || ''}
                onChange={handleChange}
                onBlur={handleBlur}
                variant="outlined"
                placeholder="e.g., 3.8/4.0"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                id={`education[${eduIndex}].description`}
                name={`education[${eduIndex}].description`}
                label="Additional Information (optional)"
                value={education.description}
                onChange={handleChange}
                onBlur={handleBlur}
                variant="outlined"
                multiline
                rows={2}
                placeholder="Relevant coursework, honors, activities, etc."
              />
            </Grid>
          </Grid>
        </Paper>
      ))}

      <Box sx={{ mt: 2, mb: 2, display: 'flex', justifyContent: 'center' }}>
        <Button
          startIcon={<AddIcon />}
          onClick={addEducation}
          variant="outlined"
          size="medium"
        >
          Add Another Education
        </Button>
      </Box>
    </>
  );
};

export default EducationForm;