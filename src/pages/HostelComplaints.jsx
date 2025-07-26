import React, { useState, useEffect } from 'react';

const styles = {
  navbar: {
    background: 'rgba(255, 255, 255, 0.98)',
    backdropFilter: 'blur(24px)',
    borderBottom: '1.5px solid #e0e7ef',
    padding: '1.2rem 3rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    boxShadow: '0 6px 32px 0 rgba(102, 126, 234, 0.08)',
    marginBottom: '2.5rem',
    borderRadius: '0 0 24px 24px',
  },
  logo: {
    fontSize: '2.1rem',
    fontWeight: '800',
    letterSpacing: '1px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    cursor: 'pointer',
    transition: 'transform 0.2s',
  },
  navRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '1.5rem',
  },
  select: {
    padding: '0.8rem',
    border: '2px solid #e2e8f0',
    borderRadius: '10px',
    fontSize: '1rem',
    background: '#fff',
    cursor: 'pointer',
    outline: 'none',
    transition: 'all 0.3s ease',
    fontWeight: 500,
    color: '#374151',
    marginBottom: '0.5rem',
  },
  pageWrapper: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #f8fafc 0%, #e0e7ef 100%)',
    fontFamily: 'Inter, Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
    padding: '0 0 3rem 0',
  },
  header: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    borderRadius: '32px',
    padding: '3.5rem 2.5rem 2.5rem 2.5rem',
    color: '#fff',
    margin: '0 auto 2.5rem auto',
    position: 'relative',
    overflow: 'hidden',
    boxShadow: '0 24px 48px rgba(102, 126, 234, 0.18)',
    maxWidth: 800,
    textAlign: 'center',
  },
  headerTitle: {
    fontSize: '2.2rem',
    fontWeight: '700',
    marginBottom: '0.5rem',
    textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
  },
  headerSubtitle: {
    fontSize: '1.1rem',
    opacity: 0.9,
    fontWeight: '400',
  },
  formCard: {
    background: 'rgba(255,255,255,0.98)',
    borderRadius: '24px',
    padding: '2.5rem 2rem',
    marginBottom: '2.5rem',
    boxShadow: '0 12px 32px rgba(102, 126, 234, 0.10)',
    border: '1.5px solid #e0e7ef',
    maxWidth: 520,
    margin: '0 auto 2.5rem auto',
    transition: 'box-shadow 0.2s',
  },
  formTitle: {
    fontSize: '1.3rem',
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: '1rem',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    marginBottom: '1.2rem',
  },
  label: {
    fontSize: '0.95rem',
    fontWeight: '600',
    color: '#374151',
  },
  input: {
    padding: '0.8rem',
    border: '2px solid #e2e8f0',
    borderRadius: '10px',
    fontSize: '1rem',
    background: '#fff',
    outline: 'none',
    marginBottom: '0.5rem',
  },
  textarea: {
    padding: '0.8rem',
    border: '2px solid #e2e8f0',
    borderRadius: '10px',
    fontSize: '1rem',
    minHeight: '100px',
    resize: 'vertical',
    outline: 'none',
    marginBottom: '0.5rem',
  },
  submitButton: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: '#fff',
    border: 'none',
    borderRadius: '12px',
    padding: '1rem 2.2rem',
    fontSize: '1.15rem',
    fontWeight: '700',
    cursor: 'pointer',
    transition: 'all 0.2s cubic-bezier(.4,0,.2,1)',
    boxShadow: '0 6px 18px rgba(102, 126, 234, 0.18)',
    marginTop: '1rem',
    letterSpacing: '0.5px',
  },
  complaintsSection: {
    maxWidth: 800,
    margin: '0 auto',
    background: 'rgba(255,255,255,0.97)',
    borderRadius: '24px',
    boxShadow: '0 8px 32px rgba(102, 126, 234, 0.10)',
    padding: '2rem',
  },
  complaintCard: {
    background: 'linear-gradient(135deg, #f8fafc 0%, #e0e7ef 100%)',
    borderRadius: '18px',
    padding: '1.7rem',
    boxShadow: '0 6px 24px rgba(102, 126, 234, 0.10)',
    border: '1.5px solid #e0e7ef',
    marginBottom: '1.5rem',
    transition: 'transform 0.15s, box-shadow 0.15s',
    position: 'relative',
  },
  complaintHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '0.5rem',
  },
  complaintType: {
    fontWeight: '600',
    color: '#6366f1',
  },
  complaintStatus: {
    fontWeight: '600',
    fontSize: '0.95rem',
    borderRadius: '8px',
    padding: '0.2rem 0.8rem',
    background: '#f1f5f9',
    color: '#374151',
  },
  complaintDesc: {
    color: '#374151',
    marginBottom: '0.5rem',
  },
};

const statusColors = {
  Pending: { background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', color: '#fff' },
  'In Progress': { background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)', color: '#fff' },
  Resolved: { background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', color: '#fff' },
};

const complaintCategories = [
  'All',
  'Plumbing',
  'Electricity',
  'Cleanliness',
  'Internet',
  'Furniture',
  'Other',
];

const HostelComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [newComplaint, setNewComplaint] = useState({
    type: '',
    description: '',
    room: '',
  });
  const [user, setUser] = useState({ name: '', rollNumber: '' });
  const [category, setCategory] = useState('All');

  useEffect(() => {
    // Get user info
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        setUser(JSON.parse(userStr));
      } catch {}
    }
    // Get hostel complaints
    const stored = localStorage.getItem('hostelComplaints');
    if (stored) {
      setComplaints(JSON.parse(stored));
    }
  }, []);

  // Only show complaints by this student
  const myComplaints = complaints.filter(
    c =>
      c.studentName === user.name &&
      c.studentRoll === user.rollNumber
  );

  const handleInputChange = e => {
    const { name, value } = e.target;
    setNewComplaint(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!newComplaint.type || !newComplaint.description) {
      alert('Please fill in all required fields');
      return;
    }
    const complaintToAdd = {
      ...newComplaint,
      studentName: user.name,
      studentRoll: user.rollNumber,
      id: Date.now(),
      date: new Date().toISOString().slice(0, 10),
      status: 'Pending',
    };
    const updated = [complaintToAdd, ...complaints];
    setComplaints(updated);
    localStorage.setItem('hostelComplaints', JSON.stringify(updated));
    setNewComplaint({ type: '', description: '', room: '' });
    alert('Hostel complaint submitted!');
  };

  return (
    <div style={styles.pageWrapper}>
      {/* Navbar */}
      <nav style={styles.navbar}>
        <span style={styles.logo} onClick={() => window.location.href = '/'}>CampusLink</span>
      </nav>
      <div style={styles.header}>
        <div style={styles.headerTitle}>Hostel Complaints</div>
        <div style={styles.headerSubtitle}>Report hostel issues and track their status. Only your complaints are visible here.</div>
      </div>
      <div style={styles.formCard}>
        <div style={styles.formTitle}>Submit Hostel Complaint</div>
        <form onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Complaint Type *</label>
            <select
              name="type"
              value={newComplaint.type}
              onChange={handleInputChange}
              style={styles.select}
              required
            >
              <option value="">Select complaint type</option>
              {complaintCategories.slice(1).map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Room Number</label>
            <input
              type="text"
              name="room"
              value={newComplaint.room}
              onChange={handleInputChange}
              style={styles.input}
              placeholder="e.g., B-203"
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Description *</label>
            <textarea
              name="description"
              value={newComplaint.description}
              onChange={handleInputChange}
              style={styles.textarea}
              placeholder="Describe the issue in detail..."
              required
            />
          </div>
          <button type="submit" style={styles.submitButton}>Submit Complaint</button>
        </form>
      </div>
      <div style={styles.complaintsSection}>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem'}}>
          <span style={{fontSize: '1.2rem', fontWeight: 700, color: '#6366f1'}}>My Hostel Complaints</span>
          <span style={{fontSize: '1rem', color: '#64748b'}}>Category: {category}</span>
        </div>
        {myComplaints.length === 0 ? (
          <div style={{color: '#64748b', textAlign: 'center', padding: '2rem'}}>No hostel complaints submitted yet.</div>
        ) : (
          myComplaints.map(complaint => (
            <div key={complaint.id} style={styles.complaintCard}>
              <div style={styles.complaintHeader}>
                <div style={styles.complaintType}>{complaint.type}</div>
                <div style={{...styles.complaintStatus, ...statusColors[complaint.status]}}>{complaint.status}</div>
              </div>
              <div style={styles.complaintDesc}>{complaint.description}</div>
              <div style={{fontSize: '0.95rem', color: '#64748b'}}>Room: {complaint.room || 'N/A'}</div>
              <div style={{fontSize: '0.85rem', color: '#94a3b8', marginTop: '0.5rem'}}>Date: {new Date(complaint.date).toLocaleDateString()}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default HostelComplaints;
