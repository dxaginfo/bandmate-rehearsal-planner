import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import DashboardPage from './pages/dashboard/DashboardPage';
import CalendarPage from './pages/calendar/CalendarPage';
import BandsPage from './pages/bands/BandsPage';
import BandDetailPage from './pages/bands/BandDetailPage';
import ProfilePage from './pages/profile/ProfilePage';
import NotFoundPage from './pages/NotFoundPage';

import ProtectedRoute from './components/auth/ProtectedRoute';
import { RootState } from './store';
import { checkAuthStatus } from './store/slices/authSlice';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, loading } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(checkAuthStatus());
  }, [dispatch]);

  if (loading) {
    // You can replace this with a proper loading component
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Public routes */}
        <Route index element={<HomePage />} />
        <Route path="login" element={isAuthenticated ? <Navigate to="/dashboard" /> : <LoginPage />} />
        <Route path="register" element={isAuthenticated ? <Navigate to="/dashboard" /> : <RegisterPage />} />

        {/* Protected routes */}
        <Route path="dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
        <Route path="calendar" element={<ProtectedRoute><CalendarPage /></ProtectedRoute>} />
        <Route path="bands" element={<ProtectedRoute><BandsPage /></ProtectedRoute>} />
        <Route path="bands/:bandId" element={<ProtectedRoute><BandDetailPage /></ProtectedRoute>} />
        <Route path="profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />

        {/* Catch-all route */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

export default App;