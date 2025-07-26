import React, { useState, useContext } from 'react';
import { EventContext } from '../pages/EventContext';
import './AdminDashboard.css';

const EventManagement = ({ onClose }) => {
  const { events, addEvent } = useContext(EventContext);
  const [newEvent, setNewEvent] = useState({
    name: '',
    date: '',
    description: '',
    location: '',
  });
  const [editEvent, setEditEvent] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCreateEvent = () => {
    if (!newEvent.name || !newEvent.date) {
      alert('Please fill in all required fields');
      return;
    }
    addEvent(newEvent);
    setNewEvent({ name: '', date: '', description: '', location: '' });
  };

  const handleUpdateEvent = () => {
    if (!editEvent) return;
    const updated = events.map(event => event.id === editEvent.id ? { ...editEvent } : event);
    localStorage.setItem('events', JSON.stringify(updated));
    window.location.reload(); // Quick fix to update context everywhere
  };

  const handleDeleteEvent = (eventId) => {
    const updated = events.filter(event => event.id !== eventId);
    localStorage.setItem('events', JSON.stringify(updated));
    window.location.reload(); // Quick fix to update context everywhere
  };

  const handleEditEvent = (event) => {
    setEditEvent(event);
    setNewEvent({
      ...event
    });
  };

return (
  <div className="modal-overlay">
    <div className="modal-content">
      <button
        onClick={onClose}
        className="modal-close-button"
      >
        <svg className="modal-close-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <Typography variant="h5" className="modal-title">
        Event Management
      </Typography>
      <div className="modal-form">
        <div className="form-group">
          <label className="form-label">Event Name *</label>
          <input
            type="text"
            name="name"
            value={newEvent.name}
            onChange={handleInputChange}
            className="form-input"
            placeholder="Enter event name"
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Date *</label>
          <input
            type="date"
            name="date"
            value={newEvent.date}
            onChange={handleInputChange}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Description</label>
          <textarea
            name="description"
            value={newEvent.description}
            onChange={handleInputChange}
            className="form-input"
            placeholder="Enter event description"
            rows={3}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Location</label>
          <input
            type="text"
            name="location"
            value={newEvent.location}
            onChange={handleInputChange}
            className="form-input"
            placeholder="Enter event location"
          />
        </div>
        <div className="form-actions">
          <button onClick={onClose} className="cancel-button">Cancel</button>
          {editEvent ? (
            <button onClick={handleUpdateEvent} className="submit-button gradient-primary">Update Event</button>
          ) : (
            <button onClick={handleCreateEvent} className="submit-button gradient-primary">Create Event</button>
          )}
        </div>
      </div>

      {/* Professional Event List for Admins */}
      <div style={{ marginTop: 32 }}>
        <Typography variant="h6" className="events-list-title" sx={{ fontWeight: 700, color: '#1976d2', mb: 2 }}>
          All Posted Events
        </Typography>
        {events.length === 0 ? (
          <Typography color="text.secondary" sx={{ fontSize: 18, textAlign: 'center', mt: 2 }}>
            No events have been posted yet.
          </Typography>
        ) : (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24 }}>
            {[...events].reverse().map((event) => (
              <div key={event.id} style={{
                minWidth: 320,
                maxWidth: 400,
                background: 'linear-gradient(120deg, #f8fafc 60%, #e3eafc 100%)',
                borderRadius: 16,
                boxShadow: '0 4px 24px rgba(60,72,100,0.10)',
                marginBottom: 24,
                padding: 24,
                transition: 'transform 0.2s',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                border: '1px solid #e3eafc',
                position: 'relative',
              }}>
                <div>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: '#1976d2', mb: 1 }}>
                    {event.name}
                  </Typography>
                  <Typography color="text.secondary" sx={{ mb: 1, fontSize: 15 }}>
                    <strong>Date:</strong> {event.date ? new Date(event.date).toLocaleDateString() : ''}
                  </Typography>
                  <Typography color="text.secondary" sx={{ mb: 1, fontSize: 15 }}>
                    <strong>Description:</strong> {event.description}
                  </Typography>
                  <Typography color="text.secondary" sx={{ fontSize: 15 }}>
                    <strong>Location:</strong> {event.location}
                  </Typography>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  </div>
);
};

export default EventManagement;
