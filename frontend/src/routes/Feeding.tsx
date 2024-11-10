import React from 'react';
import { Typography, Container } from '@mui/material';

import FeedForm from '../components/FeedForm';

const handleFormSubmit = (feedingTime: string, amount: number, dha: boolean) => {
  console.log("Submitted data:", { feedingTime, amount, dha });
  // hit backend to save records
};

const Feeding: React.FC = () => {
  return (
    <Container>
      <Typography variant="h4" sx={{ mt: 2 }}>
        Welcome to the ERD Feeding Page
      </Typography>
      <FeedForm onSubmit={handleFormSubmit} />
    </Container>
  );
};

export default Feeding;
