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
//import SettingsIcon from '@mui/icons-material/Settings';
import { Link } from 'react-router-dom';

interface NavigationProps {
  toggleDarkMode: () => void;
  darkMode: boolean;
}

const Navigation: React.FC<NavigationProps> = ({
  toggleDarkMode,
  darkMode,
}) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
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
            Record Doody
          </Button>
          <Button color="inherit" component={Link} to="/blog">
            Blog
          </Button>
        </Box>

        {/* Dark Mode Toggle */}
        <IconButton color="inherit" onClick={toggleDarkMode}>
          {darkMode ? '🌙' : '🌞'}
        </IconButton>

        {/* Settings Icon */}
        {/*<IconButton color="inherit" component={Link} to="/settings">
          <SettingsIcon />
        </IconButton> */}
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;
