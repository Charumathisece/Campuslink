import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Container, TextField, Button, Typography } from '@mui/material';

const StudentLogin = () => {
  const [formData, setFormData] = useState({
    rollNumber: '',
    password: '',
    role: 'student'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form data
    if (!formData.rollNumber || !formData.password) {
      alert('Please fill in all required fields');
      return;
    }

    // Check credentials against registered students in localStorage
    const students = JSON.parse(localStorage.getItem('students') || '[]');
    const student = students.find(
      (s) => s.rollNumber === formData.rollNumber && s.password === formData.password
    );
    if (student) {
      localStorage.setItem('user', JSON.stringify({
        role: 'student',
        rollNumber: student.rollNumber,
        semester: student.semester,
        name: student.name
      }));
      navigate('/dashboard/student');
    } else {
      alert('Invalid roll number or password');
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Container maxWidth="sm">
        <Box sx={{ p: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Student Login
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="rollNumber"
              label="Roll Number"
              name="rollNumber"
              autoComplete="username"
              autoFocus
              value={formData.rollNumber}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Student Login
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default StudentLogin;
