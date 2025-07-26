// import React from 'react';
// import AdminLogin from '../components/AdminLogin';
// import StudentLogin from '../components/StudentLogin';
// import styles from './LoginPage.module.css';

// const LoginPage = () => 
//   return (
//     <div className={styles.loginWrapper}>
//       <div className={styles.loginHeader}>Campus Management System</div>
//       <div className={styles.loginSubHeader}>Please select your login type</div>
//       <div className={styles.loginCardContainer}>
//         <div className={styles.loginCard}>
//           <AdminLogin />
//         </div>
//         <div className={styles.loginCard}>
//           <StudentLogin />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;






import React, { useState } from 'react';

/* ---------- Enhanced Login Page Styles ---------- */
const styles = {
  loginWrapper: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: '"Inter", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
    padding: '2rem',
    position: 'relative',
    overflow: 'hidden',
  },

  backgroundPattern: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="4"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
    animation: 'float 20s ease-in-out infinite',
  },

  loginContainer: {
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(20px)',
    borderRadius: '24px',
    padding: '3rem',
    boxShadow: '0 25px 50px rgba(0, 0, 0, 0.2)',
    maxWidth: '900px',
    width: '100%',
    position: 'relative',
    zIndex: 10,
    border: '1px solid rgba(255, 255, 255, 0.2)',
  },

  loginHeader: {
    textAlign: 'center',
    marginBottom: '1rem',
  },

  loginTitle: {
    fontSize: '2.5rem',
    fontWeight: '700',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    marginBottom: '0.5rem',
  },

  loginSubtitle: {
    fontSize: '1.1rem',
    color: '#64748b',
    fontWeight: '400',
    marginBottom: '2.5rem',
  },

  tabContainer: {
    display: 'flex',
    background: '#f1f5f9',
    borderRadius: '16px',
    padding: '0.5rem',
    marginBottom: '2rem',
    position: 'relative',
  },

  tab: {
    flex: 1,
    padding: '1rem 2rem',
    textAlign: 'center',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    fontSize: '1rem',
    fontWeight: '600',
    color: '#64748b',
    border: 'none',
    background: 'transparent',
    position: 'relative',
    zIndex: 2,
  },

  activeTab: {
    color: '#fff',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
  },

  formContainer: {
    minHeight: '400px',
  },

  form: {
    display: 'flex',
    flexDirection: 'column',
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
    marginBottom: '0.5rem',
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

  submitButton: {
    padding: '1rem 2rem',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: '#fff',
    border: 'none',
    borderRadius: '12px',
    fontSize: '1.1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    marginTop: '1rem',
    boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
  },

  submitButtonHover: {
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 25px rgba(102, 126, 234, 0.4)',
  },

  forgotPassword: {
    textAlign: 'center',
    marginTop: '1rem',
  },

  forgotLink: {
    color: '#667eea',
    textDecoration: 'none',
    fontSize: '0.9rem',
    fontWeight: '500',
    transition: 'color 0.3s ease',
  },

  divider: {
    display: 'flex',
    alignItems: 'center',
    margin: '2rem 0',
    gap: '1rem',
  },

  dividerLine: {
    flex: 1,
    height: '1px',
    background: '#e2e8f0',
  },

  dividerText: {
    color: '#64748b',
    fontSize: '0.9rem',
    fontWeight: '500',
  },

  quickAccessCard: {
    background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
    borderRadius: '16px',
    padding: '1.5rem',
    marginTop: '2rem',
    border: '1px solid #e2e8f0',
  },

  quickAccessTitle: {
    fontSize: '1rem',
    fontWeight: '600',
    color: '#374151',
    marginBottom: '1rem',
    textAlign: 'center',
  },

  quickAccessButtons: {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },

  quickAccessButton: {
    padding: '0.75rem 1.5rem',
    background: '#fff',
    border: '2px solid #e2e8f0',
    borderRadius: '8px',
    color: '#64748b',
    textDecoration: 'none',
    fontSize: '0.9rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },

  features: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '1rem',
    marginTop: '2rem',
    padding: '1.5rem',
    background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
    borderRadius: '16px',
  },

  feature: {
    textAlign: 'center',
    padding: '1rem',
  },

  featureIcon: {
    fontSize: '2rem',
    marginBottom: '0.5rem',
  },

  featureTitle: {
    fontSize: '0.9rem',
    fontWeight: '600',
    color: '#374151',
    marginBottom: '0.25rem',
  },

  featureDesc: {
    fontSize: '0.8rem',
    color: '#64748b',
  },
};

// Animation keyframes
const keyframes = `
  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(5deg); }
  }
`;

/* ---------- Mock Components (Replace with your actual components) ---------- */

const AdminLogin = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    adminId: '',
    password: ''
  });
  const [focusedField, setFocusedField] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Replace this with your actual admin login logic
    console.log('Admin login:', formData);
    alert(`Admin login attempted with ID: ${formData.adminId}`);
    if (onSubmit) onSubmit(formData, 'admin');
  };

  return (
    <div style={styles.form}>
      <div style={styles.formGroup}>
        <label style={styles.label}>Admin ID</label>
        <input
          type="text"
          name="adminId"
          value={formData.adminId}
          onChange={handleChange}
          onFocus={() => setFocusedField('adminId')}
          onBlur={() => setFocusedField('')}
          style={{
            ...styles.input,
            ...(focusedField === 'adminId' ? styles.inputFocused : {})
          }}
          placeholder="Enter your admin ID"
          required
        />
      </div>
      
      <div style={styles.formGroup}>
        <label style={styles.label}>Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          onFocus={() => setFocusedField('password')}
          onBlur={() => setFocusedField('')}
          style={{
            ...styles.input,
            ...(focusedField === 'password' ? styles.inputFocused : {})
          }}
          placeholder="Enter your password"
          required
        />
      </div>

      <button
        type="submit"
        onClick={handleSubmit}
        style={styles.submitButton}
        onMouseEnter={(e) => {
          e.target.style.transform = 'translateY(-2px)';
          e.target.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.4)';
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = 'translateY(0)';
          e.target.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.3)';
        }}
      >
        Sign In as Admin
      </button>

      <div style={styles.forgotPassword}>
        <a href="#" style={styles.forgotLink} onMouseEnter={(e) => e.target.style.color = '#5a67d8'} onMouseLeave={(e) => e.target.style.color = '#667eea'}>
          Forgot your password?
        </a>
      </div>
    </div>
  );
};

const StudentLogin = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    studentId: '',
    password: ''
  });
  const [focusedField, setFocusedField] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Replace this with your actual student login logic
    console.log('Student login:', formData);
    alert(`Student login attempted with ID: ${formData.studentId}`);
    if (onSubmit) onSubmit(formData, 'student');
  };

  return (
    <div style={styles.form}>
      <div style={styles.formGroup}>
        <label style={styles.label}>Student ID</label>
        <input
          type="text"
          name="studentId"
          value={formData.studentId}
          onChange={handleChange}
          onFocus={() => setFocusedField('studentId')}
          onBlur={() => setFocusedField('')}
          style={{
            ...styles.input,
            ...(focusedField === 'studentId' ? styles.inputFocused : {})
          }}
          placeholder="Enter your student ID"
          required
        />
      </div>
      
      <div style={styles.formGroup}>
        <label style={styles.label}>Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          onFocus={() => setFocusedField('password')}
          onBlur={() => setFocusedField('')}
          style={{
            ...styles.input,
            ...(focusedField === 'password' ? styles.inputFocused : {})
          }}
          placeholder="Enter your password"
          required
        />
      </div>

      <button
        type="submit"
        onClick={handleSubmit}
        style={styles.submitButton}
        onMouseEnter={(e) => {
          e.target.style.transform = 'translateY(-2px)';
          e.target.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.4)';
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = 'translateY(0)';
          e.target.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.3)';
        }}
      >
        Sign In as Student
      </button>

      <div style={styles.forgotPassword}>
        <a href="#" style={styles.forgotLink} onMouseEnter={(e) => e.target.style.color = '#5a67d8'} onMouseLeave={(e) => e.target.style.color = '#667eea'}>
          Forgot your password?
        </a>
      </div>

      <div style={styles.divider}>
        <div style={styles.dividerLine}></div>
        <span style={styles.dividerText}>New Student?</span>
        <div style={styles.dividerLine}></div>
      </div>

      <button
        style={{
          ...styles.submitButton,
          background: 'transparent',
          color: '#667eea',
          border: '2px solid #667eea',
          boxShadow: 'none',
        }}
        onMouseEnter={(e) => {
          e.target.style.background = '#667eea';
          e.target.style.color = '#fff';
          e.target.style.transform = 'translateY(-2px)';
        }}
        onMouseLeave={(e) => {
          e.target.style.background = 'transparent';
          e.target.style.color = '#667eea';
          e.target.style.transform = 'translateY(0)';
        }}
        onClick={() => alert('Registration functionality would be implemented')}
      >
        Create New Account
      </button>
    </div>
  );
};

/* ---------- Main Login Page Component ---------- */
const LoginPage = () => {
  const [activeTab, setActiveTab] = useState('student');

  const handleLogin = (userData, userType) => {
    // Set user info in localStorage for role-based routing
    if (userType === 'admin') {
      localStorage.setItem('user', JSON.stringify({
        role: 'admin',
        name: userData.adminId || 'Admin'
      }));
      window.location.href = '/dashboard/admin';
    } else {
      localStorage.setItem('user', JSON.stringify({
        role: 'student',
        name: userData.studentId || 'Student',
        rollNumber: userData.studentId || ''
      }));
      window.location.href = '/dashboard/student';
    }
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
      <div style={styles.loginWrapper}>
        <style>{keyframes}</style>
        <div style={styles.backgroundPattern}></div>

        <div style={styles.loginContainer}>
          <div style={styles.loginHeader}>
            <h1 style={styles.loginTitle}>Welcome to Campus Portal</h1>
            <p style={styles.loginSubtitle}>
              Please sign in to access your campus portal
            </p>
          </div>

          <div style={styles.tabContainer}>
            <button
              style={{
                ...styles.tab,
                ...(activeTab === 'student' ? styles.activeTab : {})
              }}
              onClick={() => setActiveTab('student')}
            >
              👨‍🎓 Student Login
            </button>
            <button
              style={{
                ...styles.tab,
                ...(activeTab === 'admin' ? styles.activeTab : {})
              }}
              onClick={() => setActiveTab('admin')}
            >
              👨‍💼 Admin Login
            </button>
          </div>

          <div style={styles.formContainer}>
            {activeTab === 'student' ? (
              <StudentLogin onSubmit={handleLogin} />
            ) : (
              <AdminLogin onSubmit={handleLogin} />
            )}
          </div>

          {/* Quick Access Features */}
          <div style={styles.quickAccessCard}>
            <h3 style={styles.quickAccessTitle}>Quick Access</h3>
            <div style={styles.quickAccessButtons}>
              <button
                style={styles.quickAccessButton}
                onMouseEnter={(e) => {
                  e.target.style.borderColor = '#667eea';
                  e.target.style.color = '#667eea';
                }}
                onMouseLeave={(e) => {
                  e.target.style.borderColor = '#e2e8f0';
                  e.target.style.color = '#64748b';
                }}
                onClick={() => alert('View announcements functionality')}
              >
                📢 View Announcements
              </button>
              <button
                style={styles.quickAccessButton}
                onMouseEnter={(e) => {
                  e.target.style.borderColor = '#667eea';
                  e.target.style.color = '#667eea';
                }}
                onMouseLeave={(e) => {
                  e.target.style.borderColor = '#e2e8f0';
                  e.target.style.color = '#64748b';
                }}
                onClick={() => alert('Academic calendar functionality')}
              >
                📅 Academic Calendar
              </button>
              <button
                style={styles.quickAccessButton}
                onMouseEnter={(e) => {
                  e.target.style.borderColor = '#667eea';
                  e.target.style.color = '#667eea';
                }}
                onMouseLeave={(e) => {
                  e.target.style.borderColor = '#e2e8f0';
                  e.target.style.color = '#64748b';
                }}
                onClick={() => alert('Help & support functionality')}
              >
                ❓ Help & Support
              </button>
            </div>
          </div>

          {/* Platform Features */}
          <div style={styles.features}>
            <div style={styles.feature}>
              <div style={styles.featureIcon}>🔒</div>
              <div style={styles.featureTitle}>Secure Access</div>
              <div style={styles.featureDesc}>Your data is protected</div>
            </div>
            <div style={styles.feature}>
              <div style={styles.featureIcon}>📱</div>
              <div style={styles.featureTitle}>Mobile Friendly</div>
              <div style={styles.featureDesc}>Access anywhere</div>
            </div>
            <div style={styles.feature}>
              <div style={styles.featureIcon}>⚡</div>
              <div style={styles.featureTitle}>Fast & Reliable</div>
              <div style={styles.featureDesc}>99.9% uptime</div>
            </div>
            <div style={styles.feature}>
              <div style={styles.featureIcon}>🎓</div>
              <div style={styles.featureTitle}>Student Focused</div>
              <div style={styles.featureDesc}>Built for campus life</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;