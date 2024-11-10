// src/components/Navigation.tsx
import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Button,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface NavigationProps {
  toggleDarkMode: () => void;
  darkMode: boolean;
}

const Navigation: React.FC<NavigationProps> = ({
  toggleDarkMode,
  darkMode,
}) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const drawerContent = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={handleDrawerToggle}
      onKeyDown={handleDrawerToggle}
    >
      <List>
        <ListItemButton component={Link} to="/">
          <ListItemText primary="Home" />
        </ListItemButton>
        <ListItemButton component={Link} to="/feeding">
          <ListItemText primary="Feeding Tracker" />
        </ListItemButton>
        <ListItemButton component={Link} to="/doody">
          <ListItemText primary="Record Doody" />
        </ListItemButton>
        <ListItemButton component={Link} to="/blog">
          <ListItemText primary="Blog" />
        </ListItemButton>
        {isAuthenticated ? (
          <ListItemButton onClick={handleLogout}>
            <ListItemText primary="Logout" />
          </ListItemButton>
        ) : (
          <ListItemButton component={Link} to="/login">
            <ListItemText primary="Login" />
          </ListItemButton>
        )}
      </List>
    </Box>
  );

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          ERD App
        </Typography>

        {/* Mobile Menu Button */}
        <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
          <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerToggle}>
            {drawerContent}
          </Drawer>
        </Box>

        {/* Desktop Menu */}
        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          <Button color="inherit" component={Link} to="/feeding">
            Feeding Tracker
          </Button>
          <Button color="inherit" component={Link} to="/doody">
            Doody Tracker
          </Button>
          <Button color="inherit" component={Link} to="/blog">
            Blog
          </Button>
          {isAuthenticated ? (
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
          )}
        </Box>

        {/* Dark Mode Toggle */}
        <IconButton color="inherit" onClick={toggleDarkMode}>
          {darkMode ? '🌙' : '🌞'}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;
