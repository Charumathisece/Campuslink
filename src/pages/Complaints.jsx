// import React from 'react';
// import { Box, Container, Typography, Card, CardContent, Grid, Button, TextField, FormControl, InputLabel, Select, MenuItem, IconButton, CardActions } from '@mui/material';
// import { Description, Add, Delete, Edit, Send } from '@mui/icons-material';

// const complaintTypes = [
//   'Maintenance',
//   'Academic',
//   'Security',
//   'Transport',
//   'Food',
//   'Other'
// ];

// // Use localStorage for complaints persistence
// function getStoredComplaints() {
//   const stored = localStorage.getItem('complaints');
//   return stored ? JSON.parse(stored) : [];
// }


// const Complaints = () => {
//   const [complaints, setComplaints] = React.useState(getStoredComplaints());
//   const [newComplaint, setNewComplaint] = React.useState({
//     type: '',
//     description: '',
//     department: ''
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewComplaint(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Add student info if available
//     const user = localStorage.getItem('user');
//     let student = {};
//     if (user) {
//       const parsed = JSON.parse(user);
//       student = { studentName: parsed.name || '', studentRoll: parsed.rollNumber || '' };
//     }
//     const complaintToAdd = {
//       ...newComplaint,
//       ...student,
//       id: Date.now(),
//       date: new Date().toISOString().slice(0, 10),
//       status: 'Pending',
//     };
//     const updated = [...complaints, complaintToAdd];
//     setComplaints(updated);
//     localStorage.setItem('complaints', JSON.stringify(updated));
//     setNewComplaint({
//       type: '',
//       description: '',
//       department: ''
//     });
//   };


//   // Determine if user is admin
//   const user = localStorage.getItem('user');
//   let isAdmin = false;
//   if (user) {
//     const parsed = JSON.parse(user);
//     isAdmin = parsed.role === 'admin';
//   }

//   return (
//     <Box>
//       {/* Header */}
//       <Box sx={{ bgcolor: '#f5f5f5', p: 3 }}>
//         <Container>
//           <Typography variant="h4" component="h1" gutterBottom>
//             Complaints
//           </Typography>
//           <Typography variant="subtitle1" color="text.secondary">
//             Report and track campus issues
//           </Typography>
//         </Container>
//       </Box>

//       {/* Show complaint form only for non-admins */}
//       {!isAdmin && (
//         <Container sx={{ py: 4 }}>
//           <Card>
//             <CardContent>
//               <Typography variant="h5" gutterBottom>
//                 Submit New Complaint
//               </Typography>
//               <form onSubmit={handleSubmit}>
//                 <Grid container spacing={3}>
//                   <Grid item xs={12} md={6}>
//                     <FormControl fullWidth>
//                       <InputLabel>Type</InputLabel>
//                       <Select
//                         name="type"
//                         value={newComplaint.type}
//                         onChange={handleInputChange}
//                         label="Type"
//                       >
//                         {complaintTypes.map((type) => (
//                           <MenuItem key={type} value={type}>
//                             {type}
//                           </MenuItem>
//                         ))}
//                       </Select>
//                     </FormControl>
//                   </Grid>
//                   <Grid item xs={12} md={6}>
//                     <TextField
//                       fullWidth
//                       name="department"
//                       label="Department"
//                       value={newComplaint.department}
//                       onChange={handleInputChange}
//                     />
//                   </Grid>
//                   <Grid item xs={12}>
//                     <TextField
//                       fullWidth
//                       name="description"
//                       label="Description"
//                       value={newComplaint.description}
//                       onChange={handleInputChange}
//                       multiline
//                       rows={4}
//                     />
//                   </Grid>
//                   <Grid item xs={12}>
//                     <Button 
//                       type="submit" 
//                       variant="contained" 
//                       color="primary"
//                       startIcon={<Send />}
//                       fullWidth
//                     >
//                       Submit Complaint
//                     </Button>
//                   </Grid>
//                 </Grid>
//               </form>
//             </CardContent>
//           </Card>
//         </Container>
//       )}

//       {/* Complaints List */}
//       <Container sx={{ py: 4 }}>
//         <Grid container spacing={3}>
//           {complaints.map((complaint) => (
//             <Grid item xs={12} key={complaint.id}>
//               <Card>
//                 <CardContent>
//                   <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
//                     <Box>
//                       <Typography variant="subtitle1" color="text.secondary">
//                         {new Date(complaint.date).toLocaleDateString()}
//                       </Typography>
//                       <Typography variant="h6" gutterBottom>
//                         {complaint.type}
//                       </Typography>
//                       {complaint.studentName && (
//                         <Typography color="text.secondary">
//                           Student: {complaint.studentName} {complaint.studentRoll ? `(${complaint.studentRoll})` : ''}
//                         </Typography>
//                       )}
//                     </Box>
//                     <Box sx={{ display: 'flex', gap: 1 }}>
//                       <IconButton color="primary" size="small">
//                         <Edit />
//                       </IconButton>
//                       <IconButton color="error" size="small">
//                         <Delete />
//                       </IconButton>
//                     </Box>
//                   </Box>
//                   <Typography paragraph>
//                     {complaint.description}
//                   </Typography>
//                   <Typography color="text.secondary">
//                     Department: {complaint.department}
//                   </Typography>
//                   <Typography color="text.secondary">
//                     Status: {complaint.status}
//                   </Typography>
//                 </CardContent>
//                 <CardActions>
//                   <Button 
//                     variant="outlined" 
//                     color="primary"
//                     size="small"
//                   >
//                     View Details
//                   </Button>
//                   <Button 
//                     variant="outlined" 
//                     color="primary"
//                     size="small"
//                   >
//                     Track Status
//                   </Button>
//                 </CardActions>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>
//       </Container>
//     </Box>
//   );
// };

// export default Complaints;






import React, { useState } from 'react';

/* ---------- Enhanced Complaints Page Styles ---------- */
const styles = {
  pageWrapper: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
    fontFamily: '"Inter", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
  },

  // Navbar Styles
  navbar: {
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(20px)',
    borderBottom: '1px solid rgba(226, 232, 240, 0.8)',
    padding: '1rem 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
  },

  logo: {
    fontSize: '1.8rem',
    fontWeight: '700',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },

  navLinks: {
    display: 'flex',
    gap: '2rem',
    alignItems: 'center',
  },

  navLink: {
    textDecoration: 'none',
    color: '#64748b',
    fontWeight: '500',
    transition: 'color 0.3s ease',
    cursor: 'pointer',
  },

  userProfile: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
    padding: '0.5rem 1rem',
    borderRadius: '25px',
    border: '1px solid #e2e8f0',
  },

  // Header Styles
  header: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: '#fff',
    padding: '4rem 2rem',
    position: 'relative',
    overflow: 'hidden',
  },

  headerBackground: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: '400px',
    height: '400px',
    background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
    borderRadius: '50%',
    transform: 'translate(150px, -150px)',
  },

  headerContent: {
    position: 'relative',
    zIndex: 2,
    maxWidth: '1200px',
    margin: '0 auto',
  },

  headerTitle: {
    fontSize: '3rem',
    fontWeight: '700',
    marginBottom: '1rem',
    textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
  },

  headerSubtitle: {
    fontSize: '1.2rem',
    opacity: 0.9,
    maxWidth: '600px',
  },

  headerStats: {
    display: 'flex',
    gap: '2rem',
    marginTop: '2rem',
  },

  statItem: {
    background: 'rgba(255, 255, 255, 0.2)',
    backdropFilter: 'blur(10px)',
    padding: '1rem 1.5rem',
    borderRadius: '12px',
    textAlign: 'center',
  },

  statNumber: {
    fontSize: '1.5rem',
    fontWeight: '700',
    display: 'block',
  },

  statLabel: {
    fontSize: '0.9rem',
    opacity: 0.9,
  },

  // Main Content
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '2rem',
  },

  // Form Styles
  formCard: {
    background: '#fff',
    borderRadius: '24px',
    padding: '2.5rem',
    marginBottom: '2rem',
    boxShadow: '0 20px 40px rgba(0,0,0,0.08)',
    border: '1px solid rgba(226, 232, 240, 0.8)',
  },

  formTitle: {
    fontSize: '1.8rem',
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: '0.5rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
  },

  formSubtitle: {
    color: '#64748b',
    marginBottom: '2rem',
  },

  formGrid: {
    display: 'grid',
    gap: '1.5rem',
  },

  formRow: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '1.5rem',
  },

  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },

  label: {
    fontSize: '0.9rem',
    fontWeight: '600',
    color: '#374151',
  },

  input: {
    padding: '1rem',
    border: '2px solid #e2e8f0',
    borderRadius: '12px',
    fontSize: '1rem',
    transition: 'all 0.3s ease',
    background: '#fff',
    outline: 'none',
  },

  inputFocused: {
    borderColor: '#667eea',
    boxShadow: '0 0 0 3px rgba(102, 126, 234, 0.1)',
  },

  select: {
    padding: '1rem',
    border: '2px solid #e2e8f0',
    borderRadius: '12px',
    fontSize: '1rem',
    background: '#fff',
    cursor: 'pointer',
    outline: 'none',
    transition: 'all 0.3s ease',
  },

  textarea: {
    padding: '1rem',
    border: '2px solid #e2e8f0',
    borderRadius: '12px',
    fontSize: '1rem',
    minHeight: '120px',
    resize: 'vertical',
    outline: 'none',
    transition: 'all 0.3s ease',
  },

  submitButton: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: '#fff',
    border: 'none',
    borderRadius: '12px',
    padding: '1rem 2rem',
    fontSize: '1.1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
  },

  submitButtonHover: {
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 25px rgba(102, 126, 234, 0.4)',
  },

  // Complaints List Styles
  complaintsSection: {
    marginTop: '2rem',
  },

  sectionTitle: {
    fontSize: '1.8rem',
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: '1.5rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
  },

  complaintsGrid: {
    display: 'grid',
    gap: '1.5rem',
  },

  complaintCard: {
    background: '#fff',
    borderRadius: '20px',
    padding: '2rem',
    boxShadow: '0 8px 25px rgba(0,0,0,0.08)',
    border: '1px solid rgba(226, 232, 240, 0.8)',
    transition: 'all 0.3s ease',
    position: 'relative',
    overflow: 'hidden',
  },

  complaintCardHover: {
    transform: 'translateY(-4px)',
    boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
  },

  complaintHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '1.5rem',
  },

  complaintInfo: {
    flex: 1,
  },

  complaintDate: {
    fontSize: '0.85rem',
    color: '#94a3b8',
    marginBottom: '0.5rem',
  },

  complaintType: {
    fontSize: '1.3rem',
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: '0.5rem',
  },

  complaintStudent: {
    fontSize: '0.9rem',
    color: '#64748b',
  },

  complaintActions: {
    display: 'flex',
    gap: '0.5rem',
  },

  actionButton: {
    width: '40px',
    height: '40px',
    borderRadius: '10px',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1rem',
  },

  editButton: {
    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    color: '#fff',
  },

  deleteButton: {
    background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
    color: '#fff',
  },

  complaintDescription: {
    fontSize: '1rem',
    color: '#374151',
    lineHeight: 1.6,
    marginBottom: '1.5rem',
  },

  complaintMeta: {
    display: 'flex',
    gap: '2rem',
    marginBottom: '1.5rem',
    fontSize: '0.9rem',
  },

  metaItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    color: '#64748b',
  },

  statusBadge: {
    padding: '0.25rem 0.75rem',
    borderRadius: '20px',
    fontSize: '0.8rem',
    fontWeight: '600',
    textTransform: 'uppercase',
  },

  statusPending: {
    background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
    color: '#fff',
  },

  statusResolved: {
    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    color: '#fff',
  },

  statusInProgress: {
    background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
    color: '#fff',
  },

  complaintFooter: {
    display: 'flex',
    gap: '1rem',
    paddingTop: '1rem',
    borderTop: '1px solid #f1f5f9',
  },

  footerButton: {
    padding: '0.5rem 1rem',
    border: '2px solid #e2e8f0',
    borderRadius: '8px',
    background: '#fff',
    color: '#64748b',
    fontSize: '0.85rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },

  // Filter Section
  filterSection: {
    background: '#fff',
    borderRadius: '16px',
    padding: '1.5rem',
    marginBottom: '2rem',
    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
    border: '1px solid rgba(226, 232, 240, 0.8)',
  },

  filterRow: {
    display: 'flex',
    gap: '1rem',
    alignItems: 'center',
    flexWrap: 'wrap',
  },

  filterSelect: {
    padding: '0.5rem 1rem',
    border: '2px solid #e2e8f0',
    borderRadius: '8px',
    background: '#fff',
    fontSize: '0.9rem',
    cursor: 'pointer',
    outline: 'none',
  },

  // Empty State
  emptyState: {
    textAlign: 'center',
    padding: '4rem 2rem',
    color: '#64748b',
  },

  emptyIcon: {
    fontSize: '4rem',
    marginBottom: '1rem',
    opacity: 0.5,
  },

  emptyTitle: {
    fontSize: '1.2rem',
    fontWeight: '600',
    marginBottom: '0.5rem',
  },

  emptyDesc: {
    fontSize: '0.9rem',
  },
};

const complaintTypes = [
  'Maintenance',
  'Academic',
  'Security',
  'Transport',
  'Food',
  'Other'
];

// Mock Icons
const SendIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
  </svg>
);

const EditIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
  </svg>
);

const DeleteIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
  </svg>
);

/* ---------- Main Complaints Component ---------- */
const Complaints = () => {
  // Mock data since localStorage isn't available in artifacts
  const [complaints, setComplaints] = useState([
    {
      id: 1,
      type: 'Maintenance',
      description: 'The air conditioning in Room 301 is not working properly. It has been making loud noises and not cooling effectively for the past week.',
      department: 'Facilities Management',
      studentName: 'John Doe',
      studentRoll: 'CS2021001',
      date: '2025-01-20',
      status: 'Pending'
    },
    {
      id: 2,
      type: 'Academic',
      description: 'Unable to access the online portal for submitting assignments. Getting error 404 when trying to login.',
      department: 'IT Department',
      studentName: 'Jane Smith',
      studentRoll: 'CS2021002',
      date: '2025-01-19',
      status: 'In Progress'
    },
    {
      id: 3,
      type: 'Food',
      description: 'The quality of food in the cafeteria has deteriorated. Multiple students have reported stomach issues after eating.',
      department: 'Food Services',
      studentName: 'Mike Johnson',
      studentRoll: 'CS2021003',
      date: '2025-01-18',
      status: 'Resolved'
    }
  ]);

  const [newComplaint, setNewComplaint] = useState({
    type: '',
    description: '',
    department: ''
  });

  const [filterType, setFilterType] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [hoveredCard, setHoveredCard] = useState('');
  const [focusedField, setFocusedField] = useState('');

  // Get user info from localStorage
  let isAdmin = false;
  let currentUser = { name: '', rollNumber: '' };
  const userStr = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
  if (userStr) {
    try {
      const parsed = JSON.parse(userStr);
      isAdmin = parsed.role === 'admin';
      currentUser = {
        name: parsed.name || '',
        rollNumber: parsed.rollNumber || ''
      };
    } catch (e) {
      // fallback to default
    }
  }

  // Detect if admin route
  const isAdminRoute = typeof window !== 'undefined' && window.location.pathname === '/complaints/admin';

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewComplaint(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newComplaint.type || !newComplaint.description) {
      alert('Please fill in all required fields');
      return;
    }

    const complaintToAdd = {
      ...newComplaint,
      studentName: currentUser.name,
      studentRoll: currentUser.rollNumber,
      id: Date.now(),
      date: new Date().toISOString().slice(0, 10),
      status: 'Pending',
    };

    setComplaints(prev => [complaintToAdd, ...prev]);
    setNewComplaint({
      type: '',
      description: '',
      department: ''
    });
    alert('Complaint submitted successfully!');
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this complaint?')) {
      setComplaints(prev => prev.filter(c => c.id !== id));
    }
  };

  const getStatusStyle = (status) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return styles.statusPending;
      case 'resolved':
        return styles.statusResolved;
      case 'in progress':
        return styles.statusInProgress;
      default:
        return styles.statusPending;
    }
  };

  // Only show own complaints for students, all for admin
  const filteredComplaints = complaints.filter(complaint => {
    const typeMatch = filterType === 'All' || complaint.type === filterType;
    const statusMatch = filterStatus === 'All' || complaint.status === filterStatus;
    // If admin or admin route, show all
    if (isAdmin || isAdminRoute) return typeMatch && statusMatch;
    // If not admin, only show complaints by this student
    const studentMatch = complaint.studentName === currentUser.name && complaint.studentRoll === currentUser.rollNumber;
    return typeMatch && statusMatch && studentMatch;
  });

  // Admin management view
  if (isAdminRoute && isAdmin) {
    return (
      <div style={styles.pageWrapper}>
        <nav style={styles.navbar}>
          <div style={styles.logo}>CampusLink</div>
          <div style={styles.navLinks}>
            <a style={styles.navLink} href="/">Home</a>
            <a style={styles.navLink} href="/dashboard">Dashboard</a>
            <a style={styles.navLink} href="/timetable">Timetable</a>
            <a style={styles.navLink} href="/complaints">Complaints</a>
          </div>
          <div style={styles.userProfile}>
            <div style={{
              width: '32px', height: '32px', borderRadius: '50%', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '0.9rem', fontWeight: '600'
            }}>{currentUser.name.charAt(0)}</div>
            <span style={{fontSize: '0.9rem', fontWeight: '500', color: '#374151'}}>{currentUser.name}</span>
          </div>
        </nav>
        <div style={styles.header}>
          <div style={styles.headerBackground}></div>
          <div style={styles.headerContent}>
            <h1 style={styles.headerTitle}>Admin: Manage Student Complaints</h1>
            <p style={styles.headerSubtitle}>View and manage all complaints submitted by students. Change status as needed.</p>
          </div>
        </div>
        <div style={styles.container}>
          <div style={styles.complaintsSection}>
            <h2 style={styles.sectionTitle}>All Student Complaints <span style={{fontSize: '1rem', fontWeight: '500', color: '#64748b', background: '#f1f5f9', padding: '0.25rem 0.75rem', borderRadius: '20px', marginLeft: '1rem'}}>{filteredComplaints.length}</span></h2>
            {filteredComplaints.length === 0 ? (
              <div style={styles.emptyState}>
                <div style={styles.emptyIcon}>📭</div>
                <div style={styles.emptyTitle}>No complaints found</div>
                <div style={styles.emptyDesc}>No complaints have been submitted yet</div>
              </div>
            ) : (
              <div style={styles.complaintsGrid}>
                {filteredComplaints.map((complaint) => (
                  <div key={complaint.id} style={styles.complaintCard}>
                    <div style={styles.complaintHeader}>
                      <div style={styles.complaintInfo}>
                        <div style={styles.complaintDate}>{new Date(complaint.date).toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'})}</div>
                        <div style={styles.complaintType}>{complaint.type}</div>
                        {complaint.studentName && (
                          <div style={styles.complaintStudent}>👤 {complaint.studentName} {complaint.studentRoll && `(${complaint.studentRoll})`}</div>
                        )}
                      </div>
                    </div>
                    <div style={styles.complaintDescription}>{complaint.description}</div>
                    <div style={styles.complaintMeta}>
                      <div style={styles.metaItem}><span>🏢</span><span>Department: {complaint.department || 'Not specified'}</span></div>
                      <div style={styles.metaItem}><span>📊</span><span>Status:</span>
                        <select
                          value={complaint.status}
                          onChange={e => {
                            const newStatus = e.target.value;
                            setComplaints(prev => prev.map(c => c.id === complaint.id ? {...c, status: newStatus} : c));
                          }}
                          style={{...styles.statusBadge, ...getStatusStyle(complaint.status), minWidth: 120, border: 'none', outline: 'none', fontWeight: 600, fontSize: '0.9rem'}}
                        >
                          <option value="Pending">Pending</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Resolved">Resolved</option>
                        </select>
                      </div>
                    </div>
                    <div style={styles.complaintFooter}>
                      <button style={styles.footerButton} onClick={() => alert('Details for admin coming soon!')}>View Details</button>
                      <button style={styles.footerButton} onClick={() => alert('Tracking for admin coming soon!')}>Track Status</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
  // ...existing code...
};

export default Complaints;