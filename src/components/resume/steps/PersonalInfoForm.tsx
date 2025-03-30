import React from 'react';
import {
  Grid,
  TextField,
  Typography,
  Divider,
} from '@mui/material';
import { FormikProps } from 'formik';
import { ResumeData, PersonalInfo } from '../../../types/resume';

interface PersonalInfoFormProps {
  formik: FormikProps<Partial<ResumeData>>;
}

const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({ formik }) => {
  const { values, handleChange, handleBlur, touched, errors } = formik;
  const personalInfo = values.personalInfo || {} as PersonalInfo;

  // For TypeScript to correctly recognize the nested properties
  type NestedTouched = {
    personalInfo?: {
      firstName?: boolean;
      lastName?: boolean;
      email?: boolean;
      phone?: boolean;
      linkedin?: boolean;
      github?: boolean;
      address?: boolean;
      city?: boolean;
      state?: boolean;
      summary?: boolean;
    };
  };

  type NestedErrors = {
    personalInfo?: {
      firstName?: string;
      lastName?: string;
      email?: string;
      phone?: string;
      linkedin?: string;
      github?: string;
      address?: string;
      city?: string;
      state?: string;
      summary?: string;
    };
  };
  
  // Cast the touched and errors objects to our more specific types
  const touchedFields = touched as unknown as NestedTouched;
  const errorFields = errors as unknown as NestedErrors;

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h5" gutterBottom>
          Personal Information
        </Typography>
        <Divider sx={{ mb: 3 }} />
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          id="personalInfo.firstName"
          name="personalInfo.firstName"
          label="First Name"
          value={personalInfo.firstName || ''}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touchedFields.personalInfo?.firstName && Boolean(errorFields.personalInfo?.firstName)}
          helperText={touchedFields.personalInfo?.firstName && errorFields.personalInfo?.firstName}
          variant="outlined"
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          id="personalInfo.lastName"
          name="personalInfo.lastName"
          label="Last Name"
          value={personalInfo.lastName || ''}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touchedFields.personalInfo?.lastName && Boolean(errorFields.personalInfo?.lastName)}
          helperText={touchedFields.personalInfo?.lastName && errorFields.personalInfo?.lastName}
          variant="outlined"
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          id="personalInfo.email"
          name="personalInfo.email"
          label="Email"
          value={personalInfo.email || ''}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touchedFields.personalInfo?.email && Boolean(errorFields.personalInfo?.email)}
          helperText={touchedFields.personalInfo?.email && errorFields.personalInfo?.email}
          variant="outlined"
          type="email"
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          id="personalInfo.phone"
          name="personalInfo.phone"
          label="Phone"
          value={personalInfo.phone || ''}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touchedFields.personalInfo?.phone && Boolean(errorFields.personalInfo?.phone)}
          helperText={touchedFields.personalInfo?.phone && errorFields.personalInfo?.phone}
          variant="outlined"
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          id="personalInfo.linkedin"
          name="personalInfo.linkedin"
          label="LinkedIn URL (optional)"
          value={personalInfo.linkedin || ''}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touchedFields.personalInfo?.linkedin && Boolean(errorFields.personalInfo?.linkedin)}
          helperText={touchedFields.personalInfo?.linkedin && errorFields.personalInfo?.linkedin}
          variant="outlined"
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          id="personalInfo.github"
          name="personalInfo.github"
          label="GitHub URL (optional)"
          value={personalInfo.github || ''}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touchedFields.personalInfo?.github && Boolean(errorFields.personalInfo?.github)}
          helperText={touchedFields.personalInfo?.github && errorFields.personalInfo?.github}
          variant="outlined"
        />
      </Grid>

      <Grid item xs={12}>
        <TextField
          fullWidth
          id="personalInfo.address"
          name="personalInfo.address"
          label="Address (optional)"
          value={personalInfo.address || ''}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touchedFields.personalInfo?.address && Boolean(errorFields.personalInfo?.address)}
          helperText={touchedFields.personalInfo?.address && errorFields.personalInfo?.address}
          variant="outlined"
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          id="personalInfo.city"
          name="personalInfo.city"
          label="City (optional)"
          value={personalInfo.city || ''}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touchedFields.personalInfo?.city && Boolean(errorFields.personalInfo?.city)}
          helperText={touchedFields.personalInfo?.city && errorFields.personalInfo?.city}
          variant="outlined"
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          id="personalInfo.state"
          name="personalInfo.state"
          label="State (optional)"
          value={personalInfo.state || ''}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touchedFields.personalInfo?.state && Boolean(errorFields.personalInfo?.state)}
          helperText={touchedFields.personalInfo?.state && errorFields.personalInfo?.state}
          variant="outlined"
        />
      </Grid>

      <Grid item xs={12}>
        <TextField
          fullWidth
          id="personalInfo.summary"
          name="personalInfo.summary"
          label="Professional Summary"
          value={personalInfo.summary || ''}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touchedFields.personalInfo?.summary && Boolean(errorFields.personalInfo?.summary)}
          helperText={touchedFields.personalInfo?.summary && errorFields.personalInfo?.summary}
          variant="outlined"
          multiline
          rows={4}
          placeholder="Write a brief summary highlighting your professional background, key skills, and career goals..."
        />
      </Grid>
    </Grid>
  );
};

export default PersonalInfoForm;