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
import Home from './routes/Home';
import Feeding from './routes/Feeding';
import Blog from './routes/Blog';
import Login from './routes/Login';

const isAuthenticated = () => !!localStorage.getItem('token');

const ProtectedRoute = ({ children }: { children: JSX.Element; }) => {
  return isAuthenticated() ? children : <Navigate to="/login" />;
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
    setDarkMode(prevMode => {
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
            <Route path="/login" element={<Login />} />
            <Route path="/feeding" element={<ProtectedRoute><Feeding /></ProtectedRoute>} />
            <Route path="/blog" element={<ProtectedRoute><Blog /></ProtectedRoute>} />
            <Route path="*" element={<Navigate to={isAuthenticated() ? "/feeding" : "/login"} />} />
          </Routes>
        </Router>
      </LocalizationProvider>
    </ThemeProvider>
  );
};

export default App;
