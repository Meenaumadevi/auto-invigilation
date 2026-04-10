import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import { ExamProvider } from './context/ExamContext';
import Login from './pages/Login';
import Register from './pages/Register';
import StudentDashboard from './dashboards/StudentDashboard';
import AdminDashboard from './dashboards/AdminDashboard';
import DashboardLayout from './components/DashboardLayout';
import ExamArena from './exams/ExamArena';
import AdminMonitor from './monitoring/AdminMonitor';
import ReportsDashboard from './dashboards/ReportsDashboard';
import ExamManagement from './dashboards/ExamManagement';
import AdminSettings from './dashboards/AdminSettings';
import PlaceholderPage from './pages/PlaceholderPage';

// Student Dashboard Components
import AvailableExams from './dashboards/student/AvailableExams';
import ActiveExams from './dashboards/student/ActiveExams';
import ExamHistory from './dashboards/student/ExamHistory';
import StudentProfile from './dashboards/student/StudentProfile';
import NotificationsPage from './dashboards/student/Notifications';

// Main dashboard router wrapper
const DashboardRouter = () => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        {/* Core Dashboards */}
        <Route index element={user.role === 'admin' ? <AdminDashboard /> : <StudentDashboard />} />

        {/* Admin Routes */}
        <Route path="manage" element={<ExamManagement />} />
        <Route path="monitoring" element={<AdminMonitor />} />
        <Route path="reports" element={<ReportsDashboard />} />
        <Route path="settings" element={<AdminSettings />} />

        {/* Student Routes */}
        <Route path="available" element={<AvailableExams />} />
        <Route path="active" element={<ActiveExams />} />
        <Route path="history" element={<ExamHistory />} />
        <Route path="notifications" element={<NotificationsPage />} />
        <Route path="profile" element={<StudentProfile />} />
      </Route>
      {/* Exam Arena is outside the standard sidebar layout because it is fullscreen */}
      <Route path="exam/:id" element={<ExamArena />} />
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <ExamProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard/*" element={<DashboardRouter />} />
          </Routes>
        </Router>
      </ExamProvider>
    </AuthProvider>
  );
}

export default App;
