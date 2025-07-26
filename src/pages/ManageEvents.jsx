import React, { useState, useContext } from 'react';
import { EventContext } from './EventContext';
import './AdminDashboard.css';
import { Box, Container, Typography, Button, Grid } from '@mui/material';

const ManageEvents = () => {
  const { events, addEvent, deleteEvent, editEvent } = useContext(EventContext);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({ name: '', date: '', location: '', description: '' });
  const handleEditClick = (event) => {
    setEditingId(event.id);
    setEditData({ name: event.name, date: event.date, location: event.location, description: event.description });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSave = (id) => {
    if (!editData.name || !editData.date || !editData.location || !editData.description) {
      alert('Please fill in all fields');
      return;
    }
    editEvent(id, editData);
    setEditingId(null);
    setEditData({ name: '', date: '', location: '', description: '' });
  };

  const handleEditCancel = () => {
    setEditingId(null);
    setEditData({ name: '', date: '', location: '', description: '' });
  };
  const [eventData, setEventData] = useState({
    name: '',
    date: '',
    location: '',
    description: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!eventData.name || !eventData.date || !eventData.location || !eventData.description) {
      alert('Please fill in all fields');
      return;
    }
    addEvent(eventData);
    setEventData({ name: '', date: '', location: '', description: '' });
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      background: `linear-gradient(135deg, #e0eafc 0%, #e3eafc 100%)`,
      py: 6,
      position: 'relative',
      '::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'url(https://www.transparenttextures.com/patterns/cubes.png)',
        opacity: 0.08,
        zIndex: 0,
      }
    }}>
      {/* Navbar */}
      <Box sx={{
        background: 'rgba(255,255,255,0.95)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(226, 232, 240, 0.8)',
        px: { xs: 2, md: 6 },
        py: { xs: 1, md: 2 },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        minHeight: 72,
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
      }}>
        <span style={{
          fontSize: '2rem',
          fontWeight: 800,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          lineHeight: 1,
          letterSpacing: '1px',
        }}>CampusLink</span>
      </Box>
      {/* Hero Section */}
      <Container maxWidth="lg" sx={{ mb: 6, position: 'relative', zIndex: 1 }}>
        <Box sx={{
          borderRadius: 5,
          boxShadow: 6,
          background: 'rgba(255,255,255,0.98)',
          px: { xs: 2, md: 6 },
          py: { xs: 3, md: 5 },
          mb: 4,
          textAlign: 'center',
        }}>
          <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 800, color: '#1a237e', letterSpacing: 1 }}>
            🎉 Manage Events
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 1, fontWeight: 500 }}>
            Create, view, and manage all campus events in one place
          </Typography>
        </Box>
        {/* Event Form */}
        <Box sx={{
          background: 'linear-gradient(120deg, #f8fafc 60%, #e3eafc 100%)',
          borderRadius: 4,
          boxShadow: 3,
          p: 4,
          mb: 6,
          border: '2px solid #1976d2',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <Box sx={{
            position: 'absolute',
            top: -30,
            right: -30,
            width: 120,
            height: 120,
            background: 'radial-gradient(circle, #1976d2 0%, #e3eafc 80%)',
            opacity: 0.12,
            borderRadius: '50%',
            zIndex: 0,
          }} />
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 700, color: '#3949ab', mb: 2, position: 'relative', zIndex: 1 }}>
            <span role="img" aria-label="sparkle">✨</span> Create New Event
          </Typography>
          <form onSubmit={handleSubmit} className="modal-form" style={{ position: 'relative', zIndex: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={3}>
                <input
                  type="text"
                  name="name"
                  value={eventData.name}
                  onChange={handleInputChange}
                  required
                  className="form-input"
                  placeholder="Event Name"
                  style={{ width: '100%', padding: 14, borderRadius: 10, border: '1.5px solid #b6c7e6', fontSize: 17, background: '#fafdff' }}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <input
                  type="date"
                  name="date"
                  value={eventData.date}
                  onChange={handleInputChange}
                  required
                  className="form-input"
                  style={{ width: '100%', padding: 14, borderRadius: 10, border: '1.5px solid #b6c7e6', fontSize: 17, background: '#fafdff' }}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <input
                  type="text"
                  name="location"
                  value={eventData.location}
                  onChange={handleInputChange}
                  required
                  className="form-input"
                  placeholder="Location"
                  style={{ width: '100%', padding: 14, borderRadius: 10, border: '1.5px solid #b6c7e6', fontSize: 17, background: '#fafdff' }}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <input
                  type="text"
                  name="description"
                  value={eventData.description}
                  onChange={handleInputChange}
                  required
                  className="form-input"
                  placeholder="Description"
                  style={{ width: '100%', padding: 14, borderRadius: 10, border: '1.5px solid #b6c7e6', fontSize: 17, background: '#fafdff' }}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className="submit-button gradient-primary"
                  sx={{ fontWeight: 700, fontSize: 18, px: 4, borderRadius: 3, boxShadow: 2 }}
                >
                  Create Event
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Container>
      {/* Professional Event List for Admins */}
      <Container maxWidth="lg" sx={{ mt: 2, position: 'relative', zIndex: 1 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 800, color: '#1976d2', mb: 4, letterSpacing: 0.5 }}>
          All Posted Events
        </Typography>
        {events.length === 0 ? (
          <Typography color="text.secondary" sx={{ fontSize: 18, textAlign: 'center', mt: 2 }}>
            No events have been posted yet.
          </Typography>
        ) : (
          <Grid container spacing={4}>
            {[...events].reverse().map((event) => (
              <Grid item xs={12} sm={6} md={4} key={event.id}>
                <Box
                  sx={{
                    borderLeft: '7px solid #1976d2',
                    borderRadius: 5,
                    boxShadow: 8,
                    background: 'linear-gradient(120deg, #f8fafc 60%, #e3eafc 100%)',
                    transition: 'transform 0.2s',
                    p: 4,
                    mb: 2,
                    minHeight: 220,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    position: 'relative',
                    overflow: 'visible',
                    '&:hover': {
                      transform: 'translateY(-10px) scale(1.04)',
                      boxShadow: 16,
                    }
                  }}
                >
                  {/* Floating Date Badge */}
                  <Box sx={{
                    position: 'absolute',
                    top: -22,
                    right: 24,
                    background: 'linear-gradient(90deg, #42a5f5 60%, #1976d2 100%)',
                    color: '#fff',
                    borderRadius: 2,
                    px: 2.5,
                    py: 0.7,
                    fontWeight: 700,
                    fontSize: 16,
                    boxShadow: 2,
                    letterSpacing: 0.5,
                    zIndex: 2,
                  }}>
                    {event.date ? new Date(event.date).toLocaleDateString() : ''}
                  </Box>
                  {editingId === event.id ? (
                    <>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, mt: 1 }}>
                        <Box sx={{
                          width: 54,
                          height: 54,
                          borderRadius: '50%',
                          background: 'linear-gradient(135deg, #1976d2 60%, #42a5f5 100%)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mr: 2.5,
                          boxShadow: 4,
                        }}>
                          <span role="img" aria-label="event" style={{ fontSize: 32 }}>📢</span>
                        </Box>
                        <input
                          type="text"
                          name="name"
                          value={editData.name}
                          onChange={handleEditChange}
                          style={{ fontWeight: 800, color: '#1976d2', fontSize: 25, border: '1px solid #b6c7e6', borderRadius: 8, padding: 6, width: '100%' }}
                        />
                      </Box>
                      <input
                        type="date"
                        name="date"
                        value={editData.date}
                        onChange={handleEditChange}
                        style={{ marginBottom: 8, border: '1px solid #b6c7e6', borderRadius: 8, padding: 6, width: '100%' }}
                      />
                      <input
                        type="text"
                        name="location"
                        value={editData.location}
                        onChange={handleEditChange}
                        style={{ marginBottom: 8, border: '1px solid #b6c7e6', borderRadius: 8, padding: 6, width: '100%' }}
                      />
                      <textarea
                        name="description"
                        value={editData.description}
                        onChange={handleEditChange}
                        style={{ marginBottom: 8, border: '1px solid #b6c7e6', borderRadius: 8, padding: 6, width: '100%' }}
                      />
                      <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                        <Button variant="contained" color="primary" onClick={() => handleEditSave(event.id)} sx={{ fontWeight: 700 }}>Save</Button>
                        <Button variant="outlined" color="secondary" onClick={handleEditCancel}>Cancel</Button>
                      </Box>
                    </>
                  ) : (
                    <>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, mt: 1 }}>
                        <Box sx={{
                          width: 54,
                          height: 54,
                          borderRadius: '50%',
                          background: 'linear-gradient(135deg, #1976d2 60%, #42a5f5 100%)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mr: 2.5,
                          boxShadow: 4,
                        }}>
                          <span role="img" aria-label="event" style={{ fontSize: 32 }}>📢</span>
                        </Box>
                        <Typography variant="h5" sx={{ fontWeight: 800, color: '#1976d2', mb: 0, letterSpacing: 0.5, fontSize: 25 }}>
                          {event.name}
                        </Typography>
                      </Box>
                      <Typography color="text.secondary" sx={{ mb: 1, fontSize: 16, minHeight: 40, fontWeight: 500 }}>
                        <strong>Description:</strong> {event.description}
                      </Typography>
                      <Typography color="text.secondary" sx={{ fontSize: 16, fontWeight: 500 }}>
                        <strong>Location:</strong> {event.location}
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                        <Button variant="outlined" color="primary" onClick={() => handleEditClick(event)}>Edit</Button>
                        <Button variant="outlined" color="error" onClick={() => deleteEvent(event.id)}>Delete</Button>
                      </Box>
                    </>
                  )}
                </Box>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default ManageEvents;
