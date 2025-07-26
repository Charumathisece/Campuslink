
// import React from 'react';
// import { Box, Container, Grid, Typography, Card, CardContent, CardActions, Button } from '@mui/material';
// import { Assignment, Event, Description } from '@mui/icons-material';
// import styles from './DashboardStudent.module.css';


// const DashboardStudent = () => {
//   return (
//     <div className={styles.dashboardWrapper}>
//       {/* Header */}
//       <div className={styles.header}>
//         <div className={styles.headerTitle}>Student Dashboard</div>
//         <div className={styles.headerSubtitle}>Welcome, [Student Name]!</div>
//       </div>

//       {/* Quick Actions */}
//       <div className={styles.quickActions}>
//         <Grid container spacing={3}>
//           <Grid item xs={12} md={4}>
//             <div className={styles.quickActionCard}>
//               <Assignment className={styles.quickActionIcon} />
//               <div className={styles.quickActionTitle}>Time Scheduler</div>
//               <div className={styles.quickActionDesc}>Manage your weekly class schedule</div>
//               <Button 
//                 component="a" 
//                 href="/timetable" 
//                 className={styles.quickActionBtn}
//                 variant="contained"
//               >
//                 View Timetable
//               </Button>
//             </div>
//           </Grid>
//           <Grid item xs={12} md={4}>
//             <div className={styles.quickActionCard}>
//               <Event className={styles.quickActionIcon} />
//               <div className={styles.quickActionTitle}>Upcoming Events</div>
//               <div className={styles.quickActionDesc}>Check campus events and activities</div>
//               <Button 
//                 component="a" 
//                 href="/dashboard/student/profile" 
//                 className={styles.quickActionBtn}
//                 variant="contained"
//               >
//                 View Upcoming Events
//               </Button>
//             </div>
//           </Grid>
//           <Grid item xs={12} md={4}>
//             <div className={styles.quickActionCard}>
//               <Description className={styles.quickActionIcon} />
//               <div className={styles.quickActionTitle}>Complaints</div>
//               <div className={styles.quickActionDesc}>Submit and track complaints</div>
//               <Button 
//                 component="a" 
//                 href="/complaints" 
//                 className={styles.quickActionBtn}
//                 variant="contained"
//               >
//                 Submit Complaint
//               </Button>
//             </div>
//           </Grid>
//         </Grid>
//       </div>

//       {/* Recent Announcements */}
//       <div className={styles.announcements}>
//         <div style={{fontSize: '1.3rem', fontWeight: 700, color: '#6366f1', marginBottom: '1.5rem'}}>Recent Announcements</div>
//         <div className={styles.announcementCard}>
//           <div className={styles.announcementTitle}>Academic Calendar Update</div>
//           <div className={styles.announcementDesc}>
//             The academic calendar for the next semester has been updated with new dates and important deadlines.
//           </div>
//         </div>
//         <div className={styles.announcementCard}>
//           <div className={styles.announcementTitle}>New Library Hours</div>
//           <div className={styles.announcementDesc}>
//             The library will have extended hours during exam week. Check the new schedule on the announcements page.
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DashboardStudent;


import React, { useState, useEffect } from 'react';

/* ---------- Enhanced Student Dashboard Styles ---------- */
const styles = {
  dashboardWrapper: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
    fontFamily: '"Inter", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
    padding: '2rem',
  },

  // Header Styles
  header: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    borderRadius: '24px',
    padding: '3rem 2rem',
    color: '#fff',
    marginBottom: '2rem',
    position: 'relative',
    overflow: 'hidden',
    boxShadow: '0 20px 40px rgba(102, 126, 234, 0.2)',
  },

  headerBackground: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: '300px',
    height: '300px',
    background: 'radial-gradient(circle, #FFECCC 0%, transparent 70%)',
    borderRadius: '50%',
    transform: 'translate(100px, -100px)',
  },

  headerContent: {
    position: 'relative',
    zIndex: 2,
  },

  headerTitle: {
    fontSize: '2.5rem',
    fontWeight: '700',
    marginBottom: '0.5rem',
    textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
  },

  headerSubtitle: {
    fontSize: '1.2rem',
    opacity: 0.9,
    fontWeight: '400',
  },

  headerTime: {
    position: 'absolute',
    top: '2rem',
    right: '2rem',
    background: 'rgba(255, 255, 255, 0.2)',
    color: '#6366f1',
    padding: '0.5rem 1rem',
    borderRadius: '12px',
    backdropFilter: 'blur(10px)',
    fontSize: '0.9rem',
    fontWeight: '600',
  },

  // Stats Cards
  statsContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '1rem',
    marginBottom: '2rem',
  },

  statCard: {
    background: '#fff',
    borderRadius: '16px',
    padding: '1.5rem',
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
    border: '1px solid rgba(226, 232, 240, 0.8)',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
  },

  statCardHover: {
    transform: 'translateY(-4px)',
    boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
  },

  statNumber: {
    fontSize: '2rem',
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: '0.5rem',
  },

  statLabel: {
    fontSize: '0.9rem',
    color: '#64748b',
    fontWeight: '500',
  },

  statIcon: {
    width: '40px',
    height: '40px',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.2rem',
    marginBottom: '1rem',
  },

  // Quick Actions
  quickActions: {
    marginBottom: '2rem',
  },

  sectionTitle: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: '1.5rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },

  quickActionsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '1.5rem',
  },

  quickActionCard: {
    background: '#fff',
    borderRadius: '20px',
    padding: '2rem',
    boxShadow: '0 8px 25px rgba(0,0,0,0.08)',
    border: '1px solid rgba(226, 232, 240, 0.8)',
    transition: 'all 0.3s ease',
    position: 'relative',
    overflow: 'hidden',
  },

  quickActionCardHover: {
    transform: 'translateY(-8px)',
    boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
  },

  quickActionIcon: {
    width: '60px',
    height: '60px',
    borderRadius: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.5rem',
    marginBottom: '1rem',
    background: '#FF9587',
    color: '#FFECCC',
  },

  quickActionTitle: {
    fontSize: '1.2rem',
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: '0.5rem',
  },

  quickActionDesc: {
    fontSize: '0.9rem',
    color: '#64748b',
    lineHeight: 1.5,
    marginBottom: '1.5rem',
  },

  quickActionBtn: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: '#fff',
    border: 'none',
    borderRadius: '12px',
    padding: '0.75rem 1.5rem',
    fontSize: '0.9rem',
    fontWeight: '600',
    cursor: 'pointer',
    textDecoration: 'none',
    display: 'inline-block',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
  },

  quickActionBtnHover: {
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 20px rgba(102, 126, 234, 0.4)',
  },

  // Content Grid
  contentGrid: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
    gap: '2rem',
    marginBottom: '2rem',
  },

  // Announcements
  announcements: {
    background: '#fff',
    borderRadius: '20px',
    padding: '2rem',
    boxShadow: '0 8px 25px rgba(0,0,0,0.08)',
    border: '1px solid rgba(226, 232, 240, 0.8)',
  },

  announcementCard: {
    background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
    borderRadius: '12px',
    padding: '1.5rem',
    marginBottom: '1rem',
    border: '1px solid #e2e8f0',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
  },

  announcementCardHover: {
    transform: 'translateX(4px)',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  },

  announcementTitle: {
    fontSize: '1.1rem',
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: '0.5rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },

  announcementDesc: {
    fontSize: '0.9rem',
    color: '#64748b',
    lineHeight: 1.5,
  },

  announcementDate: {
    fontSize: '0.8rem',
    color: '#94a3b8',
    marginTop: '0.5rem',
  },

  // Quick Info Panel
  quickInfoPanel: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },

  infoCard: {
    background: '#fff',
    borderRadius: '20px',
    padding: '1.5rem',
    boxShadow: '0 8px 25px rgba(0,0,0,0.08)',
    border: '1px solid rgba(226, 232, 240, 0.8)',
  },

  upcomingEvents: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },

  eventItem: {
    display: 'flex',
    align: 'center',
    gap: '1rem',
    padding: '1rem',
    background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
    borderRadius: '12px',
    border: '1px solid #e2e8f0',
  },

  eventDate: {
    background: '#667eea',
    color: '#fff',
    borderRadius: '8px',
    padding: '0.5rem',
    textAlign: 'center',
    minWidth: '60px',
    fontSize: '0.8rem',
    fontWeight: '600',
  },

  eventDetails: {
    flex: 1,
  },

  eventTitle: {
    fontSize: '0.9rem',
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: '0.25rem',
  },

  eventTime: {
    fontSize: '0.8rem',
    color: '#64748b',
  },

  // Responsive Design
  '@media (max-width: 768px)': {
    contentGrid: {
      gridTemplateColumns: '1fr',
    },
    quickActionsGrid: {
      gridTemplateColumns: '1fr',
    },
    statsContainer: {
      gridTemplateColumns: 'repeat(2, 1fr)',
    },
  },
};

/* ---------- Mock Icons (Replace with your actual icons) ---------- */
const AssignmentIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
  </svg>
);

const EventIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z"/>
  </svg>
);

const DescriptionIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
  </svg>
);

/* ---------- Main Dashboard Component ---------- */
const DashboardStudent = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [hoveredCard, setHoveredCard] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const handleCardHover = (cardId, isHovering) => {
    setHoveredCard(isHovering ? cardId : '');
  };

  return (
    <>
      {/* CampusLink Navbar */}
      <nav style={{
        width: '100%',
        background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
        color: '#fff',
        padding: '1.1rem 2.5rem',
        fontSize: '1.5rem',
        fontWeight: 700,
        letterSpacing: '2px',
        boxShadow: '0 2px 12px rgba(102, 126, 234, 0.08)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        marginBottom: '2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
      }}>
        <span style={{
          fontFamily: 'Poppins, Inter, Segoe UI, sans-serif',
          fontWeight: 800,
          fontSize: '1.7rem',
          letterSpacing: '2px',
          color: '#fff',
          textShadow: '1px 2px 8px rgba(102,126,234,0.12)'
        }}>
          CampusLink
        </span>
      </nav>
      <div style={styles.dashboardWrapper}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerBackground}></div>
        <div style={styles.headerTime}>
          {formatTime(currentTime)}
        </div>
        <div style={styles.headerContent}>
          <div style={styles.headerTitle}>Student Dashboard</div>
          <div style={styles.headerSubtitle}>Welcome back, [Student Name]! Ready for another productive day?</div>
        </div>
      </div>

      {/* Quick Stats */}
      <div style={styles.statsContainer}>
        <div 
          style={{
            ...styles.statCard,
            ...(hoveredCard === 'stat1' ? styles.statCardHover : {})
          }}
          onMouseEnter={() => handleCardHover('stat1', true)}
          onMouseLeave={() => handleCardHover('stat1', false)}
        >
          <div style={{...styles.statIcon, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}>📚</div>
          <div style={styles.statNumber}>8</div>
          <div style={styles.statLabel}>Active Courses</div>
        </div>
        
        <div 
          style={{
            ...styles.statCard,
            ...(hoveredCard === 'stat2' ? styles.statCardHover : {})
          }}
          onMouseEnter={() => handleCardHover('stat2', true)}
          onMouseLeave={() => handleCardHover('stat2', false)}
        >
          <div style={{...styles.statIcon, background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)'}}>✅</div>
          <div style={styles.statNumber}>12</div>
          <div style={styles.statLabel}>Completed Tasks</div>
        </div>
        
        <div 
          style={{
            ...styles.statCard,
            ...(hoveredCard === 'stat3' ? styles.statCardHover : {})
          }}
          onMouseEnter={() => handleCardHover('stat3', true)}
          onMouseLeave={() => handleCardHover('stat3', false)}
        >
          <div style={{...styles.statIcon, background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)'}}>⏰</div>
          <div style={styles.statNumber}>3</div>
          <div style={styles.statLabel}>Upcoming Events</div>
        </div>
        
        <div 
          style={{
            ...styles.statCard,
            ...(hoveredCard === 'stat4' ? styles.statCardHover : {})
          }}
          onMouseEnter={() => handleCardHover('stat4', true)}
          onMouseLeave={() => handleCardHover('stat4', false)}
        >
          <div style={{...styles.statIcon, background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)'}}>📝</div>
          <div style={styles.statNumber}>2</div>
          <div style={styles.statLabel}>Pending Complaints</div>
        </div>
      </div>

      {/* Quick Actions */}
      <div style={styles.quickActions}>
        <div style={styles.sectionTitle}>
          🚀 Quick Actions
        </div>
        <div style={styles.quickActionsGrid}>
          <div 
            style={{
              ...styles.quickActionCard,
              ...(hoveredCard === 'action1' ? styles.quickActionCardHover : {})
            }}
            onMouseEnter={() => handleCardHover('action1', true)}
            onMouseLeave={() => handleCardHover('action1', false)}
          >
            <div style={{...styles.quickActionIcon, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}>
              <AssignmentIcon />
            </div>
            <div style={styles.quickActionTitle}>Time Scheduler</div>
            <div style={styles.quickActionDesc}>
              Manage your weekly class schedule and never miss an important lecture or assignment deadline.
            </div>
            <a
              href="/timetable"
              style={{
                ...styles.quickActionBtn,
                ...(hoveredCard === 'action1' ? styles.quickActionBtnHover : {})
              }}
            >
              View Timetable
            </a>
          </div>

          <div 
            style={{
              ...styles.quickActionCard,
              ...(hoveredCard === 'action2' ? styles.quickActionCardHover : {})
            }}
            onMouseEnter={() => handleCardHover('action2', true)}
            onMouseLeave={() => handleCardHover('action2', false)}
          >
            <div style={{...styles.quickActionIcon, background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)'}}>
              <EventIcon />
            </div>
            <div style={styles.quickActionTitle}>Upcoming Events</div>
            <div style={styles.quickActionDesc}>
              Check campus events, workshops, seminars and activities happening around you.
            </div>
            <a
              href="/dashboard/student/profile"
              style={{
                ...styles.quickActionBtn,
                ...(hoveredCard === 'action2' ? styles.quickActionBtnHover : {})
              }}
            >
              View Upcoming Events
            </a>
          </div>

          <div 
            style={{
              ...styles.quickActionCard,
              ...(hoveredCard === 'action3' ? styles.quickActionCardHover : {})
            }}
            onMouseEnter={() => handleCardHover('action3', true)}
            onMouseLeave={() => handleCardHover('action3', false)}
          >
            <div style={{...styles.quickActionIcon, background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)'}}>
              <DescriptionIcon />
            </div>
            <div style={styles.quickActionTitle}>Complaints</div>
            <div style={styles.quickActionDesc}>
              Submit and track complaints about facilities, services, or any campus-related issues.
            </div>
            <a
              href="/hostelcomplaints"
              style={{
                ...styles.quickActionBtn,
                ...(hoveredCard === 'action3' ? styles.quickActionBtnHover : {})
              }}
            >
              Submit Hostel Complaint
            </a>
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div style={styles.contentGrid}>
        {/* Recent Announcements */}
        <div style={styles.announcements}>
          <div style={styles.sectionTitle}>
            📢 Recent Announcements
          </div>
          
          <div 
            style={{
              ...styles.announcementCard,
              ...(hoveredCard === 'announce1' ? styles.announcementCardHover : {})
            }}
            onMouseEnter={() => handleCardHover('announce1', true)}
            onMouseLeave={() => handleCardHover('announce1', false)}
          >
            <div style={styles.announcementTitle}>
              📅 Academic Calendar Update
            </div>
            <div style={styles.announcementDesc}>
              The academic calendar for the next semester has been updated with new dates and important deadlines. Please check your course schedules.
            </div>
            <div style={styles.announcementDate}>2 hours ago</div>
          </div>

          <div 
            style={{
              ...styles.announcementCard,
              ...(hoveredCard === 'announce2' ? styles.announcementCardHover : {})
            }}
            onMouseEnter={() => handleCardHover('announce2', true)}
            onMouseLeave={() => handleCardHover('announce2', false)}
          >
            <div style={styles.announcementTitle}>
              📚 New Library Hours
            </div>
            <div style={styles.announcementDesc}>
              The library will have extended hours during exam week. Check the new schedule on the announcements page for detailed timings.
            </div>
            <div style={styles.announcementDate}>1 day ago</div>
          </div>

          <div 
            style={{
              ...styles.announcementCard,
              ...(hoveredCard === 'announce3' ? styles.announcementCardHover : {})
            }}
            onMouseEnter={() => handleCardHover('announce3', true)}
            onMouseLeave={() => handleCardHover('announce3', false)}
          >
            <div style={styles.announcementTitle}>
              🎓 Career Fair Registration
            </div>
            <div style={styles.announcementDesc}>
              Registration is now open for the annual career fair. Don't miss this opportunity to connect with top employers and explore job opportunities.
            </div>
            <div style={styles.announcementDate}>3 days ago</div>
          </div>
        </div>

        {/* Quick Info Panel */}
        <div style={styles.quickInfoPanel}>
          {/* Upcoming Events */}
          <div style={styles.infoCard}>
            <div style={styles.sectionTitle}>
              🗓️ Today's Schedule
            </div>
            <div style={styles.upcomingEvents}>
              <div style={styles.eventItem}>
                <div style={styles.eventDate}>
                  <div style={{fontSize: '1rem', fontWeight: '700'}}>14</div>
                  <div>MON</div>
                </div>
                <div style={styles.eventDetails}>
                  <div style={styles.eventTitle}>Mathematics Lecture</div>
                  <div style={styles.eventTime}>10:00 AM - 11:30 AM</div>
                </div>
              </div>
              
              <div style={styles.eventItem}>
                <div style={styles.eventDate}>
                  <div style={{fontSize: '1rem', fontWeight: '700'}}>14</div>
                  <div>MON</div>
                </div>
                <div style={styles.eventDetails}>
                  <div style={styles.eventTitle}>Physics Lab</div>
                  <div style={styles.eventTime}>2:00 PM - 4:00 PM</div>
                </div>
              </div>
              
              <div style={styles.eventItem}>
                <div style={styles.eventDate}>
                  <div style={{fontSize: '1rem', fontWeight: '700'}}>15</div>
                  <div>TUE</div>
                </div>
                <div style={styles.eventDetails}>
                  <div style={styles.eventTitle}>Chemistry Quiz</div>
                  <div style={styles.eventTime}>9:00 AM - 10:00 AM</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  );
};

export default DashboardStudent;