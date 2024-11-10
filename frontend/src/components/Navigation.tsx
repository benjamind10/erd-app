import React from 'react';
import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  Container,
  IconButton,
} from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { Link } from 'react-router-dom';

interface NavigationProps {
  toggleDarkMode: () => void;
  darkMode: boolean;
}

const Navigation: React.FC<NavigationProps> = ({
  toggleDarkMode,
  darkMode,
}) => {
  return (
    <AppBar position="static">
      <Container maxWidth="md">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            ERD App
          </Typography>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          <Button color="inherit" component={Link} to="/feeding">
            Record Feeding
          </Button>
          <Button color="inherit" component={Link} to="/feeding">
            Doody Calls
          </Button>
          <Button color="inherit" component={Link} to="/blog">
            Blog
          </Button>
          <IconButton color="inherit" onClick={toggleDarkMode}>
            {darkMode ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navigation;
