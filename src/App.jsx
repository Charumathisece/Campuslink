


import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { EventProvider } from './pages/EventContext';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import DashboardStudent from './pages/DashboardStudent';
import DashboardAdmin from './pages/DashboardAdmin';
import StudentRegistration from './pages/StudentRegistration';
import Complaints from './pages/Complaints';
import ManageEvents from './pages/ManageEvents';
import StudentProfile from './pages/StudentProfile';
import NotFound from './pages/NotFound';

/* ---------- Protected Routes ---------- */

// For students only
const PrivateRoute = ({ children }) => {
  const user = localStorage.getItem('user');
  if (!user) return <Navigate to="/login" replace />;
  const { role } = JSON.parse(user);
  return role === 'student' ? children : <Navigate to="/dashboard/admin" replace />;
};

// For admins only
const AdminRoute = ({ children }) => {
  const user = localStorage.getItem('user');
  if (!user) return <Navigate to="/login" replace />;
  const { role } = JSON.parse(user);
  return role === 'admin' ? children : <Navigate to="/dashboard/student" replace />;
};

/* ---------- Main App ---------- */


const App = () => {
  return (
    <EventProvider>
      <Router>
        <div className="app">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            {/* Student routes */}
            <Route
              path="/hostelcomplaints"
              element={
                <PrivateRoute>
                  {React.createElement(require('./pages/HostelComplaints.jsx').default)}
                </PrivateRoute>
              }
            />
            <Route
              path="/dashboard/student"
              element={
                <PrivateRoute>
                  <DashboardStudent />
                </PrivateRoute>
              }
            />
            <Route
              path="/dashboard/student/profile"
              element={
                <PrivateRoute>
                  <StudentProfile />
                </PrivateRoute>
              }
            />
            <Route
              path="/timetable"
              element={
                <PrivateRoute>
                  {React.createElement(require('./pages/Timetable.jsx').default)}
                </PrivateRoute>
              }
            />
            <Route
              path="/complaints"
              element={
                <PrivateRoute>
                  <Complaints />
                </PrivateRoute>
              }
            />
            {/* Admin routes */}
            <Route
              path="/complaints/admin"
              element={
                <AdminRoute>
                  <Complaints />
                </AdminRoute>
              }
            />
            <Route
              path="/dashboard/admin"
              element={
                <AdminRoute>
                  <DashboardAdmin />
                </AdminRoute>
              }
            />
            <Route
              path="/dashboard/admin/student-registration"
              element={
                <AdminRoute>
                  <StudentRegistration />
                </AdminRoute>
              }
            />
            <Route
              path="/events"
              element={
                <AdminRoute>
                  <ManageEvents />
                </AdminRoute>
              }
            />
            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Router>
    </EventProvider>

  );
};

export default App;
