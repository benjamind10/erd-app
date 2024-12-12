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
  Menu,
  MenuItem,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
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
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null); // Anchor for Feeding Tracker submenu
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Open/close submenu
  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const drawerContent = (
    <Box sx={{ width: 250 }} role="presentation">
      <List>
        <ListItemButton component={Link} to="/" onClick={handleDrawerToggle}>
          <ListItemText primary="Home" />
        </ListItemButton>

        {/* Feeding Tracker with submenu (Drawer version) */}
        <ListItemButton onClick={handleMenuClick}>
          <ListItemText primary="Feeding Tracker" />
          <ArrowDropDownIcon />
        </ListItemButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem
            component={Link}
            to="/feeding/add"
            onClick={handleMenuClose}
          >
            Add
          </MenuItem>
          <MenuItem
            component={Link}
            to="/feeding/today"
            onClick={handleMenuClose}
          >
            Today
          </MenuItem>
          <MenuItem
            component={Link}
            to="/feeding/history"
            onClick={handleMenuClose}
          >
            History
          </MenuItem>
          <MenuItem
            component={Link}
            to="/feeding/analytics"
            onClick={handleMenuClose}
          >
            Analytics
          </MenuItem>
        </Menu>

        {/* <ListItemButton
          component={Link}
          to="/doody"
          onClick={handleDrawerToggle}
        >
          <ListItemText primary="Record Doody" />
        </ListItemButton>
        <ListItemButton
          component={Link}
          to="/blog"
          onClick={handleDrawerToggle}
        >
          <ListItemText primary="Blog" />
        </ListItemButton> */}

        {isAuthenticated ? (
          <ListItemButton
            onClick={() => {
              handleLogout();
              handleDrawerToggle();
            }}
          >
            <ListItemText primary="Logout" />
          </ListItemButton>
        ) : (
          <ListItemButton
            component={Link}
            to="/login"
            onClick={handleDrawerToggle}
          >
            <ListItemText primary="Login" />
          </ListItemButton>
        )}
      </List>
    </Box>
  );

  return (
    <AppBar position="sticky">
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
          {/* Feeding Tracker Dropdown */}
          <Button
            color="inherit"
            endIcon={<ArrowDropDownIcon />}
            onClick={handleMenuClick}
          >
            Feeding Tracker
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem
              component={Link}
              to="/feeding/add"
              onClick={handleMenuClose}
            >
              Add
            </MenuItem>
            <MenuItem
              component={Link}
              to="/feeding/today"
              onClick={handleMenuClose}
            >
              Today
            </MenuItem>
            <MenuItem
              component={Link}
              to="/feeding/history"
              onClick={handleMenuClose}
            >
              History
            </MenuItem>
            <MenuItem
              component={Link}
              to="/feeding/analytics"
              onClick={handleMenuClose}
            >
              Analytics
            </MenuItem>
          </Menu>
          {/* <Button color="inherit" component={Link} to="/doody">
            Doody Tracker
          </Button> */}
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
