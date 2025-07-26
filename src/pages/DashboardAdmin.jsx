import React, { useState, useContext } from 'react';
import { EventContext } from './EventContext';
import './AdminDashboard.css';

// Custom Material-UI-like components
const Box = ({ children, className = '', ...props }) => (
  <div className={className} {...props}>
    {children}
  </div>
);

const Container = ({ children, maxWidth = 'lg', className = '' }) => (
  <div className={`container ${maxWidth} ${className}`}>
    {children}
  </div>
);

const Grid = ({ children, container, item, spacing = 0, className = '' }) => {
  if (container) {
    return (
      <div className={`grid-container spacing-${spacing} ${className}`}>
        {children}
      </div>
    );
  }

  if (item) {
    return <div className={`grid-item ${className}`}>{children}</div>;
  }

  return <div className={className}>{children}</div>;
};

const Typography = ({ children, variant = 'body1', component, gutterBottom, color, className = '' }) => {
  const Tag = component || (variant.startsWith('h') ? variant : 'p');
  const { events } = useContext(EventContext);

  return (
    <Tag className={`typography ${variant} ${gutterBottom ? 'gutter-bottom' : ''} ${color ? `color-${color}` : ''} ${className}`}>
      {children}
    </Tag>
  );
};

const Card = ({ children, className = '', onMouseEnter, onMouseLeave }) => (
  <div className={`mui-card ${className}`} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
    {children}
  </div>
);

const CardContent = ({ children, className = '' }) => (
  <div className={`card-content ${className}`}>
    {children}
  </div>
);

const CardActions = ({ children, className = '' }) => (
  <div className={`card-actions ${className}`}>
    {children}
  </div>
);

const Button = ({ children, variant = 'text', color = 'primary', component = 'button', href, className = '', ...props }) => {
  if (component === 'a' && href) {
    return (
      <a href={href} className={`mui-button ${variant} ${color} ${className}`} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button className={`mui-button ${variant} ${color} ${className}`} {...props}>
      {children}
    </button>
  );
};

// Icon components
const Assignment = ({ className = '' }) => (
  <svg className={`icon ${className}`} fill="currentColor" viewBox="0 0 24 24" width="40" height="40">
    <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
  </svg>
);

const Event = ({ className = '' }) => (
  <svg className={`icon ${className}`} fill="currentColor" viewBox="0 0 24 24" width="40" height="40">
    <path d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z"/>
  </svg>
);

const Description = ({ className = '' }) => (
  <svg className={`icon ${className}`} fill="currentColor" viewBox="0 0 24 24" width="40" height="40">
    <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
  </svg>
);

const Receipt = ({ className = '' }) => (
  <svg className={`icon ${className}`} fill="currentColor" viewBox="0 0 24 24" width="40" height="40">
    <path d="M18,17H6V5H18M18,3H6A2,2 0 0,0 4,5V17A2,2 0 0,0 6,19H18A2,2 0 0,0 20,17V5A2,2 0 0,0 18,3Z"/>
  </svg>
);

const Person = ({ className = '' }) => (
  <svg className={`icon ${className}`} fill="currentColor" viewBox="0 0 24 24" width="40" height="40">
    <path d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z"/>
  </svg>
);

const Group = ({ className = '' }) => (
  <svg className={`icon ${className}`} fill="currentColor" viewBox="0 0 24 24" width="40" height="40">
    <path d="M16,4C16.88,4 17.67,4.38 18.22,5C18.78,4.38 19.56,4 20.44,4A2.56,2.56 0 0,1 23,6.56C23,7.25 22.22,8 21.33,8H18.67C17.78,8 17,7.25 17,6.56C17,5.38 17,5.38 17,5.38C17,4.62 16.38,4 15.56,4M12,6A3,3 0 0,1 15,9A3,3 0 0,1 12,12A3,3 0 0,1 9,9A3,3 0 0,1 12,6M6,8A2,2 0 0,1 8,10A2,2 0 0,1 6,12A2,2 0 0,1 4,10A2,2 0 0,1 6,8M12,15C16.42,15 20,16.79 20,19V21H4V19C4,16.79 7.58,15 12,15M6,14C8.67,14 10.67,14.67 10.67,15.33V16H1.33V15.33C1.33,14.67 3.33,14 6,14Z"/>
  </svg>
);

const DashboardAdmin = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [studentData, setStudentData] = useState({
    name: '',
    mobile: '',
    rollNumber: '',
    department: '',
    password: '',
    semester: ''
  });
  const [error, setError] = useState('');
  const { events } = useContext(EventContext);

  // Complaints State
  const [complaints, setComplaints] = useState(() => {
    const stored = localStorage.getItem('complaints');
    return stored ? JSON.parse(stored) : [];
  });
  // Status update modal
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [statusModalOpen, setStatusModalOpen] = useState(false);

  // Segregate complaints
  const pendingComplaints = complaints.filter(c => c.status === 'Pending');
  const inProgressComplaints = complaints.filter(c => c.status === 'In Progress');
  const resolvedComplaints = complaints.filter(c => c.status === 'Resolved');

  // Status update handler
  const handleStatusChange = (id, newStatus) => {
    const updated = complaints.map(c => c.id === id ? { ...c, status: newStatus } : c);
    setComplaints(updated);
    localStorage.setItem('complaints', JSON.stringify(updated));
    setStatusModalOpen(false);
    setSelectedComplaint(null);
  };

  // Open status modal
  const openStatusModal = (complaint) => {
    setSelectedComplaint(complaint);
    setStatusModalOpen(true);
  };

  // Close status modal
  const closeStatusModal = () => {
    setStatusModalOpen(false);
    setSelectedComplaint(null);
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    console.log('Registering student:', studentData); // Debug log

    // Basic validation
    if (!studentData.name || !studentData.mobile || !studentData.rollNumber || !studentData.department || !studentData.password || !studentData.semester) {
      setError('Please fill in all required fields');
      return;
    }
    if (studentData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    // Save to localStorage
    const students = JSON.parse(localStorage.getItem('students') || '[]');
    const studentExists = students.some((s) => s.rollNumber === studentData.rollNumber);
    if (studentExists) {
      setError('Student with this roll number already exists');
      return;
    }

    students.push(studentData);
    localStorage.setItem('students', JSON.stringify(students));
    console.log('Student saved to localStorage:', studentData); // Debug log

    setIsRegisterModalOpen(false);
    setStudentData({ name: '', mobile: '', rollNumber: '', department: '', password: '', semester: '' });
    setError('');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(`Updating ${name} to: ${value}`); // Debug log
    setStudentData((prev) => ({
      ...prev,
      [name]: value
    }));
    setError(''); // Clear error on input change
  };

  const quickActions = [
    {
      id: 1,
      icon: Assignment,
      title: 'Register Student',
      description: 'Add, edit, and register student',
      link: '/courses',
      color: 'primary',
      gradient: 'gradient-primary',
      onClick: () => setIsRegisterModalOpen(true)
    },
    {
      id: 2,
      icon: Event,
      title: 'Manage Events',
      description: 'Create and manage campus events',
      link: '/events',
      color: 'success',
      gradient: 'gradient-success'
    },
    {
      id: 3,
      icon: Description,
      title: 'Manage Complaints',
      description: 'View and resolve student complaints',
      link: '/complaints/admin',
      color: 'warning',
      gradient: 'gradient-warning',
      onClick: () => { window.location.href = '/complaints/admin'; }
    }
  ];

  const statistics = [
    {
      id: 1,
      icon: Person,
      count: '5,000+',
      label: 'Students',
      color: 'error',
      gradient: 'gradient-error'
    },
    {
      id: 2,
      icon: Group,
      count: '150+',
      label: 'Courses',
      color: 'secondary',
      gradient: 'gradient-secondary'
    },
    {
      id: 3,
      icon: Receipt,
      count: '50+',
      label: 'Departments',
      color: 'info',
      gradient: 'gradient-info'
    },
    {
      id: 4,
      icon: Event,
      count: '100+',
      label: 'Events',
      color: 'neutral',
      gradient: 'gradient-neutral'
    }
  ];

  return (
    <Box className="dashboard-wrapper">
      {/* Enhanced Header */}
      <Box className="header-gradient">
        <Container maxWidth="lg">
          <div className="floating-animation">
            <Typography variant="h4" component="h1" gutterBottom className="header-title">
              🚀 Admin Dashboard
            </Typography>
            <Typography variant="subtitle1" className="header-subtitle">
              Welcome back, <strong>Admin</strong>! Ready to manage your institution? ✨
            </Typography>
          </div>
        </Container>
      </Box>

      {/* Enhanced Quick Actions */}
      <Container maxWidth="lg" className="quick-actions-section">
        <Typography variant="h5" gutterBottom className="section-title">
          🎯 Quick Actions
        </Typography>
        <Grid container spacing={3}>
          {quickActions.map((action) => {
            const IconComponent = action.icon;
            return (
              <Grid item xs={12} md={4} key={action.id}>
                <Card
                  className={`quick-action-card ${hoveredCard === action.id ? `hovered ${action.color}` : ''}`}
                  onMouseEnter={() => setHoveredCard(action.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <CardContent className="card-content-center">
                    <div className={`icon-container pulse-animation ${action.gradient}`}>
                      <IconComponent className="icon-white" />
                    </div>
                    <Typography variant="h6" gutterBottom className="card-title">
                      {action.title}
                    </Typography>
                    <Typography color="text.secondary" className="card-description">
                      {action.description}
                    </Typography>
                  </CardContent>
                  <CardActions className="card-actions-center">
                    {action.onClick ? (
                      <Button onClick={action.onClick} variant="contained" className={`action-button ${action.gradient}`}>
                        {action.title}
                      </Button>
                    ) : (
                      <Button component="a" href={action.link} variant="contained" className={`action-button ${action.gradient}`}>
                        {action.title}
                      </Button>
                    )}
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Container>

      {/* Enhanced Statistics */}
      <Box className="statistics-section">
        <Container maxWidth="lg">
          <Typography variant="h5" gutterBottom className="section-title">
            📊 Campus Statistics
          </Typography>
          <Grid container spacing={3}>
            {statistics.map((stat) => {
              const IconComponent = stat.icon;
              return (
                <Grid item xs={12} md={3} key={stat.id}>
                  <Card className="stat-card">
                    <CardContent className="card-content-center">
                      <div className={`icon-container floating-animation ${stat.gradient}`}>
                        <IconComponent className="icon-white" />
                      </div>
                      <div className="stat-number">
                        {stat.count}
                      </div>
                      <Typography color="text.secondary" className="stat-label">
                        {stat.label}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Container>
      </Box>

      {/* Student Registration Modal */}
      {isRegisterModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button
              onClick={() => setIsRegisterModalOpen(false)}
              className="modal-close-button"
            >
              <svg className="modal-close-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <form onSubmit={handleRegisterSubmit} className="modal-form">
              <Typography variant="h5" className="modal-title">
                Register New Student
              </Typography>
              {error && (
                <Typography color="error" className="error-message">
                  {error}
                </Typography>
              )}
              <div className="form-group">
                <label className="form-label">Student Name</label>
                <input
                  type="text"
                  name="name"
                  value={studentData.name}
                  onChange={handleInputChange}
                  required
                  className="form-input"
                  placeholder="Enter student name"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Mobile Number</label>
                <input
                  type="tel"
                  name="mobile"
                  value={studentData.mobile}
                  onChange={handleInputChange}
                  required
                  className="form-input"
                  placeholder="Enter mobile number"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Roll Number</label>
                <input
                  type="text"
                  name="rollNumber"
                  value={studentData.rollNumber}
                  onChange={handleInputChange}
                  required
                  className="form-input"
                  placeholder="Enter roll number"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Department</label>
                <select
                  name="department"
                  value={studentData.department}
                  onChange={handleInputChange}
                  required
                  className="form-input"
                >
                  <option value="">Select Department</option>
                  <option value="Computer Science">Computer Science</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Mechanical">Mechanical</option>
                  <option value="Civil">Civil</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  name="password"
                  value={studentData.password}
                  onChange={handleInputChange}
                  required
                  className="form-input"
                  placeholder="Enter password (min 6 characters)"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Semester</label>
                <select
                  name="semester"
                  value={studentData.semester}
                  onChange={handleInputChange}
                  required
                  className="form-input"
                >
                  <option value="">Select Semester</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                </select>
              </div>
              <div className="form-actions">
                <Button
                  onClick={() => setIsRegisterModalOpen(false)}
                  variant="text"
                  color="secondary"
                  className="cancel-button"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className="submit-button gradient-primary"
                >
                  Register Student
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    {/* Complaints Management Section removed as requested */}
    {/* Event List Section */}
    <Container maxWidth="lg" className="event-list-section">
      <Typography variant="h5" gutterBottom className="section-title">
        📅 All Events
      </Typography>
      {events.length === 0 ? (
        <Typography variant="body1" color="text.secondary">
          No events available.
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {[...events].reverse().map((event) => (
            <Grid item xs={12} md={4} key={event.id}>
              <Card className="event-card floating-animation">
                <CardContent className="card-content">
                  <Typography variant="h6" gutterBottom className="card-title">
                    {event.name}
                  </Typography>
                  <Typography color="text.secondary" className="card-description">
                    <strong>Date:</strong> {event.date ? new Date(event.date).toLocaleDateString() : ''}
                  </Typography>
                  <Typography color="text.secondary" className="card-description">
                    <strong>Description:</strong> {event.description}
                  </Typography>
                  <Typography color="text.secondary" className="card-description">
                    <strong>Location:</strong> {event.location}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  </Box>
  );
};

export default DashboardAdmin;