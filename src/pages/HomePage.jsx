// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import styles from './HomePage.module.css';

// const sliderImages = [
//   'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=900&q=80',
//   'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=900&q=80',
//   'https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=900&q=80',
//   'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=900&q=80',
// ];

// const HomePage = () => {
//   const [current, setCurrent] = useState(0);
//   const nextSlide = () => setCurrent((prev) => (prev + 1) % sliderImages.length);
//   const prevSlide = () => setCurrent((prev) => (prev - 1 + sliderImages.length) % sliderImages.length);
//   const goToSlide = (idx) => setCurrent(idx);

//   // Auto-slide
//   React.useEffect(() => {
//     const timer = setTimeout(nextSlide, 4000);
//     return () => clearTimeout(timer);
//   }, [current]);

//   return (
//     <div className={styles.homeWrapper}>
//       {/* Navbar */}
//       <nav className={styles.navbar}>
//         <div className={styles.logo}>CampusLink</div>
//         <div className={styles.navLinks}>
//           <Link to="/" className={styles.navLink}>Home</Link>
//           <Link to="/login" className={styles.navLink}>Login</Link>
//           <Link to="/register" className={styles.navLink}>Register</Link>
//         </div>
//       </nav>

//       {/* Hero Section */}
//       <div className={styles.hero}>
//         <div className={styles.heroOverlay}></div>
//         <div className={styles.heroContent}>
//           <h1 className={styles.heroTitle}>Inspiration and Innovation.</h1>
//           <p className={styles.heroSubtitle}>
//             CampusLink is your centralized hub for student utilities. From announcements to complaint tracking, everything you need is one click away.
//           </p>
//           <div className={styles.heroButtons}>
//             <Link to="/login" className={styles.btn}>Login</Link>
//             <Link to="/register" className={`${styles.btn} ${styles.secondary}`}>Register</Link>
//           </div>
//         </div>
//       </div>

//       {/* Image Slider */}
//       <div className={styles.sliderWrapper}>
//         <img src={sliderImages[current]} alt="Campus" className={styles.sliderImage} />
//         {/* Slider Dots */}
//         <div className={styles.sliderDots}>
//           {sliderImages.map((_, idx) => (
//             <span
//               key={idx}
//               className={`${styles.sliderDot} ${current === idx ? styles.active : ''}`}
//               onClick={() => goToSlide(idx)}
//             />
//           ))}
//         </div>
//       </div>

//       {/* Intro Section */}
//       <section className={styles.introSection}>
//         <h2 style={{ marginTop: 0 }}>A Few Words About CampusLink</h2>
//         <p className={styles.introText}>
//           CampusLink simplifies campus life by centralizing critical utilities like class schedules, announcements, lost & found, and hostel complaints. It empowers students and eases the admin workload.
//         </p>
//       </section>
//     </div>
//   );
// };

// export default HomePage;






import React, { useState, useEffect } from 'react';

/* ---------- Enhanced Styles ---------- */
const styles = {
  homepageWrapper: { 
    fontFamily: '"Inter", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
    margin: 0,
    padding: 0,
    lineHeight: 1.6,
  },

  // Navbar Styles
  navbar: {
    position: 'fixed',
    top: 0,
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(10px)',
    zIndex: 1000,
    padding: '1rem 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 2px 20px rgba(0,0,0,0.1)',
  },

  logo: {
    fontSize: '1.8rem',
    fontWeight: 'bold',
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
    color: '#333',
    fontWeight: '500',
    transition: 'color 0.3s ease',
    cursor: 'pointer',
  },

  // Hero Section with Slider
  heroSection: {
    position: 'relative',
    height: '100vh',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  sliderImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    opacity: 0,
    transition: 'opacity 1s ease-in-out',
  },

  activeImage: {
    opacity: 1,
  },

  heroOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.8) 0%, rgba(118, 75, 162, 0.8) 100%)',
  },

  heroContent: {
    position: 'relative',
    zIndex: 10,
    textAlign: 'center',
    color: '#fff',
    maxWidth: '800px',
    padding: '0 2rem',
  },

  heroTitle: {
    fontSize: '4rem',
    fontWeight: '700',
    margin: '0 0 1rem',
    textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
    animation: 'fadeInUp 1s ease-out',
  },

  heroSubtitle: {
    fontSize: '1.4rem',
    margin: '0 0 2rem',
    opacity: 0.95,
    animation: 'fadeInUp 1s ease-out 0.2s both',
  },

  heroButtons: {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'center',
    flexWrap: 'wrap',
    animation: 'fadeInUp 1s ease-out 0.4s both',
  },

  primaryBtn: {
    padding: '1rem 2.5rem',
    backgroundColor: '#ff4d4f',
    color: '#fff',
    textDecoration: 'none',
    borderRadius: '50px',
    fontSize: '1.1rem',
    fontWeight: '600',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 15px rgba(255, 77, 79, 0.4)',
  },

  secondaryBtn: {
    padding: '1rem 2.5rem',
    backgroundColor: 'transparent',
    color: '#fff',
    textDecoration: 'none',
    borderRadius: '50px',
    fontSize: '1.1rem',
    fontWeight: '600',
    border: '2px solid #fff',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },

  // Features Section
  featuresSection: {
    padding: '5rem 2rem',
    background: '#f8fafc',
  },

  container: {
    maxWidth: '1200px',
    margin: '0 auto',
  },

  sectionTitle: {
    fontSize: '2.5rem',
    fontWeight: '700',
    textAlign: 'center',
    color: '#1a202c',
    marginBottom: '3rem',
  },

  featuresGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '2rem',
    marginTop: '3rem',
  },

  featureCard: {
    background: '#fff',
    padding: '2rem',
    borderRadius: '15px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
    textAlign: 'center',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    cursor: 'pointer',
  },

  featureIcon: {
    fontSize: '3rem',
    marginBottom: '1rem',
  },

  featureTitle: {
    fontSize: '1.3rem',
    fontWeight: '600',
    color: '#2d3748',
    marginBottom: '1rem',
  },

  featureDesc: {
    color: '#718096',
    lineHeight: 1.6,
  },

  // Stats Section
  statsSection: {
    padding: '4rem 2rem',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: '#fff',
  },

  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '2rem',
    textAlign: 'center',
  },

  statNumber: {
    fontSize: '3rem',
    fontWeight: '700',
    display: 'block',
  },

  statLabel: {
    fontSize: '1.1rem',
    opacity: 0.9,
  },

  // Contact Section
  contactSection: {
    padding: '5rem 2rem',
    background: '#fff',
  },

  contactGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '3rem',
    alignItems: 'start',
  },

  contactForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },

  formGroup: {
    display: 'flex',
    flexDirection: 'column',
  },

  label: {
    marginBottom: '0.5rem',
    fontWeight: '500',
    color: '#2d3748',
  },

  input: {
    padding: '0.8rem',
    border: '2px solid #e2e8f0',
    borderRadius: '8px',
    fontSize: '1rem',
    transition: 'border-color 0.3s ease',
  },

  textarea: {
    padding: '0.8rem',
    border: '2px solid #e2e8f0',
    borderRadius: '8px',
    fontSize: '1rem',
    minHeight: '120px',
    resize: 'vertical',
    transition: 'border-color 0.3s ease',
  },

  submitBtn: {
    padding: '1rem',
    backgroundColor: '#667eea',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1.1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },

  contactInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },

  contactItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },

  contactIcon: {
    fontSize: '1.5rem',
    color: '#667eea',
  },

  // Footer
  footer: {
    background: '#1a202c',
    color: '#fff',
    padding: '3rem 2rem 1rem',
  },

  footerGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '2rem',
    marginBottom: '2rem',
  },

  footerTitle: {
    fontSize: '1.2rem',
    fontWeight: '600',
    marginBottom: '1rem',
  },

  footerLinks: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },

  footerLink: {
    color: '#a0aec0',
    textDecoration: 'none',
    transition: 'color 0.3s ease',
  },

  footerBottom: {
    borderTop: '1px solid #2d3748',
    paddingTop: '1rem',
    textAlign: 'center',
    color: '#a0aec0',
  },
};

// Keyframes for animations
const keyframes = `
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

/* ---------- Component ---------- */
const HomePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  // Hero slider images (using placeholder images)
  const heroImages = [
    'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
  ];

  // Auto-slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We\'ll get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div style={styles.homepageWrapper}>
      <style>{keyframes}</style>
      
      {/* Navigation Bar */}
      <nav style={styles.navbar}>
        <div style={styles.logo}>CampusLink</div>
        <div style={styles.navLinks}>
          <a style={styles.navLink} onClick={() => scrollToSection('home')}>Home</a>
          <a style={styles.navLink} onClick={() => scrollToSection('features')}>Features</a>
          <a style={styles.navLink} onClick={() => scrollToSection('about')}>About</a>
          <a style={styles.navLink} onClick={() => scrollToSection('contact')}>Contact</a>
          <button style={{...styles.navLink, backgroundColor: '#667eea', color: '#fff', padding: '0.5rem 1rem', borderRadius: '25px', border: 'none', cursor: 'pointer'}} onClick={() => window.location.href = '/login'}>Login</button>
        </div>
      </nav>

      {/* Hero Section with Image Slider */}
      <section id="home" style={styles.heroSection}>
        {heroImages.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Campus ${index + 1}`}
            style={{
              ...styles.sliderImage,
              ...(index === currentSlide ? styles.activeImage : {})
            }}
          />
        ))}
        <div style={styles.heroOverlay}></div>
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>Welcome to CampusLink</h1>
          <p style={styles.heroSubtitle}>
            Your ultimate platform for seamless campus life management. Connect, collaborate, and thrive in your academic journey.
          </p>
          <div style={styles.heroButtons}>
            <button style={styles.primaryBtn} onClick={() => window.location.href = '/login'}>Get Started</button>
            <a style={styles.secondaryBtn} onClick={() => scrollToSection('features')}>Learn More</a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" style={styles.featuresSection}>
        <div style={styles.container}>
          <h2 style={styles.sectionTitle}>Powerful Features for Modern Campus Life</h2>
          <div style={styles.featuresGrid}>
            <div style={styles.featureCard} onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-10px)';
              e.target.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)';
            }} onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
            }}>
              <div style={styles.featureIcon}>📅</div>
              <h3 style={styles.featureTitle}>Smart Scheduling</h3>
              <p style={styles.featureDesc}>
                Manage your class schedules, assignments, and events all in one place with intelligent notifications.
              </p>
            </div>
            
            <div style={styles.featureCard} onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-10px)';
              e.target.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)';
            }} onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
            }}>
              <div style={styles.featureIcon}>📢</div>
              <h3 style={styles.featureTitle}>Campus Announcements</h3>
              <p style={styles.featureDesc}>
                Stay updated with real-time announcements from administration, faculty, and student organizations.
              </p>
            </div>

            <div style={styles.featureCard} onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-10px)';
              e.target.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)';
            }} onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
            }}>
              <div style={styles.featureIcon}>🔍</div>
              <h3 style={styles.featureTitle}>Lost & Found</h3>
              <p style={styles.featureDesc}>
                Easily report lost items or help others find their belongings with our advanced search system.
              </p>
            </div>

            <div style={styles.featureCard} onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-10px)';
              e.target.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)';
            }} onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
            }}>
              <div style={styles.featureIcon}>🏠</div>
              <h3 style={styles.featureTitle}>Hostel Management</h3>
              <p style={styles.featureDesc}>
                Submit and track hostel complaints, maintenance requests, and communicate with hostel staff.
              </p>
            </div>

            <div style={styles.featureCard} onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-10px)';
              e.target.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)';
            }} onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
            }}>
              <div style={styles.featureIcon}>👥</div>
              <h3 style={styles.featureTitle}>Community Hub</h3>
              <p style={styles.featureDesc}>
                Connect with fellow students, join study groups, and participate in campus activities.
              </p>
            </div>

            <div style={styles.featureCard} onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-10px)';
              e.target.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)';
            }} onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
            }}>
              <div style={styles.featureIcon}>📱</div>
              <h3 style={styles.featureTitle}>Mobile Ready</h3>
              <p style={styles.featureDesc}>
                Access all features on any device with our responsive design and mobile-optimized interface.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section style={styles.statsSection}>
        <div style={styles.container}>
          <div style={styles.statsGrid}>
            <div>
              <span style={styles.statNumber}>5000+</span>
              <div style={styles.statLabel}>Active Students</div>
            </div>
            <div>
              <span style={styles.statNumber}>150+</span>
              <div style={styles.statLabel}>Faculty Members</div>
            </div>
            <div>
              <span style={styles.statNumber}>50+</span>
              <div style={styles.statLabel}>Campus Services</div>
            </div>
            <div>
              <span style={styles.statNumber}>99.9%</span>
              <div style={styles.statLabel}>Uptime</div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" style={{...styles.featuresSection, background: '#fff'}}>
        <div style={styles.container}>
          <h2 style={styles.sectionTitle}>About CampusLink</h2>
          <div style={{maxWidth: '800px', margin: '0 auto', textAlign: 'center'}}>
            <p style={{fontSize: '1.2rem', color: '#4a5568', lineHeight: 1.8, marginBottom: '2rem'}}>
              CampusLink was born from the vision of creating a unified digital ecosystem for campus life. We understand the challenges students face in managing their academic and social lives, and we're here to simplify that journey.
            </p>
            <p style={{fontSize: '1.1rem', color: '#718096', lineHeight: 1.7}}>
              Our platform brings together essential campus utilities in one intuitive interface, enabling students to focus on what matters most - their education and personal growth. From scheduling to community building, CampusLink is your trusted companion throughout your academic journey.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" style={styles.contactSection}>
        <div style={styles.container}>
          <h2 style={styles.sectionTitle}>Get In Touch</h2>
          <div style={styles.contactGrid}>
            <div>
              <h3 style={{marginBottom: '1.5rem', color: '#2d3748'}}>Send us a message</h3>
              <form style={styles.contactForm} onSubmit={handleSubmit}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    style={styles.input}
                    required
                    onFocus={(e) => e.target.style.borderColor = '#667eea'}
                    onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                  />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    style={styles.input}
                    required
                    onFocus={(e) => e.target.style.borderColor = '#667eea'}
                    onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                  />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    style={styles.input}
                    required
                    onFocus={(e) => e.target.style.borderColor = '#667eea'}
                    onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                  />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    style={styles.textarea}
                    required
                    onFocus={(e) => e.target.style.borderColor = '#667eea'}
                    onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                  />
                </div>
                <button 
                  type="submit" 
                  style={styles.submitBtn}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#5a67d8'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#667eea'}
                >
                  Send Message
                </button>
              </form>
            </div>
            
            <div style={styles.contactInfo}>
              <h3 style={{marginBottom: '1.5rem', color: '#2d3748'}}>Contact Information</h3>
              <div style={styles.contactItem}>
                <span style={styles.contactIcon}>📍</span>
                <div>
                  <strong>Address</strong><br />
                  123 University Avenue<br />
                  Campus City, State 12345
                </div>
              </div>
              <div style={styles.contactItem}>
                <span style={styles.contactIcon}>📞</span>
                <div>
                  <strong>Phone</strong><br />
                  +1 (555) 123-4567
                </div>
              </div>
              <div style={styles.contactItem}>
                <span style={styles.contactIcon}>✉️</span>
                <div>
                  <strong>Email</strong><br />
                  support@campuslink.edu
                </div>
              </div>
              <div style={styles.contactItem}>
                <span style={styles.contactIcon}>🕒</span>
                <div>
                  <strong>Office Hours</strong><br />
                  Monday - Friday: 9:00 AM - 6:00 PM<br />
                  Saturday: 10:00 AM - 4:00 PM
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.container}>
          <div style={styles.footerGrid}>
            <div>
              <h4 style={styles.footerTitle}>CampusLink</h4>
              <p style={{color: '#a0aec0', lineHeight: 1.6}}>
                Empowering students with innovative campus management solutions. Join thousands of students who trust CampusLink for their daily campus needs.
              </p>
            </div>
            
            <div>
              <h4 style={styles.footerTitle}>Quick Links</h4>
              <div style={styles.footerLinks}>
                <a href="#" style={styles.footerLink} onMouseEnter={(e) => e.target.style.color = '#fff'} onMouseLeave={(e) => e.target.style.color = '#a0aec0'}>Home</a>
                <a href="#" style={styles.footerLink} onMouseEnter={(e) => e.target.style.color = '#fff'} onMouseLeave={(e) => e.target.style.color = '#a0aec0'}>Features</a>
                <a href="#" style={styles.footerLink} onMouseEnter={(e) => e.target.style.color = '#fff'} onMouseLeave={(e) => e.target.style.color = '#a0aec0'}>About Us</a>
                <a href="#" style={styles.footerLink} onMouseEnter={(e) => e.target.style.color = '#fff'} onMouseLeave={(e) => e.target.style.color = '#a0aec0'}>Contact</a>
              </div>
            </div>
            
            <div>
              <h4 style={styles.footerTitle}>Services</h4>
              <div style={styles.footerLinks}>
                <a href="#" style={styles.footerLink} onMouseEnter={(e) => e.target.style.color = '#fff'} onMouseLeave={(e) => e.target.style.color = '#a0aec0'}>Class Schedules</a>
                <a href="#" style={styles.footerLink} onMouseEnter={(e) => e.target.style.color = '#fff'} onMouseLeave={(e) => e.target.style.color = '#a0aec0'}>Announcements</a>
                <a href="#" style={styles.footerLink} onMouseEnter={(e) => e.target.style.color = '#fff'} onMouseLeave={(e) => e.target.style.color = '#a0aec0'}>Lost & Found</a>
                <a href="#" style={styles.footerLink} onMouseEnter={(e) => e.target.style.color = '#fff'} onMouseLeave={(e) => e.target.style.color = '#a0aec0'}>Hostel Services</a>
              </div>
            </div>
            
            <div>
              <h4 style={styles.footerTitle}>Support</h4>
              <div style={styles.footerLinks}>
                <a href="#" style={styles.footerLink} onMouseEnter={(e) => e.target.style.color = '#fff'} onMouseLeave={(e) => e.target.style.color = '#a0aec0'}>Help Center</a>
                <a href="#" style={styles.footerLink} onMouseEnter={(e) => e.target.style.color = '#fff'} onMouseLeave={(e) => e.target.style.color = '#a0aec0'}>Privacy Policy</a>
                <a href="#" style={styles.footerLink} onMouseEnter={(e) => e.target.style.color = '#fff'} onMouseLeave={(e) => e.target.style.color = '#a0aec0'}>Terms of Service</a>
                <a href="#" style={styles.footerLink} onMouseEnter={(e) => e.target.style.color = '#fff'} onMouseLeave={(e) => e.target.style.color = '#a0aec0'}>FAQ</a>
              </div>
            </div>
          </div>
          
          <div style={styles.footerBottom}>
            <p>&copy; 2025 CampusLink. All rights reserved. Made with ❤️ for students.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;