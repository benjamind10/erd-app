import React, { useState, useMemo } from 'react';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import Navigation from './components/Navigation';
import Feeding from './routes/Feeding';
import Doody from './routes/Doody';
import Blog from './routes/Blog';
import Login from './routes/Login';
import NotFound from './routes/NotFound';
import TodayFeedings from './routes/TodayFeedings';
import History from './routes/History';
import Analytics from './routes/Analytics';
import Unauthorized from './routes/Unauthorized';

// Helper function to get roles from localStorage
const getRoles = (): string[] => {
  const roles = localStorage.getItem('roles');
  return roles ? JSON.parse(roles) : [];
};

// Function to check if the user is authenticated
const isAuthenticated = () => !!localStorage.getItem('token');

// ProtectedRoute Component
const ProtectedRoute = ({
  children,
  requiredRoles = [],
}: {
  children: JSX.Element;
  requiredRoles?: string[];
}) => {
  // Check authentication
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  // Check authorization based on roles
  const userRoles = getRoles();
  if (requiredRoles.length > 0 && !requiredRoles.some((role) => userRoles.includes(role))) {
    return <Navigate to="/unauthorized" replace />;
  }

  // Render the protected component
  return children;
};

const App: React.FC = () => {
  const initialMode = localStorage.getItem('theme') === 'dark';

  const [darkMode, setDarkMode] = useState(initialMode);

  // Create a theme object based on the mode
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? 'dark' : 'light',
        },
      }),
    [darkMode]
  );

  // Toggle the theme mode and save preference to localStorage
  const toggleDarkMode = () => {
    setDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem('theme', newMode ? 'dark' : 'light');
      return newMode;
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Router>
          <Navigation toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
          <Routes>
            <Route path="/" element={<Navigate to="/feeding/add" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route
              path="/feeding/add"
              element={
                <ProtectedRoute requiredRoles={['admin']}>
                  <Feeding />
                </ProtectedRoute>
              }
            />
            <Route
              path="/doody"
              element={
                <ProtectedRoute requiredRoles={['admin']}>
                  <Doody />
                </ProtectedRoute>
              }
            />
            <Route
              path="/blog"
              element={
                <ProtectedRoute requiredRoles={['user', 'admin']}>
                  <Blog />
                </ProtectedRoute>
              }
            />
            <Route
              path="/feeding/today"
              element={
                <ProtectedRoute requiredRoles={['admin']}>
                  <TodayFeedings />
                </ProtectedRoute>
              }
            />
            <Route
              path="/feeding/history"
              element={
                <ProtectedRoute requiredRoles={['admin']}>
                  <History />
                </ProtectedRoute>
              }
            />
            <Route
              path="/feeding/analytics"
              element={
                <ProtectedRoute requiredRoles={['admin']}>
                  <Analytics />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </LocalizationProvider>
    </ThemeProvider>
  );
};

export default App;
