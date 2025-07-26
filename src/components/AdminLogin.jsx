
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Container, TextField, Button, Typography } from '@mui/material';
import { apiFetch } from '../api';

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    username: 'admin',
    password: 'admin'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.password) {
      alert('Please fill in all required fields');
      return;
    }
    try {
      // Call backend for admin login
      const data = await apiFetch('/api/admin/login', {
        method: 'POST',
        body: JSON.stringify(formData)
      });
      // Store admin data in localStorage
      localStorage.setItem('user', JSON.stringify({
        role: 'admin',
        username: data.username || formData.username
      }));
      navigate('/dashboard/admin');
    } catch (err) {
      alert('Invalid username or password');
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Container maxWidth="sm">
        <Box sx={{ p: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Admin Login
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              value={formData.username}
              onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
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
              onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Admin Login
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default AdminLogin;
