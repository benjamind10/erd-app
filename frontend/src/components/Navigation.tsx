import React from 'react';
import { AppBar, Toolbar, Button, Typography, Container } from '@mui/material';
import { Link } from 'react-router-dom';

const Navigation: React.FC = () => {
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
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navigation;
