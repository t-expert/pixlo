import React from 'react';
import { 
  Box, 
  Paper, 
  Typography, 
  Divider, 
  Grid, 
  List, 
  ListItem, 
  ListItemText,
  Stack,
  Chip
} from '@mui/material';
import { ResumeData } from '../../types/resume';

interface ResumePreviewProps {
  resume: ResumeData;
}

const ResumePreview: React.FC<ResumePreviewProps> = ({ resume }) => {
  const { personalInfo, workExperience, education, skills, projects } = resume;

  return (
    <Paper 
      elevation={3} 
      sx={{ 
        p: 4, 
        maxWidth: 900, 
        mx: 'auto',
        bgcolor: '#fff',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Box 
        sx={{ 
          position: 'absolute', 
          top: 0, 
          right: 0, 
          bgcolor: 'primary.main',
          color: 'white',
          py: 1,
          px: 3,
          transform: 'rotate(45deg) translate(30%, -50%)',
          transformOrigin: 'top right',
          fontSize: '0.8rem',
          fontWeight: 'bold',
          zIndex: 1,
          boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
        }}
      >
        ATS Optimized
      </Box>

      {/* Header / Personal Info */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
          {personalInfo.firstName} {personalInfo.lastName}
        </Typography>
        
        <Grid container spacing={2} sx={{ fontSize: '0.9rem' }}>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              📧 {personalInfo.email}
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              📱 {personalInfo.phone}
            </Box>
          </Grid>
          {personalInfo.linkedin && (
            <Grid item xs={12} sm={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                🔗 {personalInfo.linkedin}
              </Box>
            </Grid>
          )}
          {personalInfo.github && (
            <Grid item xs={12} sm={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                💻 {personalInfo.github}
              </Box>
            </Grid>
          )}
          {(personalInfo.city || personalInfo.state) && (
            <Grid item xs={12} sm={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                📍 {[personalInfo.city, personalInfo.state].filter(Boolean).join(', ')}
              </Box>
            </Grid>
          )}
        </Grid>
      </Box>

      {/* Professional Summary */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
          Professional Summary
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="body1">{personalInfo.summary}</Typography>
      </Box>

      {/* Work Experience */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
          Work Experience
        </Typography>
        <Divider sx={{ mb: 2 }} />
        
        {workExperience.map((job, index) => (
          <Box key={index} sx={{ mb: index < workExperience.length - 1 ? 3 : 0 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                {job.position}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {job.startDate} - {job.endDate || 'Present'}
              </Typography>
            </Box>
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
                {job.company}{job.location ? `, ${job.location}` : ''}
              </Typography>
            </Box>
            
            <Typography variant="body2" paragraph>
              {job.description}
            </Typography>
            
            <List dense disablePadding>
              {job.achievements.filter(a => a.trim()).map((achievement, achievementIndex) => (
                <ListItem key={achievementIndex} sx={{ py: 0 }}>
                  <ListItemText 
                    primary={<Typography variant="body2">• {achievement}</Typography>} 
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        ))}
      </Box>

      {/* Education */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
          Education
        </Typography>
        <Divider sx={{ mb: 2 }} />
        
        {education.map((edu, index) => (
          <Box key={index} sx={{ mb: index < education.length - 1 ? 3 : 0 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                {edu.degree} in {edu.field}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {edu.startDate} - {edu.endDate || 'Present'}
              </Typography>
            </Box>
            
            <Typography variant="body2" sx={{ fontStyle: 'italic', mb: 1 }}>
              {edu.institution}
            </Typography>
            
            {edu.description && (
              <Typography variant="body2">{edu.description}</Typography>
            )}
          </Box>
        ))}
      </Box>

      {/* Skills */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
          Skills
        </Typography>
        <Divider sx={{ mb: 2 }} />
        
        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
          {skills.map((skill, index) => (
            <Chip 
              key={index} 
              label={skill.name} 
              variant="outlined" 
              sx={{ 
                mb: 1,
                bgcolor: skill.name.includes('AI-enhanced') 
                  ? 'rgba(63, 81, 181, 0.1)' 
                  : undefined
              }} 
            />
          ))}
        </Stack>
      </Box>

      {/* Projects (if available) */}
      {projects && projects.length > 0 && (
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
            Projects
          </Typography>
          <Divider sx={{ mb: 2 }} />
          
          {projects.map((project, index) => (
            <Box key={index} sx={{ mb: index < projects.length - 1 ? 3 : 0 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                  {project.title}
                </Typography>
                {project.startDate && (
                  <Typography variant="body2" color="text.secondary">
                    {project.startDate} - {project.endDate || 'Present'}
                  </Typography>
                )}
              </Box>
              
              <Typography variant="body2" paragraph>
                {project.description}
              </Typography>
              
              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                {project.technologies.map((tech, techIndex) => (
                  <Chip 
                    key={techIndex} 
                    label={tech} 
                    size="small" 
                    variant="outlined" 
                    sx={{ mb: 1 }} 
                  />
                ))}
              </Stack>
            </Box>
          ))}
        </Box>
      )}

      {/* Additional sections from AI generation */}
      {resume.additionalInfo && resume.additionalInfo.length > 0 && (
        <Box>
          {resume.additionalInfo.map((section, index) => (
            <Box key={index} sx={{ mb: 4 }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                {section.title}
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Typography variant="body2">{section.content}</Typography>
            </Box>
          ))}
        </Box>
      )}

      {/* ATS Optimization Indicator */}
      <Box 
        sx={{ 
          mt: 5,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          opacity: 0.6
        }}
      >
        <Box 
          sx={{ 
            display: 'flex', 
            alignItems: 'center',
            border: '1px solid',
            borderColor: 'primary.main',
            p: 1,
            px: 2,
            borderRadius: 2,
            fontSize: '0.8rem',
            color: 'primary.main'
          }}
        >
          <Box component="span" sx={{ fontWeight: 'bold', mr: 1 }}>✓ ATS OPTIMIZED</Box>
          This resume has been optimized for Applicant Tracking Systems
        </Box>
      </Box>
    </Paper>
  );
};

export default ResumePreview;