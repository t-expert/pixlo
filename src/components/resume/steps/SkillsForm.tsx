import React, { useState } from 'react';
import {
  Grid,
  TextField,
  Typography,
  Divider,
  Button,
  Box,
  Paper,
  Chip,
  IconButton,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from '@mui/material';
import { FormikProps } from 'formik';
import { ResumeData, Skill, Project } from '../../../types/resume';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

interface SkillsFormProps {
  formik: FormikProps<Partial<ResumeData>>;
}

const SkillsForm: React.FC<SkillsFormProps> = ({ formik }) => {
  const { values, setFieldValue } = formik;
  const skills = values.skills || [];
  const projects = values.projects || [];

  // State for the new skill input
  const [newSkill, setNewSkill] = useState('');
  const [newSkillLevel, setNewSkillLevel] = useState<'Beginner' | 'Intermediate' | 'Advanced' | 'Expert' | ''>('');
  const [newProject, setNewProject] = useState<Partial<Project>>({
    title: '',
    description: '',
    technologies: [],
    url: '',
  });
  const [newTechnology, setNewTechnology] = useState('');

  const handleAddSkill = () => {
    if (newSkill.trim()) {
      const skill: Skill = {
        name: newSkill.trim(),
        level: (newSkillLevel as 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert') || undefined,
      };
      setFieldValue('skills', [...skills, skill]);
      setNewSkill('');
      setNewSkillLevel('');
    }
  };

  const handleRemoveSkill = (index: number) => {
    const updatedSkills = [...skills];
    updatedSkills.splice(index, 1);
    setFieldValue('skills', updatedSkills);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && newSkill.trim()) {
      e.preventDefault();
      handleAddSkill();
    }
  };

  const handleAddProject = () => {
    if (newProject.title && newProject.description) {
      setFieldValue('projects', [
        ...projects,
        {
          ...newProject,
          technologies: newProject.technologies || [],
        },
      ]);
      setNewProject({
        title: '',
        description: '',
        technologies: [],
        url: '',
      });
    }
  };

  const handleRemoveProject = (index: number) => {
    const updatedProjects = [...projects];
    updatedProjects.splice(index, 1);
    setFieldValue('projects', updatedProjects);
  };

  const handleAddTechnology = () => {
    if (newTechnology.trim()) {
      setNewProject({
        ...newProject,
        technologies: [...(newProject.technologies || []), newTechnology.trim()],
      });
      setNewTechnology('');
    }
  };

  const handleRemoveTechnology = (index: number) => {
    const updatedTechnologies = [...(newProject.technologies || [])];
    updatedTechnologies.splice(index, 1);
    setNewProject({
      ...newProject,
      technologies: updatedTechnologies,
    });
  };

  const handleTechKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && newTechnology.trim()) {
      e.preventDefault();
      handleAddTechnology();
    }
  };

  return (
    <Grid container spacing={4}>
      {/* Skills Section */}
      <Grid item xs={12}>
        <Typography variant="h5" gutterBottom>
          Skills
        </Typography>
        <Divider sx={{ mb: 3 }} />
        <Typography variant="body1" paragraph>
          Add your relevant skills. These will be analyzed against the job description to optimize your resume.
        </Typography>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
          {skills.map((skill, index) => (
            <Chip
              key={index}
              label={`${skill.name}${skill.level ? ` (${skill.level})` : ''}`}
              onDelete={() => handleRemoveSkill(index)}
              color="primary"
              variant="outlined"
            />
          ))}
        </Box>

        <Grid container spacing={2} alignItems="flex-end">
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Add a Skill"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="e.g., JavaScript, Project Management, SEO"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Proficiency Level (optional)</InputLabel>
              <Select
                value={newSkillLevel}
                onChange={(e) => setNewSkillLevel(e.target.value as any)}
                label="Proficiency Level (optional)"
              >
                <MenuItem value="">None</MenuItem>
                <MenuItem value="Beginner">Beginner</MenuItem>
                <MenuItem value="Intermediate">Intermediate</MenuItem>
                <MenuItem value="Advanced">Advanced</MenuItem>
                <MenuItem value="Expert">Expert</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={2}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleAddSkill}
              disabled={!newSkill.trim()}
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </Grid>

      {/* Projects Section */}
      <Grid item xs={12} sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Projects
        </Typography>
        <Divider sx={{ mb: 3 }} />
        <Typography variant="body1" paragraph>
          Add relevant projects that showcase your skills and experience.
        </Typography>
      </Grid>

      {/* Existing Projects */}
      {projects.map((project, projectIndex) => (
        <Grid item xs={12} key={projectIndex}>
          <Paper elevation={2} sx={{ p: 3, position: 'relative' }}>
            <IconButton
              size="small"
              aria-label="delete"
              onClick={() => handleRemoveProject(projectIndex)}
              sx={{ position: 'absolute', top: 8, right: 8 }}
            >
              <DeleteIcon />
            </IconButton>

            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography variant="subtitle1" fontWeight="bold">
                  {project.title}
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="body2">
                  {project.description}
                </Typography>
              </Grid>

              {project.url && (
                <Grid item xs={12}>
                  <Typography variant="body2" color="primary">
                    {project.url}
                  </Typography>
                </Grid>
              )}

              <Grid item xs={12}>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {project.technologies.map((tech, techIndex) => (
                    <Chip key={techIndex} label={tech} size="small" />
                  ))}
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      ))}

      {/* Add New Project */}
      <Grid item xs={12}>
        <Paper elevation={2} sx={{ p: 3, bgcolor: 'background.default' }}>
          <Typography variant="subtitle1" gutterBottom>
            Add a New Project
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Project Title"
                value={newProject.title}
                onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                variant="outlined"
                placeholder="e.g., E-commerce Website, Mobile App"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Project URL (optional)"
                value={newProject.url}
                onChange={(e) => setNewProject({ ...newProject, url: e.target.value })}
                variant="outlined"
                placeholder="e.g., https://github.com/username/project"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Project Description"
                value={newProject.description}
                onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                variant="outlined"
                multiline
                rows={3}
                placeholder="Describe the project, your role, and the impact it had..."
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="subtitle2" gutterBottom>
                Technologies Used
              </Typography>

              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
                {(newProject.technologies || []).map((tech, techIndex) => (
                  <Chip
                    key={techIndex}
                    label={tech}
                    onDelete={() => handleRemoveTechnology(techIndex)}
                    size="small"
                  />
                ))}
              </Box>

              <Grid container spacing={2}>
                <Grid item xs={10}>
                  <TextField
                    fullWidth
                    label="Add Technology"
                    value={newTechnology}
                    onChange={(e) => setNewTechnology(e.target.value)}
                    onKeyPress={handleTechKeyPress}
                    variant="outlined"
                    size="small"
                    placeholder="e.g., React, Python, AWS"
                  />
                </Grid>
                <Grid item xs={2}>
                  <Button
                    fullWidth
                    variant="outlined"
                    size="medium"
                    onClick={handleAddTechnology}
                    disabled={!newTechnology.trim()}
                  >
                    Add
                  </Button>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddProject}
                disabled={!newProject.title || !newProject.description}
                startIcon={<AddIcon />}
              >
                Add Project
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default SkillsForm;