import React from 'react';
import { Typography, Container } from '@mui/material';

const Home: React.FC = () => {
  return (
    <Container>
      <Typography variant="h4" sx={{ mt: 2 }}>
        Welcome to the ERD Home Page
      </Typography>
    </Container>
  );
};

export default Home;
